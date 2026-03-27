import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const openModal = ref<'about' | 'presets' | 'myMaps' | 'saveLoad' | 'new' | null>(null)

  function showModal(name: typeof openModal.value) {
    openModal.value = name
  }

  function hideModal() {
    openModal.value = null
  }

  return { openModal, showModal, hideModal }
})
