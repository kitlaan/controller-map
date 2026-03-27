<script setup lang="ts">
import { ref, watch } from 'vue';
import AppModal from '../ui/AppModal.vue';
import { saveMap, loadMap, listMaps, deleteMap } from '../../domain/persistence/storage';
import { useDocumentStore } from '../../stores/document';
import { useUiStore } from '../../stores/ui';

const documentStore = useDocumentStore()
const uiStore = useUiStore()

const savedMaps = ref<{ id: string; name: string; date: string }[]>([])

async function refreshMaps() {
  savedMaps.value = await listMaps()
}

watch(() => uiStore.openModal === 'myMaps', (isOpen) => {
  if (isOpen) refreshMaps()
})

async function saveCurrentMap() {
  if (!documentStore.isValid) {
    alert('Nothing to save — load a controller layout first.')
    return
  }
  await saveMap(documentStore.toJson)
  await refreshMaps()
}

async function loadSavedMap(id: string) {
  const doc = await loadMap(id)
  if (doc) {
    documentStore.load(doc)
    uiStore.hideModal()
  } else {
    alert('Could not load map.')
    await refreshMaps()
  }
}

async function deleteSavedMap(id: string) {
  await deleteMap(id)
  await refreshMaps()
}
</script>

<template>
  <AppModal v-show="uiStore.openModal === 'myMaps'" @close="uiStore.hideModal()" mask-close close-button>
    <template v-slot:header>My Maps</template>
    <template v-slot:body>
      <button class="rounded border-2 px-4 py-1 mb-4 hover:bg-gray-200" @click="saveCurrentMap">
        Save current map
      </button>
      <div v-if="savedMaps.length === 0" class="text-gray-400 text-sm">No saved maps yet.</div>
      <ul v-else>
        <li v-for="entry in savedMaps" :key="entry.id"
            class="flex flex-row items-center gap-2 px-2 py-1 border-b last:border-b-0">
          <span class="grow">{{ entry.name || '(unnamed)' }}</span>
          <span class="text-xs text-gray-400">{{ entry.date.slice(0, 10) }}</span>
          <button class="rounded border px-2 py-0.5 hover:bg-gray-200 text-sm" @click="loadSavedMap(entry.id)">Load</button>
          <button class="rounded border px-2 py-0.5 hover:bg-red-100 text-sm" @click="deleteSavedMap(entry.id)">✕</button>
        </li>
      </ul>
    </template>
  </AppModal>
</template>
