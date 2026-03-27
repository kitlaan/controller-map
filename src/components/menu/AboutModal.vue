<script setup lang="ts">
import AppModal from '../ui/AppModal.vue';
import { useUiStore } from '../../stores/ui';

const uiStore = useUiStore()
</script>

<template>
  <AppModal v-show="uiStore.openModal === 'about'" @close="uiStore.hideModal()" mask-close close-button>
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
  </AppModal>
</template>
