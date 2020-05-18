import Vue from 'vue'
import App from './app.component.vue'
import { store } from './app.store.js'
import { router } from './app.router.js'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

async function registerServiceWorker () {
  if (!process.env.PRODUCTION) return

  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js')
      console.log('registered!')
    } catch (e) {
      console.error(e)
    }
  } else {
    console.warn('This browser does not support service workers and so the integrated-systems-poc PWA features have been disabled.')
  }
}

window.addEventListener('load', () => {
  registerServiceWorker()
})

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  window.deferredInstallPrompt = event;
});
