<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <menu-tree v-for="route in permission_routers" :key="route.menuId" :item="route" :baseIndex="route.menuId+''" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MenuTree from './MenuTree';
  import common from '@/utils/common';

  // 页面左边的菜单栏
  export default {
    components: {
      MenuTree
    },
    data(){
      return {
        permission_routers : common.getSession("SET_MENUS")
      }
    },
    created(){
      console.log(this.permission_routers);
    },
    computed: {
      ...mapGetters([
        // 'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
