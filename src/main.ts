import { createApp } from 'vue'

import './style.css'
import './controller.css'

import App from './App.vue'

/* import fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGripLinesVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faGripLinesVertical, faTrash)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
