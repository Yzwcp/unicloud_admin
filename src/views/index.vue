<template>
    <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <a-menu key="1" theme="dark" mode="inline" :selectedKeys="[$route.path]">
        <a-menu-item key="/bulk">
          <user-outlined />
          <router-link to="/bulk">活动</router-link>
        </a-menu-item>
        <a-menu-item key="/bulkorder">
          <video-camera-outlined />
          <router-link to="/bulkorder">订单</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="   "
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
        <router-view ></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
export default {
    name: 'AdminwxIndex',
    components:{
      PieChartOutlined,
      DesktopOutlined,
      UserOutlined,
      TeamOutlined,
      FileOutlined,
    },
    data() {
        return {
            collapsed:false,
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>

</style>