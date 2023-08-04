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
  modifiers?: string[];
  description?: string;
}

let layout: Ref<ControllerType> = ref("xboxone")
const params = new URLSearchParams(document.location.search)
if (params.has('l')) {
  layout.value = params.get('l') as ControllerType
}

// TODO: this is all temporary
const title: Ref<string> = ref("Test")
const mapping: Ref<ButtonConfig[]> = ref([
  { id: 'rstick', description: 'testing rstick with b' },
  {
    id: 'rstickbtn',
    modifiers: ['x', 'a'],
    description: 'testing rstickbtn with x and a',
  },
  { id: 'ltrig', description: 'left', modifiers: ['a'] },
  { id: 'lbtn', description: 'left button', modifiers: ['a'] },
  { id: 'ltrig', description: 'left', modifiers: ['a', 'x'] },
  { id: 'rtrig', description: 'right trigger', modifiers: ['a'] },
  { id: 'rbtn', description: 'right button', modifiers: ['a'] },
  { id: 'dpad', description: 'dpad' },
  { id: 'dpad', description: 'dpad-b', modifiers: ['b'] },
  { id: 'dpad.left', description: 'left-a', modifiers: ['a'] },
  { id: 'dpad.right', description: 'right-a', modifiers: ['a'] },
  { id: 'dpad.up', description: 'up-a-b', modifiers: ['a', 'b'] },
  { id: 'dpad.down', description: 'down-a', modifiers: ['a'] },
  { id: 'view', description: 'view', modifiers: ['a'] },
  { id: 'menu', description: 'menu', modifiers: ['a'] },
  { id: 'lstick', description: 'stick', modifiers: ['a'] },
  { id: 'lstickbtn', description: 'stick', modifiers: ['a'] },
  { id: 'a', description: 'a', modifiers: ['a'] },
  { id: 'x', description: 'x', modifiers: ['a'] },
  { id: 'y', description: 'y', modifiers: ['a'] },
  { id: 'y', description: 'y', modifiers: ['a'] },
  { id: 'b', description: 'b', modifiers: ['a'] },
  { id: 'b', description: 'b', modifiers: ['a'] },
])
</script>

<template>
  <Menu class="print:hidden" />
  <LayoutRender :layout="layout" :title="title" :mapping="mapping" />
  <Editor class="print:hidden" />
</template>

<style scoped>
</style>
