<script setup lang="ts">
import { Ref, ref } from 'vue';
import { JsonButtonConfig } from '../App.vue';
import { ControllerType } from '../controller';
import Modal from './Modal.vue';
// TODO: manually maintaining presets.json for the moment
import RawPresets from '../assets/presets.json'

const emit = defineEmits<{
  (e: 'loadJsonFile', name: string): void
  (e: 'loadJson', data: JsonButtonConfig): void
}>()

const jsonPayload: Ref<JsonButtonConfig> = ref({
  version: 1,
  name: "Test",
  date: "",
  layout: ControllerType.XboxOne,
  mapping: [
  ]
})

const Presets = RawPresets.sort((a, b) => a.name.localeCompare(b.name))

const isAboutVisible: Ref<boolean> = ref(false)
const isPresetsVisible: Ref<boolean> = ref(false)

function loadPreset(filename: String) {
  let name = filename.replace('.json', '')
  emit('loadJsonFile', name)

  isPresetsVisible.value = false
}
</script>

<template>
  <div class="print:hidden flex flex-row gap-1 mb-4 bg-slate-400 px-2">
    <button class="rounded border-2 p-1" @click="$emit('loadJson', jsonPayload)">load data</button>
    <button class="rounded border-2 p-1" @click="isPresetsVisible = true">presets</button>
    <div class="grow"></div>
    <button class="rounded border-2 p-1" @click="isAboutVisible = true">about</button>
  </div>

  <Modal v-show="isAboutVisible" @close="isAboutVisible = false" mask-close close-button>
    <template v-slot:header>About</template>
    <template v-slot:body>
      <p>Welcome to the <span class="font-medium">Controller Map</span>!</p>
      <p>This is a work-in-progress, with some areas more unfinished than others.</p>
      <p>The primary purpose of this tool is to generate a printable map of controller buttons.</p>
      <h3 class="mt-4 font-bold">Credits</h3>
      <p>Thanks to the following people/projects:</p>
      <ul class="list-disc list-inside mx-2">
        <li>XBox Series Button Icons and Controls were created by <a class="underline hover:decoration-blue-400"
            target="_blank" href="https://zacksly.itch.io">Zacksly (Licensed under CC BY 3.0)</a></li>
      </ul>
      <div class="mt-4 flex flex-row justify-center space-x-10">
        <div>
          <a class="underline hover:decoration-blue-400" target="_blank"
            href="https://github.com/kitlaan/controller-map"><font-awesome-icon
              icon="fa-brands fa-github" />&nbsp;github</a>
        </div>
      </div>
    </template>
  </Modal>

  <Modal v-show="isPresetsVisible" @close="isPresetsVisible = false" mask-close close-button>
    <template v-slot:header>Presets</template>
    <template v-slot:body>
      <p>Controller maps as defined by various games by default:</p>
      <ul class="mt-4">
        <li class="px-3 py-1 cursor-pointer hover:bg-gray-200" v-for="item in Presets" @click="loadPreset(item.file)">{{
      item.name }}</li>
      </ul>
    </template>
  </Modal>
</template>

<style scoped>
</style>
