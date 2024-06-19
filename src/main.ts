import { createApp } from 'vue'

import App from './App.vue'
import {Card, Input, Table} from "ant-design-vue";

const app = createApp(App)

app.use(Table)
app.use(Input)
app.use(Card)

app.mount('#app')
