<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <menu-tree v-for="route in memus" :key="route.menuId" :item="route" :baseIndex="route.menuId+''" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex';
  import menuTree from './menuTree';
  import common from '@/utils/common';

  // 页面左边的菜单栏
  export default {
    components: {
      menuTree
    },
    data(){
      return {
        memus : common.getSession("SET_MENUS")
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
