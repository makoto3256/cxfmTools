<template>
  <div>
    <!-- 滚动公告 -->
    <div class="scrolling-notice" v-if="showNotice">
      <marquee behavior="scroll" direction="left">{{ noticeContent }}</marquee>
    </div>

    <!-- 原有的组件内容 -->
    <div class="commuse">
      <div class="commuse-item">
        <div class="text-slate-900 dark:text-slate-100"> 任务 </div>
        <a-cascader allow-search v-model="selectedMissions" :options="cascaderOptions" placeholder="请选择任务" filterable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { Message } from '@arco-design/web-vue';
import MainMission from './json/MainMission.json';
import SubMission from './json/SubMission.json';

const showNotice = ref(true);
const noticeContent = 'LunarCore及其他任何衍生工具都是免费软件，如果你是付费购买的，那你就被骗了，请及时退款并举报。';

const selectedMissions = ref([]);
const cascaderOptions = ref([]);

onMounted(async () => {
  // 延时显示滚动公告
  setTimeout(() => {
    showNotice.value = true;
  }, 1000);

  // 从本地缓存读取地址和管理员密码
  const address = localStorage.getItem('address');
  const adminpass = localStorage.getItem('adminpass');
  const uid = localStorage.getItem('uid')

  if (!address || !adminpass) {
    Message.info('用户未登录，请重试');
    return;
  }

  // 发送请求获取任务信息
  try {
    const response = await axios.post(address, new URLSearchParams({
      command: 'mission running',
      adminpass,
      uid
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const responseData = response.data;
    if (responseData.retcode !== 0) {
      Message.error('获取任务信息失败');
      return;
    }

    const missionInfo = responseData.data.missioninfo;
    cascaderOptions.value = missionInfo.map(mission => ({
      value: mission.mainMission,
      label: MainMission[mission.mainMission.toString()].text,
      children: mission.subMissions.map(subMission => ({
        value: subMission,
        label: SubMission[subMission.toString()]
      }))
    }));
  } catch (error) {
    Message.error('请求失败');
    console.error(error);
  }
});
</script>

<style lang="less" scoped>
/* 添加样式以美化滚动公告 */
.scrolling-notice {
  color: #BEBEBE;
  padding: 8px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 10px; /* 添加圆角样式 */
}

.commuse {
  width: 500px;
  margin: auto;
}

.commuse-item {
  display: flex;
  align-items: center;
  color: #000;
  margin: 18px 0;

  > div {
    &:nth-child(1) {
      width: 150px;
      text-align: right;
      padding-right: 10px;
      color: #6b6a6a !important;  
    }
  }
}
</style>
