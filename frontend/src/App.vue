<template>
  <div id="app">
    <a-layout class="layout" style="height: 100%;">
      <a-layout-content>
        <a-tabs
          v-model="activeKey"
          type="editable-card">
          <a-tab-pane style="padding: 24px;" tab="Home" key="home"><home /></a-tab-pane>
        </a-tabs>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  components: {
    Home
  },
  data () {
    return {
      activeKey: 'home'
    }
  }
}
</script>


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
