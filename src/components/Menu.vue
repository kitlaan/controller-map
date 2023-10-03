<script setup lang="ts">
import { Ref, ref } from 'vue';
import { JsonButtonConfig } from '../App.vue';
import { ControllerType } from '../controller';


defineEmits<{
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
</script>

<template>
  <div class="print:hidden flex flex-row gap-1">
    <button class="rounded border-2 p-1" @click="$emit('loadJsonFile', 'testing')">load preset</button>
    <button class="rounded border-2 p-1" @click="$emit('loadJson', jsonPayload)">load data</button>
  </div>
</template>

<style scoped>
</style>
