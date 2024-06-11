<template>
  <div class="full-screen">
    <a-page-header
      :style="{ width: '100vw', background: theme === 'dark' ? 'black' : 'white' }"
      title="cxfmTools"
    >
      <template #extra>
        <div class="extra-container">
          <!-- 在线人数显示 -->
          <span class="online-users">在线人数:{{ onlineUsers }}</span>
          
          <!-- GitHub 图标链接 -->
          <a href="https://github.com/lctoolsweb/LunarCoreTools/" target="_blank" rel="noopener noreferrer" class="github-link">
            <SvgIcon name="svg-github" size="small" color="#999999"></SvgIcon>
          </a>
          
          <!-- 主题切换按钮组 -->
          <a-radio-group type="button" default-value="light" @change="toggleTheme">
            <a-radio value="light">Light</a-radio>
            <a-radio value="dark">Dark</a-radio>
          </a-radio-group>
        </div>
      </template>
    </a-page-header>
  </div>
</template>

<script>
import axios from 'axios'; // 导入 Axios 库

export default {
  data() {
    return {
      theme: 'light',
      onlineUsers: 0 // 初始化在线人数为 0
    };
  },
  mounted() {
    // 在组件加载完成后获取在线人数
    this.fetchOnlineUsers();
  },
  methods: {
    toggleTheme(theme) {
      this.theme = theme;
      if (theme === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        document.body.removeAttribute('arco-theme');
      }
    },
    fetchOnlineUsers() {
      // 使用 Axios 发送 GET 请求获取在线人数数据
      axios.get('http://61.136.162.144:9999/api/status')
        .then(response => {
          // 成功获取数据后更新在线人数
          this.onlineUsers = response.data.onlineUserCount;
        })
        .catch(error => {
          console.error('Error fetching online users:', error);
        });
    }
  }
};
</script>

<style>
.full-screen {
  width: 100vw;
  overflow-x: hidden;
}

.a-page-header {
  background: white; 
}
.extra-container {
  display: flex;
  align-items: center; 
}
.github-link {
  text-decoration: none;
  color: inherit;
}
.online-users {
  margin-right: 10px;
  font-weight: bold;
}
</style>
