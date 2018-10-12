<template>
  <div id="user">
    <h1>角色页面</h1>
  </div>
</template>

<script>
import common from '@/utils/common'

export default {
  name:"role",
  data(){
    return {

    }
  },
  created(){
    console.log(common.getSession("SET_MENUS"));
  }
}
</script>
