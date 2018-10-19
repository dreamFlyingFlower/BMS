<template>
  <div id="book">
    <tree :datas="menus" :title="title"></tree>
    <ul>
      <li>测试1</li>
      <li>测试2</li>
      <li>测试3</li>
      <li>测试4</li>
      <li>测试5</li>
    </ul>
  </div>
</template>

<script>
import Tree from "Component/Tree";
export default {
  components:{
    Tree
  },
  data(){
    return {
      menus : this.$store.getters.menus,
      title:"menuName"
    }
  },
}
</script>

<style lang="scss" scoped>
// @mixin li{
//   border:10px solid yellow;
// }
// ul{
//   li{
//     @include li
//   }
// }
</style>