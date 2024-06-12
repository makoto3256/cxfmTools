<template>
  <a-card title="在线玩家">
    <a-table :columns="columns" :data="data" row-key="uid" />
  </a-card>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const columns = [
      {
        title: 'UID',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: 'Head Icon',
        dataIndex: 'headIcon',
        key: 'headIcon',
      },
    ];

    const data = reactive([]);

    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://61.136.162.144:9999/api/status');
        data.push(...response.data.onlinePlayers);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    onMounted(fetchStatus);

    return {
      columns,
      data
    };
  },
}
</script>

  
  <style scoped>
  img {
    display: block;
    margin: auto;
  }
  </style>