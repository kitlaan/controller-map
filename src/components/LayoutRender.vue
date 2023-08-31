<script setup lang="ts">
import LayoutGridRight from './LayoutGridRight.vue'
import LayoutMapLeft from './LayoutMapLeft.vue'
import LayoutMapRight from './LayoutMapRight.vue'

import { ButtonConfig } from '../App.vue'
import { ControllerType, getImage, layouts } from '../controller'

const props = defineProps<{
  title: string
  layout: ControllerType
  mapping: ButtonConfig[]
}>()

function filterRegion(region: string): ButtonConfig[] {
  // first find the identifiers that go in this region
  var names = []
  for (const [itemkey, item] of Object.entries(layouts[props.layout].features)) {
    if (item.target == region) {
      names.push(itemkey)
    }
    if (item.features) {
      for (const [subitemkey, subitem] of Object.entries(item.features)) {
        if (subitem.target == region) {
          names.push(`${itemkey}.${subitemkey}`)
        }
      }
    }
  }

  // now find the entries that match the identifiers
  let subset = []
  for (const item of props.mapping) {
    if (names.includes(item.id)) {
      subset.push(item)
    }
  }
  return subset
}
</script>

<template>
  <div class="font-bold text-center">{{ title }}</div>

  <div class="controller">
    <div class="controller-above">
      <LayoutMapRight id="controller-above-left-outer" :layout="layout" :mapping="filterRegion('above-left-outer')" />
      <LayoutMapRight id="controller-above-left-inner" :layout="layout" :mapping="filterRegion('above-left-inner')" />
      <LayoutMapLeft id="controller-above-right-inner" :layout="layout" :mapping="filterRegion('above-right-inner')" />
      <LayoutMapLeft id="controller-above-right-outer" :layout="layout" :mapping="filterRegion('above-right-outer')" />
    </div>
    <LayoutMapRight id="controller-left-top" :layout="layout" :mapping="filterRegion('left-top')" />
    <img id="controller-image" :src="getImage(layout)" />
    <LayoutMapLeft id="controller-right-top" :layout="layout" :mapping="filterRegion('right-top')" />
    <LayoutMapRight id="controller-left-bottom" :layout="layout" :mapping="filterRegion('left-bottom')" />
    <LayoutMapLeft id="controller-right-bottom" :layout="layout" :mapping="filterRegion('right-bottom')" />
    <div class="controller-below">
      <LayoutGridRight id="controller-below-left" :layout="layout" :mapping="filterRegion('below-left')" />
      <LayoutMapLeft id="controller-below-right" :layout="layout" :mapping="filterRegion('below-right')" />
    </div>
    <canvas id="controller-overlay"></canvas> <!-- TODO -->
  </div>
</template>

<style scoped>
</style>
