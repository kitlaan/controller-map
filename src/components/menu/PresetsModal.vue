<script setup lang="ts">
import AppModal from '../ui/AppModal.vue';
import { validate } from '../../domain/mapping';
import { useDocumentStore } from '../../stores/document';
import { useUiStore } from '../../stores/ui';
import RawPresets from 'virtual:presets'

const documentStore = useDocumentStore()
const uiStore = useUiStore()

const Presets = RawPresets.sort((a, b) => a.name.localeCompare(b.name))

function loadPreset(filename: string) {
  const name = filename.replace('.json', '')
  if (name.match(/^[a-zA-Z0-9_-]+$/)) {
    fetch(`./presets/${name}.json`)
      .then((r) => r.json())
      .then((data) => {
        const doc = validate(data)
        if (doc) documentStore.load(doc)
      })
      .catch(console.error)
  }
  uiStore.hideModal()
}
</script>

<template>
  <AppModal v-show="uiStore.openModal === 'presets'" @close="uiStore.hideModal()" mask-close close-button>
    <template v-slot:header>Presets</template>
    <template v-slot:body>
      <p>Controller maps as defined by various games by default:</p>
      <ul class="mt-4">
        <li class="px-3 py-1 cursor-pointer hover:bg-gray-200" v-for="item in Presets" @click="loadPreset(item.file)">{{
      item.name }}</li>
      </ul>
    </template>
  </AppModal>
</template>
