<script setup lang="ts">
import { ButtonConfig } from '../App.vue';
import IconDropdown, { DropdownItem } from './IconDropdown.vue';

defineProps<{
  modelValue: ButtonConfig
  items: DropdownItem[]
}>()

defineEmits<{
  (e: 'update', modelValue: ButtonConfig): void
}>()
</script>

<template>
  <div draggable="true" class="flex flex-row gap-2 rounded-md border border-solid border-gray-400 p-1 mb-1" @drop="" @dragover.prevent="" @dragleave.prevent="">
    <IconDropdown v-model="modelValue.id" :items="items" style="min-width: 40px" />
    <IconDropdown v-model="modelValue.modifiers" :items="items" style="min-width: calc(40px * 3)" />
    <input type="text" v-model="modelValue.description" class="my-0.5 rounded-md ring-1 ring-gray-300 px-2 flex-grow" />
  </div>
</template>

<style scoped>
</style>
