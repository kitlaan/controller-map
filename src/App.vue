<script setup lang="ts">
import { watchEffect } from 'vue'
import { useEventListener } from '@vueuse/core'
import { ControllerType } from './controller'
import { validate } from './domain/mapping'
import { decodeDocument, encodeDocument } from './domain/persistence/url'
import { useDocumentStore } from './stores/document'
import { useUiStore } from './stores/ui'

import Editor from './components/editor/Editor.vue'
import LayoutRender from './components/layout/LayoutRender.vue'
import MenuBar from './components/menu/MenuBar.vue'

const documentStore = useDocumentStore()
const uiStore = useUiStore()

// Init: hash → ?d= (compat) → ?p= → ?l=
const hash = window.location.hash.slice(1)
const params = new URLSearchParams(document.location.search)

if (hash) {
  const doc = decodeDocument(hash)
  if (doc) documentStore.load(doc)
} else if (params.has('d')) {
  const doc = decodeDocument(params.get('d')!)
  if (doc) documentStore.load(doc)
} else if (params.has('p')) {
  const p = params.get('p')
  if (p && p.match(/^[a-zA-Z0-9_-]+$/)) {
    fetch(`./presets/${p}.json`)
      .then((r) => r.json())
      .then((data) => {
        const doc = validate(data)
        if (doc) documentStore.load(doc)
      })
      .catch(console.error)
  }
} else if (params.has('l')) {
  const l = params.get('l') as ControllerType
  if (Object.values(ControllerType).includes(l)) {
    documentStore.layout = l
  }
}

// No document loaded — open the new-map picker (guard ?p= which is async)
if (documentStore.isEmpty && !params.has('p')) {
  uiStore.showModal('new')
}

// Keyboard shortcuts
useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  const inInput = e.target instanceof HTMLElement &&
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)

  if (e.key === 'Escape') {
    uiStore.hideModal()
    return
  }
  if (inInput) return

  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
    e.preventDefault()
    documentStore.undo()
  } else if (
    ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
    ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
  ) {
    e.preventDefault()
    documentStore.redo()
  }
})

// Live URL sync: keep hash up to date so the URL bar is always shareable
watchEffect((onCleanup) => {
  // Accessing these synchronously sets up reactive tracking
  JSON.stringify(documentStore.mapping)
  documentStore.title
  const layout = documentStore.layout

  if (!layout) return

  const timer = setTimeout(() => {
    const encoded = encodeDocument(documentStore.toJson)
    history.replaceState(null, '', location.pathname + '#' + encoded)
  }, 300)

  onCleanup(() => clearTimeout(timer))
})
</script>

<template>
  <div class="flex flex-col h-full">
    <MenuBar />
    <div v-if="!documentStore.isEmpty" class="flex-1 overflow-hidden flex flex-col min-h-0">
      <div class="shrink-0">
        <LayoutRender :layout="documentStore.layout!" v-model:title="documentStore.title" :mapping="documentStore.mapping" />
      </div>
      <Editor class="flex-1 min-h-0" :layout="documentStore.layout!" />
    </div>
  </div>
</template>

<style scoped>
</style>
