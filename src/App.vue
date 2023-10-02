<script setup lang="ts">
import { ref, Ref } from 'vue'
import { ControllerType } from './controller'

import Editor from './components/Editor.vue'
import LayoutRender from './components/LayoutRender.vue'
import Menu from './components/Menu.vue'

// this is our main file, so it contains the "main data", and everything roots from here
// this means this owns:
// * controller type
// * mapping list
// * mapping title

// Menu fires events to do actions, and App takes care of them?
// App loads query string on load?
// LayoutRender is provided the type+list, and it builds the stuff
// Editor is provided the type+list, and it edits the list?

export type ButtonConfig = {
  id: string;
  modifiers: string[];
  description: string;
}

export type JsonButtonConfig = {
  version: number;
  name: string;
  date: string;
  layout: ControllerType;
  mapping: ButtonConfig[];
}

let layout: Ref<ControllerType | undefined> = ref(undefined)

const title: Ref<string> = ref("")
const mapping: Ref<ButtonConfig[]> = ref([])

function loadJSON(jsonmap: JsonButtonConfig) {
  // TODO: validate JSON
  if (jsonmap.version == 1) {
    title.value = jsonmap.name
    layout.value = jsonmap.layout
    mapping.value = jsonmap.mapping
  }
}

const params = new URLSearchParams(document.location.search)
if (params.has('p')) { // To load a preset configuration.
  // e.g. http://....?p=testing
  const p = params.get('p')
  if (p.match(/^[a-zA-Z0-9]+/)) {
    fetch(`./presets/${p}.json`)
      .then((response) => response.json())
      .then((data) => {
        loadJSON(data as JsonButtonConfig)
      })
      .catch(console.error)
  }
}
else if (params.has('l')) { // To start a new layout of a specific type.
  // e.g. http://....?l=xboxone
  const l = params.get('l') as ControllerType
  layout.value = Object.values(ControllerType).includes(l) ? l : undefined
}
</script>

<template>
  <Menu />

  <LayoutRender v-if="layout" :layout="layout" :title="title" :mapping="mapping" />
  <Editor v-if="layout" :layout="layout" :mapping="mapping" />

  <div v-if="!layout" class="m-8 font-bold">Invalid Layout</div>
</template>

<style scoped>
</style>
