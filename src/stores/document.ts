import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ControllerType } from '../controller'
import type { ButtonConfig, MappingDocument } from '../domain/types'

export const useDocumentStore = defineStore('document', () => {
  const title = ref('')
  const layout = ref<ControllerType | null>(null)
  const mapping = ref<ButtonConfig[]>([])

  const past = ref<MappingDocument[]>([])
  const future = ref<MappingDocument[]>([])

  const toJson = computed((): MappingDocument => ({
    version: 2,
    name: title.value,
    date: new Date().toISOString(),
    layout: layout.value!,
    mapping: mapping.value,
  }))

  const isEmpty = computed(() => !layout.value)
  const isValid = computed(() => !!layout.value && mapping.value.length > 0)
  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)

  function snapshot() {
    past.value.push(JSON.parse(JSON.stringify(toJson.value)))
    if (past.value.length > 50) past.value.shift()
    future.value = []
  }

  function load(doc: MappingDocument) {
    past.value = []
    future.value = []
    title.value = doc.name
    layout.value = doc.layout
    mapping.value = doc.mapping
  }

  function clear() {
    past.value = []
    future.value = []
    title.value = ''
    layout.value = null
    mapping.value = []
  }

  function setTitle(t: string) {
    title.value = t
  }

  function addButton(b: ButtonConfig) {
    snapshot()
    mapping.value.push(b)
  }

  function removeButton(idx: number) {
    snapshot()
    mapping.value.splice(idx, 1)
  }

  function reorderButtons(from: number, to: number) {
    snapshot()
    const [item] = mapping.value.splice(from, 1)
    mapping.value.splice(to, 0, item)
  }

  function undo() {
    if (!past.value.length) return
    future.value.push(JSON.parse(JSON.stringify(toJson.value)))
    const prev = past.value.pop()!
    title.value = prev.name
    layout.value = prev.layout
    mapping.value = prev.mapping
  }

  function redo() {
    if (!future.value.length) return
    past.value.push(JSON.parse(JSON.stringify(toJson.value)))
    const next = future.value.pop()!
    title.value = next.name
    layout.value = next.layout
    mapping.value = next.mapping
  }

  return {
    title, layout, mapping,
    toJson, isEmpty, isValid, canUndo, canRedo,
    load, clear, setTitle, addButton, removeButton, reorderButtons, undo, redo,
  }
})
