<template>
  <div>
    <button class = "button" v-on:click="decrement">-</button>
    <span>{{counter}}</span>
    <button class = "button" v-on:click="increment">+</button>
  </div>
</template>

<script>

export default {
  data() {
      return {
          counter: 0
      }
  },
  methods: {
      increment: function() {
        if (this.counter == 10) {
            alert('You cannot buy more than 10 items.');
            this.$emit('counter', this.item, this.counter)
        } else {
            this.counter++;
            this.$emit('counter', this.item, this.counter)
        }
      },
      decrement: function() {
        if (this.counter != 0) {
          this.counter--;
          this.$emit('counter', this.item, this.counter)
        }
      }
    },
    props: {
      item: Object
    }
}
</script>

<style>

span {
    font-size: 30px;
    margin-left: 10px;
    margin-right: 10px;
}
.button {
    font-family: 'Avenir', Helvatica, sans-serif;
    text-align: center;
    background-color: pink;
    font-size: 30px;
    width: 35px;
    border-radius: 10px;
}
</style>
