<script setup lang="ts">

defineProps<{
  maskClose?: boolean
  closeButton?: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click.self="maskClose && $emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="modal-buttons">
              <slot name="footer-buttons">
                <button class="rounded border-2 px-4 hover:bg-gray-200" v-show="closeButton" @click="$emit('close')">Close</button>
              </slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .modal-backdrop {
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-container {
    background: white;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    border-radius: 8px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: 70vw;
  }

  .modal-header,
  .modal-footer {
    padding: 12px 20px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eee;
    color: #4aae98;
    font-weight: bold;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 16px 20px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .modal-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
