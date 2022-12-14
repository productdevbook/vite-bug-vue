import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createHuntersofbookEssential, loadDateFNSLocale } from '@huntersofbook/core'

const locale = await loadDateFNSLocale({
    locale: 'tr-TR',
    storageKey: 'locale'
}) 
const app = createApp(App)
try {
  const huntersofbook = createHuntersofbookEssential({
    config: {
      dateFns: {
        locale
      }
    }
  })
} catch (error) {
  
}
// app.use(huntersofbook)

console.log(locale)

app.mount('#app')