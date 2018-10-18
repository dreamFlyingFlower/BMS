<template>
  <div id="user"></div>
</template>

<script>
import apiUser from "@/api/user";

export default {
  name:"User",
  data(){
    return {
      datas:[]
    }
  },
  created(){
    this.getPages();
  },
  methods:{
    getPages(){
      apiUser.getPages({pageIndex:1,pageSize:10}).then(resp => {
        console.log(resp);
        if(resp !== undefined){
          console.log(resp);
          this.datas = resp.data;
          console.log(this.datas);
        }
      });
    }
  }
}
</script>
