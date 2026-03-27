import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import './controller.css'

import App from './App.vue'

/* import fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAdd,
  faGripLinesVertical,
  faRotateLeft,
  faRotateRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import {
  faClipboard,
} from '@fortawesome/free-regular-svg-icons'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
library.add(
  faAdd,
  faClipboard,
  faGithub,
  faGripLinesVertical,
  faRotateLeft,
  faRotateRight,
  faTrash,
)

createApp(App)
  .use(createPinia())
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
