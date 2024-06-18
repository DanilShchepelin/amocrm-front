<template>
  <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
  />
  <a-table :columns="columns" :data-source="dataSource" :scroll="{ x: 2000 }" :pagination="false">
    <template #bodyCell="{ column, value }">
      <template v-if="column.key === 'status'">
        <span style="padding: 5px; border-radius: 5px;" :style="{ background: value.color }">
          {{ value?.name }}
        </span>
      </template>
      <template v-else-if="column.key === 'responsible'">
        {{ value?.name }}
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <div v-for="contact in record.contacts" :key="contact.id" >
        <div>{{contact.name}}</div>
        <div v-if="contact?.phones?.length > 0">
          <span v-if="contact.phones.length > 1" style="margin-top: 5px">Телефоны</span>
          <span v-else style="margin-top: 5px">Телефон</span>
          <a v-for="phone in contact.phones" :key="phone.value" href="tel:'`${phone.value}`" style="margin-top: 3px; display: block">{{phone.value}}</a>
        </div>

        <div v-if="contact?.emails?.length > 0">
          <span style="margin-top: 5px">Email</span>
          <a v-for="email in contact.emails" :key="email.value" href="mailto:'`${email.value}`" style="margin-top: 3px; display: block">{{email.value}}</a>
        </div>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent, onMounted, ref} from "vue";

interface DataItem {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  responsibleUserId: string;
  responsibleUserName: string;
  statusId: string;
  statusName: string;
  statusColor: string;
  contacts: Contacts[]
}

interface Contacts {
  id: number;
  name: string;
  phones: Record<string, string>[]
  emails: Record<string, string>[]
}


export default defineComponent({
  setup() {
    const value = ref<string>('');
    const dataSource = ref([] as DataItem[]);
    const columns = [
      { title: 'Название', dataIndex: 'name', key: 'name', fixed: true },
      { title: 'Бюджет', dataIndex: 'price', key: 'price' },
      { title: 'Статус', dataIndex: 'status', key: 'status' },
      { title: 'Ответственный', dataIndex: 'responsibleUser', key: 'responsible' },
      { title: 'Дата создания', dataIndex: 'createdAt', key: 'createdAt' },
    ];
    const onSearch = (searchValue: string) => {
      fetchData(searchValue)
    };
    const fetchData = async (value: string) => {
      try {
        let url = 'http://127.0.0.1:3000/api/leads';
        if (value?.length > 3) {
          url += `?query=${value}`
        }
        const response = await axios.get(url);
        dataSource.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    onMounted(async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/leads');
        dataSource.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
    return {
      dataSource,
      columns: columns,
      onSearch,
      value
    };
  },
});
</script>
