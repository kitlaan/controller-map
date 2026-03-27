<script setup lang="ts">
import { Ref, ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
import { Uri } from '../../controller';

export type PickerItem = {
  url: Uri
  label: string
}

const props = defineProps<{
  modelValue: string | string[]
  items: PickerItem[]
  placeholder?: string
  dropUp?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

function togglePicker() {
  show.value = !show.value
}
function hidePicker() {
  show.value = false
}
function hidePickerDelayed() {
  showTimer.value = setTimeout(hidePicker, 300)
}
function hidePickerDelayedCancel() {
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

  hidePicker()
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
const showTimer: Ref<ReturnType<typeof setTimeout> | undefined> = ref(undefined)
</script>

<template>
  <div class="relative inline-block">
    <button type="button"
      class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md p-1 ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-gray-200"
      @click="togglePicker">
      <img draggable="false" v-for="s in typeof props.modelValue === 'string' ? [ modelValue ] : modelValue" :src="items.find((e) => e.label == s)?.url" />
      <span v-if="modelValue == '' || modelValue.length == 0" class="text-gray-400">{{ placeholder }}</span>
    </button>
    <div
      class="absolute -left-1 z-10 p-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-200 focus:outline-none w-[260px] cursor-pointer"
      :class="{ 'hidden': !show, 'bottom-full mb-1': dropUp, '-top-1': !dropUp }" @mouseover="hidePickerDelayedCancel" @mouseout.self="hidePickerDelayed" v-on-click-outside="hidePicker">
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
