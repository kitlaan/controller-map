import { createApp } from 'vue'

import './style.css'
import './controller.css'

import App from './App.vue'

/* import fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAdd,
  faGripLinesVertical,
  faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'
library.add(
  faAdd,
  faGithub,
  faGripLinesVertical,
  faTrash,
)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
