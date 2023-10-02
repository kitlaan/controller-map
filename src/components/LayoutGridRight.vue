<script setup lang="ts">
import { computed } from 'vue'
import { ButtonConfig } from '../App.vue'
import { ControllerType, getIcon } from '../controller'

const props = defineProps<{
  layout: ControllerType
  mapping: ButtonConfig[]
}>()

const areSetsEqual = (a: Set<any>, b: Set<any>) =>
  a.size === b.size && [...a].every((value) => b.has(value))
const arrayIncludesArray = (arr: Array<any>[], value: Array<any>) =>
  arr.some((ele) => areSetsEqual(new Set(ele), new Set(value)))

let tableCols = computed(() => {
  let columns = []
  for (const item of props.mapping) {
    if (!arrayIncludesArray(columns, item.modifiers)) {
      columns.push(item.modifiers)
    }
  }
  return columns
})

let tableNeedsHeader = computed(() => {
  for (const col of tableCols.value) {
    if (col.length != 0) {
      return true
    }
  }
  return false
})

let tableRows = computed(() => {
  let rows: string[] = []
  for (const item of props.mapping) {
    if (!rows.includes(item.id)) {
      rows.push(item.id)
    }
  }
  return rows
})

let table = computed(() => {
  let obj = []
  for (const row of tableRows.value) {
    const maps = props.mapping.filter((e) => e.id == row)

    let newrow = []
    for (const col of tableCols.value) {
      newrow.push(maps.find((e) => areSetsEqual(new Set(e.modifiers), new Set(col))))
    }
    obj.push(newrow)
  }
  return obj
})
</script>

<template>
  <table class="mapdef-right">
    <tr v-if="tableNeedsHeader">
      <td v-for="col in [...tableCols].reverse()" class="icon">
        <img v-for="mod of col" :src="getIcon(layout, mod)" />
      </td>
      <td></td>
    </tr>
    <tr v-for="(row, rix) in table">
      <td v-for="(col, _cix) in [...row].reverse()">{{ col && col.description }}</td>
      <td class="icon">
        <img :src="getIcon(layout, tableRows[rix])" />
      </td>
    </tr>
  </table>
</template>

<style scoped>
</style>
