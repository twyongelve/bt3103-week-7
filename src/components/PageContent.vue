<template>
  <div>
    <ul class ="ul" style = "width: 66.5%;">
        <li class = "li">
          <router-link to="/" exact>Home</router-link>
        </li>
        <li class = "li">
          <router-link to="/orders" exact>Orders</router-link>
        </li>
        <li class = "li">
          <router-link to = "/Dashboard" exact>Dashboard</router-link>
        </li>
    </ul>
    <div class = "container">
        <ul class = "ul">
          <li class ="li" v-for="item in items" v-bind:key="item.name">
              <h2>{{item.name}}</h2>
              <img v-bind:src="item.imageURL"/>
              <p>${{item.price}}</p>
              <qtyCounter v-bind:item = "item" v-on:counter="onCounter"></qtyCounter>          
          </li>
      </ul>
      <bas v-bind:itemsSelected="itemsSelected"></bas>
    </div>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'
export default {
    data() {
        return {
            itemsSelected: [],
            items: [],
        }
    },
    methods: {
      fetchItems:function(){
        database.collection('menu').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.items.push(item) 
            })      })    
        },
        onCounter: function (item, count) {
          if (this.itemsSelected.length === 0 && count > 0) {
            //If there is nothing in items selected, push the ORDER in
            this.itemsSelected.push([item.name, count, item.price]);
          } else {
            var flag = false;
            // Loop through everything to check what is not in the basket
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const item_name = curr_item[0];
                // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                if (item_name == item.name && count > 0) {
                    flag = true;
                    this.$set(this.itemsSelected[i],1,count);
                    break;
                }
                // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                else if (item_name === item.name && count == 0) {
                    flag = true;
                    this.$delete(this.itemsSelected,i);
                    break;
                }
            }
            // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.   
            if (!flag) {
                this.itemsSelected.push([item.name,count,item.price])
            }
        }
      },
      
    },
    created(){
      this.fetchItems()    
    },
    components: {
    'qtyCounter':QuantityCounter,
    'bas': Basket
  }
}

</script>

<style>

.container{
  display: flex;
  flex-direction: row;
}

#itemsList {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
.ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  font-size: 20px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 15px;
}

#itemName {
  font-size: 20px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 50%;
}

</style>
