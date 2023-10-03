<script setup lang="ts">
import { Ref, ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
import { Uri } from '../controller';

export type DropdownItem = {
  url: Uri
  label: string
}

const props = defineProps<{
  modelValue: string | string[]
  items: DropdownItem[]
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

function toggleModal() {
  show.value = !show.value
}
function hideModal() {
  show.value = false
}
function hideModalDelayed() {
  showTimer.value = setTimeout(hideModal, 300)
}
function hideModalDelayedCancel() {
  clearTimeout(showTimer.value)
  showTimer.value = undefined
}

function selectItem(item: string) {
  if (typeof props.modelValue !== 'string') {
    if (props.modelValue.includes(item)) {
      emit('update:modelValue', props.modelValue.filter((e) => e !== item))
    }
    else {
      const value = props.modelValue
      value.push(item)
      emit('update:modelValue', value)
    }
  }
  else {
    emit('update:modelValue', item)
  }

  hideModal()
}

function isSelected(label: string): boolean {
  if (typeof props.modelValue === 'string') {
    return label == props.modelValue
  }
  else {
    return props.modelValue.includes(label)
  }
}

const show: Ref<boolean> = ref(false)
const showTimer: Ref<NodeJS.Timeout | undefined> = ref(undefined)
</script>

<template>
  <div class="relative inline-block">
    <button type="button"
      class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md p-1 ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-gray-200"
      @click="toggleModal">
      <img draggable="false" v-for="s in typeof props.modelValue === 'string' ? [ modelValue ] : modelValue" :src="items.find((e) => e.label == s)?.url" />
      <span v-if="modelValue == '' || modelValue.length == 0" class="text-gray-400">{{ placeholder }}</span>
    </button>
    <div
      class="absolute -top-1 -left-1 z-10 p-1 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-200 focus:outline-none w-[260px] cursor-pointer"
      :class="{ 'hidden': !show }" @mouseover="hideModalDelayedCancel" @mouseout.self="hideModalDelayed" v-on-click-outside="hideModal">
      <ul class="flex flex-row flex-wrap gap-0.5 justify-items-center">
        <li v-for="item in items" class="flex-none p-1 rounded-sm hover:bg-white"
          :class="isSelected(item.label) ? 'ring-1 ring-black' : ''"
          @click="selectItem(item.label)">
          <img :src="item.url" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 32px;
}
button {
  height: 100%;
}
</style>
