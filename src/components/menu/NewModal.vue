<script setup lang="ts">
import AppModal from '../ui/AppModal.vue';
import { ControllerType } from '../../controller';
import { useDocumentStore } from '../../stores/document';
import { useUiStore } from '../../stores/ui';

const documentStore = useDocumentStore()
const uiStore = useUiStore()

function startNew(layout: ControllerType) {
  documentStore.load({
    version: 2,
    name: '',
    date: new Date().toISOString(),
    layout,
    mapping: [],
  })
  uiStore.hideModal()
}
</script>

<template>
  <AppModal v-show="uiStore.openModal === 'new'" @close="uiStore.hideModal()" mask-close close-button>
    <template v-slot:header>New Map</template>
    <template v-slot:body>
      <p class="mb-4">Choose a controller:</p>
      <div class="flex flex-col gap-2">
        <button
          v-for="layout in Object.values(ControllerType)"
          :key="layout"
          class="rounded border-2 px-4 py-2 hover:bg-gray-200 text-left"
          @click="startNew(layout)">
          {{ layout }}
        </button>
      </div>
    </template>
  </AppModal>
</template>
