import './style.css';
import './controller.css';

import Alpine from 'alpinejs';

import app from './app';
import controller from './controller';
import layout from './layout';

// make Alpine on window available for better DX
window.Alpine = Alpine;

// register stores and data
Alpine.store('app', app());
Alpine.data('controller', controller);
Alpine.data('layout', layout);

// load plugins

// start (must be last!)
Alpine.start();
