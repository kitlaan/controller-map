<script setup lang="ts">
import { useUiStore } from '../../stores/ui';
import { useDocumentStore } from '../../stores/document';
import NewModal from './NewModal.vue';
import AboutModal from './AboutModal.vue';
import PresetsModal from './PresetsModal.vue';
import MyMapsModal from './MyMapsModal.vue';
import SaveLoadModal from './SaveLoadModal.vue';

const uiStore = useUiStore()
const documentStore = useDocumentStore()
</script>

<template>
  <div class="print:hidden flex flex-row items-center gap-1 px-3 py-1.5 bg-slate-700 text-white shrink-0">
    <span class="font-semibold text-sm mr-2">Controller Map</span>
    <button class="rounded px-2 py-1 text-sm hover:bg-white/20" @click="uiStore.showModal('new')">New</button>
    <div class="flex gap-0.5 ml-1">
      <button class="rounded p-1.5 disabled:opacity-30 hover:bg-white/20" :disabled="!documentStore.canUndo" @click="documentStore.undo()"><font-awesome-icon icon="fa-solid fa-rotate-left" /></button>
      <button class="rounded p-1.5 disabled:opacity-30 hover:bg-white/20" :disabled="!documentStore.canRedo" @click="documentStore.redo()"><font-awesome-icon icon="fa-solid fa-rotate-right" /></button>
    </div>
    <button class="rounded px-2 py-1 text-sm hover:bg-white/20 ml-1" @click="uiStore.showModal('presets')">Presets</button>
    <button class="rounded px-2 py-1 text-sm hover:bg-white/20" @click="uiStore.showModal('myMaps')">My Maps</button>
    <button class="rounded px-2 py-1 text-sm hover:bg-white/20" @click="uiStore.showModal('saveLoad')">Save/Load</button>
    <div class="grow"></div>
    <button class="rounded px-2 py-1 text-sm hover:bg-white/20" @click="uiStore.showModal('about')">About</button>
  </div>

  <NewModal />
  <AboutModal />
  <PresetsModal />
  <MyMapsModal />
  <SaveLoadModal />
</template>
