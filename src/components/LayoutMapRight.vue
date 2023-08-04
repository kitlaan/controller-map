<script setup lang="ts">
import { ButtonConfig } from '../App.vue'
import { ControllerType, getIcon } from '../controller'

defineProps<{
  layout: ControllerType
  mapping: ButtonConfig[]
}>()
</script>

<template>
  <table class="mapdef-right">
    <tr v-for="item in mapping">
      <td>{{ item.description }}</td>
      <td class="icon">
        <img v-for="mod in item.modifiers" :src="getIcon(layout, mod)" />
        <span v-if="item.modifiers?.length">+</span>
        <img :src="getIcon(layout, item.id)" />
      </td>
    </tr>
  </table>
</template>

<style scoped>
</style>
