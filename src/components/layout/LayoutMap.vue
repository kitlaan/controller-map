<script setup lang="ts">
import type { ButtonConfig } from '../../domain/types'
import { ControllerType, getIcon } from '../../controller'

defineProps<{
  layout: ControllerType
  mapping: ButtonConfig[]
  align: 'left' | 'right'
}>()
</script>

<template>
  <table :class="align === 'left' ? 'mapdef-left' : 'mapdef-right'">
    <tr v-for="item in mapping">
      <template v-if="align === 'left'">
        <td class="icon">
          <img :src="getIcon(layout, item.id)" />
          <span v-if="item.modifiers?.length">+</span>
          <img v-for="mod in item.modifiers" :src="getIcon(layout, mod)" />
        </td>
        <td>{{ item.description }}</td>
      </template>
      <template v-else>
        <td>{{ item.description }}</td>
        <td class="icon">
          <img v-for="mod in item.modifiers" :src="getIcon(layout, mod)" />
          <span v-if="item.modifiers?.length">+</span>
          <img :src="getIcon(layout, item.id)" />
        </td>
      </template>
    </tr>
  </table>
</template>

<style scoped>
</style>
