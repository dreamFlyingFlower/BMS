<template>
  <div>
    <el-tree :data="datas" :props="defaultProps" @node-click="handle"></el-tree>
  </div>
</template>

<script>
export default {
  props:["datas"],
  data(){
    return {
      defaultProps:{
        children:"children",
        label:"menuName"
      }
    }
  },
  methods:{
    handle(data){

    }
  }
}
</script>
