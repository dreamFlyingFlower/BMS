<template>
  <div>
    <h1>欢迎来到我的王国</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      console.log(this);
    }
  }
}
</script>
