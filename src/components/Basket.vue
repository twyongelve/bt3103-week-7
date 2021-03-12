<template>
  <div class = "div">
    <h2 style ="font-size: 30px; margin-left: 10px;"> Menu: </h2>
    <ul>
        <li style = "font-size: 20px; width: 200px; margin: 20px 0;" v-for="item in itemsSelected" :key="item.id">
            {{item[0]+ " x " + item[1]}}
        </li>
    </ul>
    <button class = "b1" v-on:click="sendOrder()">Add Order</button>
    <div v-show = "check === 'yes'">
        <p class = "p">{{"Subtotal: $"  + total}}</p>
        <p class = "p">{{"Grant Total: $" + totalGST}}</p>
    </div>
  </div>
</template>

<script>
import database from '../firebase.js'

export default {
  data() {
      return {
          check: 'no',
          od : {
            order: [],
          }
      }
  },
  methods: {
      findTotal: function() {
          this.check = 'yes';
          //alert(this.itemsSelected)
      },
      sendOrder: function() {
        for (let i = 0; i < this.itemsSelected.length; i++) {
          var itemName = this.itemsSelected[i][0];
          var itemQuantity = this.itemsSelected[i][1];
          this.od.order.push({itemName,itemQuantity})
        }
        database.collection('orders').add({
          orderItems: this.od.order
        }).then(()=>{location.reload()});
          /*
          for (let i = 0; i < this.itemsSelected.length; i++) {
            database.collection('orders').add({
                name: this.itemsSelected[i][0],
                price: this.itemsSelected[i][1],
                quantity: this.itemsSelected[i][2]
            }).then(() => {location.reload()});
          }
          */
        
        //location.reload();
      }
  },
  computed:{
      total: function(){
        var total = 0;
        for (let i = 0; i < this.itemsSelected.length; i++){
          total += this.itemsSelected[i][1]*this.itemsSelected[i][2];
        }
        return Math.round(total * 100) / 100;
      },
      totalGST: function(){
        var total = 0;
        for (let i = 0; i < this.itemsSelected.length; i++){
          total += this.itemsSelected[i][1]*this.itemsSelected[i][2];
        }
        return Math.round(total*1.07 * 100) / 100;
      }
    },
  props: {
      itemsSelected: Array
  }
}
</script>

<style>

.b1 {
  margin-top: 50px;
  margin-left: 20px;
  text-align: center;
  font-size: 20px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  width: 150px;
  height: 50px;
}
h2 {
  font-size: 24px;
  padding: 10px;
}

.p {
  margin-left: 20px;
}
</style>
