<script setup lang="ts">
import { ButtonConfig } from '../App.vue'
import { ControllerType, getIcon } from '../controller'

const props = defineProps<{
  layout: ControllerType
  mapping: ButtonConfig[]
}>()

const areSetsEqual = (a: any, b: any) =>
  a.size === b.size && [...a].every((value) => b.has(value))
const arrayIncludesSet = (arr: Set<any>[], value: any) =>
  arr.some((ele) => areSetsEqual(ele, value))

// build a list of unique button ids
function buildTableRows(): string[] {
  let rows: string[] = []
  for (const item of props.mapping) {
    if (!rows.includes(item.id)) {
      rows.push(item.id)
    }
  }
  return rows
}

// build a set of unique modifier-lists
function buildTableCols(): Set<string>[] {
  let cols: Set<string>[] = []
  for (const item of props.mapping) {
    const mods: Set<string> = new Set(item.modifiers)
    if (!arrayIncludesSet(cols, mods)) {
      cols.push(mods)
    }
  }
  return cols
}

// build the full table, 2D array of row-cols
function buildTable(): Array<Array<ButtonConfig | undefined>> {
  let table = []
  for (const row of tableRows) {
    const maps = props.mapping.filter((e) => e.id == row)

    let tablerow: Array<ButtonConfig | undefined> = []
    for (const col of tableCols) {
      tablerow.push(maps.find((e) => areSetsEqual(new Set(e.modifiers), col)))
    }
    table.push(tablerow)
  }
  return table
}

const tableCols = buildTableCols()
const tableRows = buildTableRows()
const table = buildTable()
</script>

<template>
  <table class="mapdef-right">
    <tr v-if="mapping.length">
      <td v-for="col in tableCols.reverse()" class="icon">
        <img v-for="mod of Array.from(col)" :src="getIcon(layout, mod)" />
      </td>
      <td></td>
    </tr>
    <tr v-for="(row, rix) in table">
      <td v-for="(col, _cix) in row.reverse()">{{ col && col.description }}</td>
      <td class="icon">
        <img :src="getIcon(layout, tableRows[rix])" />
      </td>
    </tr>
  </table>
</template>

<style scoped>
</style>
