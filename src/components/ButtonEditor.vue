<script setup lang="ts">
import { ButtonConfig } from '../App.vue';
import IconDropdown, { DropdownItem } from './IconDropdown.vue';

const props = defineProps<{
  modelValue: ButtonConfig
  items: DropdownItem[]
  mode: "add" | "edit"
}>()

defineEmits<{
  (e: 'update', modelValue: ButtonConfig): void
  (e: 'action'): void
}>()

const actionIcons = {
  add:  'fa-solid fa-add',
  edit: 'fa-solid: fa-trash',
}

function checkDisabled() {
  if (props.mode == "add" && props.modelValue.id == '') {
    return true;
  }

  return false;
}
</script>

<template>
  <div class="flex flex-row gap-2 rounded-md border border-solid border-gray-400 p-1 mb-1">
    <div class="p-1 text-gray-400 cursor-grab"><font-awesome-icon icon="fa-solid fa-grip-lines-vertical" /></div>
    <IconDropdown v-model="modelValue.id" :items="items" style="min-width: 40px" />
    <IconDropdown v-model="modelValue.modifiers" :items="items" style="min-width: calc(40px * 3)" placeholder="modifiers" />
    <input type="text" v-model="modelValue.description" class="my-0.5 rounded-md ring-1 ring-gray-300 px-2 flex-grow" placeholder="description" />
    <button class="p-1 disabled:text-gray-400" :disabled="checkDisabled()" @click="$emit('action')"><font-awesome-icon :icon="actionIcons[mode]" /></button>
  </div>
</template>

<style scoped>
</style>
