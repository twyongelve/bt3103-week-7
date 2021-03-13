<template>
  <div>
    <h1>{{storename}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      storename: 'RK House No Pork',
    }
  },
  /*
  components: {
    'pContent':PageContent
  }
  */
}
</script>

<style>
h1 {
  text-align: center;
  font-size: 60px;
  background-color: black;
  color: white;
}
</style>
