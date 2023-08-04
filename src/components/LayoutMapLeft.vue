<script setup lang="ts">
import { ButtonConfig } from '../App.vue'
import { ControllerType, getIcon } from '../controller'

defineProps<{
  layout: ControllerType
  mapping: ButtonConfig[]
}>()
</script>

<template>
  <table class="mapdef-left">
    <tr v-for="item in mapping">
      <td class="icon">
        <img :src="getIcon(layout, item.id)" />
        <span v-if="item.modifiers?.length">+</span>
        <img v-for="mod in item.modifiers" :src="getIcon(layout, mod)" />
      </td>
      <td>{{ item.description }}</td>
    </tr>
  </table>
</template>

<style scoped>
</style>
