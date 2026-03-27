<script setup lang="ts">
import { Ref, ref, computed } from 'vue';
import AppModal from '../ui/AppModal.vue';
import { validateWithError } from '../../domain/mapping';
import { buildShareUrl } from '../../domain/persistence/url';
import { exportJson } from '../../domain/persistence/file';
import { useDocumentStore } from '../../stores/document';
import { useUiStore } from '../../stores/ui';

const documentStore = useDocumentStore()
const uiStore = useUiStore()

const loadJsonData: Ref<string> = ref("")
const fileInputRef: Ref<HTMLInputElement | null> = ref(null)
const loadError = ref<string | null>(null)

const shareUrl = computed(() =>
  documentStore.isValid ? buildShareUrl(documentStore.toJson) : ''
)

function copyUrlToClipboard() {
  navigator.clipboard.writeText(shareUrl.value)
}

function saveToFile() {
  if (documentStore.isValid) exportJson(documentStore.toJson)
}

function onTextareaInput() {
  loadError.value = null
}

function loadJson() {
  let parsed: unknown
  try {
    parsed = JSON.parse(loadJsonData.value)
  } catch {
    loadError.value = 'Invalid JSON — could not parse'
    return
  }
  const { doc, error } = validateWithError(parsed)
  if (doc) {
    loadError.value = null
    documentStore.load(doc)
    uiStore.hideModal()
  } else {
    loadError.value = error
  }
}

function copyJsonToClipboard() {
  navigator.clipboard.writeText(loadJsonData.value)
}

async function loadFromFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const text = await file.text()
  loadJsonData.value = text
  loadError.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
  loadJson()
}
</script>

<template>
  <AppModal v-show="uiStore.openModal === 'saveLoad'" @close="uiStore.hideModal()" mask-close>
    <template v-slot:header>Save / Load</template>
    <template v-slot:body>
      <div class="w-[min(800px,65vw)]">
      <div class="my-4 flex flex-row items-center gap-2">
        <label for="siteUrl" class="shrink-0">Share URL</label>
        <input class="border grow px-2 py-1 text-sm" readonly type="text" id="siteUrl" :value="shareUrl" placeholder="Load a map first" />
        <button :disabled="!shareUrl" class="disabled:opacity-40" @click="copyUrlToClipboard">
          <font-awesome-icon icon="fa-regular fa-clipboard" />
        </button>
      </div>
      <div class="mb-4">
        <button class="rounded border-2 px-4 py-1 hover:bg-gray-200" :disabled="!documentStore.isValid" @click="saveToFile">
          Save to File
        </button>
      </div>
      <div class="flex flex-col gap-1">
        <label for="jsonData">Load JSON (paste below or select a file)</label>
        <textarea
          class="border my-1 w-full h-48 px-2 py-1 font-mono text-xs"
          :class="loadError ? 'border-red-400 ring-1 ring-red-400' : ''"
          id="jsonData" v-model="loadJsonData" @input="onTextareaInput"></textarea>
        <div v-if="loadError" class="text-red-500 text-xs">{{ loadError }}</div>
        <div class="flex flex-row items-center gap-2">
          <button class="rounded border px-4 py-1 hover:bg-gray-200" @click="loadJson">Load JSON</button>
          <button class="rounded border px-4 py-1 hover:bg-gray-200" @click="fileInputRef?.click()">Load from File</button>
          <input ref="fileInputRef" type="file" accept=".json,application/json" class="hidden" @change="loadFromFile" />
          <div class="grow"></div>
          <button @click="copyJsonToClipboard"><font-awesome-icon icon="fa-regular fa-clipboard" /></button>
        </div>
      </div>
      </div>
    </template>
    <template v-slot:footer-buttons>
      <button class="rounded border-2 px-4 hover:bg-gray-200" @click="uiStore.hideModal()">Close</button>
    </template>
  </AppModal>
</template>
