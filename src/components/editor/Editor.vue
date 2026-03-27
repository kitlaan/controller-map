<script setup lang="ts">
import ButtonRow from './ButtonRow.vue';
import { PickerItem } from './IconPicker.vue';

import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { ControllerType, getIcon, layouts } from '../../controller';
import type { ButtonConfig } from '../../domain/types';
import { useDocumentStore } from '../../stores/document';
import { useDragReorder } from '../../composables/useDragReorder';

const props = defineProps<{
  layout: ControllerType
}>()

const doc = useDocumentStore()
const { dragOverIndex, startDrag, onDrop, onDragEnter, onDragEnd } =
  useDragReorder((from, to) => doc.reorderButtons(from, to))

const items = computed<PickerItem[]>(() => {
  const result: PickerItem[] = []
  for (const [itemkey, item] of Object.entries(layouts[props.layout].features)) {
    result.push({ label: itemkey, url: getIcon(props.layout, itemkey) })
    if (item.features) {
      for (const [subitemkey] of Object.entries(item.features)) {
        result.push({
          label: `${itemkey}.${subitemkey}`,
          url: getIcon(props.layout, `${itemkey}.${subitemkey}`),
        })
      }
    }
  }
  return result
})

const newitem: Ref<ButtonConfig> = ref({
  id: '',
  description: '',
  modifiers: [],
})

function addItem() {
  doc.addButton({ ...newitem.value })
  newitem.value.id = ''
  newitem.value.description = ''
  newitem.value.modifiers = []
}
</script>

<template>
  <div class="print:hidden flex flex-col h-full overflow-hidden px-8">
    <div class="text-xs text-gray-500 py-2 shrink-0">button definitions</div>
    <div class="flex-1 overflow-y-auto min-h-0" @dragover.prevent @dragend="onDragEnd()">
      <ButtonRow
        mode="edit"
        v-for="(_item, ix) in doc.mapping"
        v-model="doc.mapping[ix]"
        :items="items"
        :class="{ 'border-t-2 border-dashed border-black': dragOverIndex === ix }"
        draggable="true"
        @action="doc.removeButton(ix)"
        @dragstart="startDrag($event, ix)"
        @drop.prevent="onDrop($event, ix)"
        @dragenter.prevent="onDragEnter($event, ix)"
        @dragover.prevent />
    </div>
    <div class="shrink-0 border-t border-gray-200 pt-3 pb-4">
      <div class="text-xs text-gray-500 mb-2">define another button</div>
      <ButtonRow mode="add" v-model="newitem" :items="items" @action="addItem" />
    </div>
  </div>
</template>

<style scoped>
</style>
