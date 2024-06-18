import { createApp } from 'vue'

import App from './App.vue'
import { Input, Table } from "ant-design-vue";

const app = createApp(App)

app.use(Table)
app.use(Input)

app.mount('#app')
