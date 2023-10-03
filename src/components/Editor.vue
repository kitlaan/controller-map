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

const newitem: Ref<ButtonConfig> = ref({
  id: '',
  description: '',
  modifiers: [],
})

function addItem() {
  props.mapping.push({...newitem.value})
  newitem.value.id = ''
  newitem.value.description = ''
  newitem.value.modifiers = []
}
</script>

<template>
  <div class="print:hidden mx-8 mb-8">
    <div class="ml-4 mb-2 text-xs text-gray-500">button definitions</div>
    <div>
      <ButtonEditor mode="edit" v-for="(_item, ix) in mapping" v-model="mapping[ix]" :items="items" @action="mapping.splice(ix, 1)" />
    </div>
    <div class="ml-4 mb-2 text-xs text-gray-500 mt-6">define another button</div>
    <div class="mb-32">
      <ButtonEditor mode="add" v-model="newitem" :items="items" @action="addItem" />
    </div>
  </div>
</template>

<style scoped>
</style>
