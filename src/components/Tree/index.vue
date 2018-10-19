<template>
  <div>
    <el-tree :data="datas" :props="defaultProps" @node-click="handle"></el-tree>
  </div>
</template>

<script>
export default {
  props:["datas","title"],
  data(){
    return {
      defaultProps:{
        children:"children",
        label:this.title
      }
    }
  },
  created(){
  },
  methods:{
    handle(data){

    }
  }
}
</script>
