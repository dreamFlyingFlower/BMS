<template>
  <div id="book">
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
export default {
  data(){
    return {

    }
  },
  created(){

  }
}
</script>

<style lang="scss" scoped>
@mixin li{
  border:10px solid yellow;
}
ul{
  li{
    @include li
  }
}
</style>