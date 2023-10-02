<script setup lang="ts">
import ButtonEditor from './ButtonEditor.vue';

import { Ref, ref } from 'vue';
import { ControllerType, getIcon, layouts } from '../controller.ts';
import { ButtonConfig } from '../App.vue';
import { DropdownItem } from './IconDropdown.vue';

const props = defineProps<{
  layout: ControllerType
  mapping: ButtonConfig[]
}>()

let items: Ref<DropdownItem[]> = ref([])
for (const [itemkey, item] of Object.entries(layouts[props.layout].features)) {
  items.value.push({
    label: itemkey,
    url: getIcon(props.layout, itemkey),
  })

  if (item.features) {
    for (const [subitemkey, _subitem] of Object.entries(item.features)) {
      items.value.push({
        label: `${itemkey}.${subitemkey}`,
        url: getIcon(props.layout, `${itemkey}.${subitemkey}`),
      })
    }
  }
}
</script>

<template>
  <div class="print:hidden mx-8 mb-8">
    <div class="ml-4 mb-2 text-xs text-gray-500">button definitions</div>
    <div>
      <ButtonEditor v-for="(_item, ix) in mapping" v-model="mapping[ix]" :items="items" @delete="mapping.splice(ix, 1)" />
    </div>
    <div class="mt-6 ml-4 mb-2 text-xs text-gray-500">define another button</div>
    <div class="p-2 rounded-md border border-slate-400">
      ButtonEditor?
    </div>
  </div>
</template>

<style scoped>
</style>
