<template>
  <div>
    <ul class ="ul">
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
    <ul class = "ul5">
        <li class ="li5" v-for="id in orders" v-bind:key="id[0]">
            <ul v-for="i in id" v-bind:key="i.itemName">
                <p v-for="k in i.orderItems" v-bind:key="k.itemName">
                    {{k.itemName}}: {{k.itemQuantity}}
                </p>
            </ul>
          <button class = "button4" v-bind:id = "id[0]" v-on:click="deleteItem($event)">Delete</button>
          <button class = "button4" style = "margin-left:10px" v-bind:id = "id[0]" v-on:click="route($event)">Modify</button>
        </li>
        <!--
        <li class ="li2" v-for="o in orders" v-bind:key="o.orderItems.itemName">
            <p v-for="oi in o.orderItems" v-bind:key="oi.itemName">
                {{oi.itemName}}: {{oi.itemQuantity}}
            </p>
            <button v-bind:key="id" v-on:click="deleteItem($event)">Delete</button>
        </li>
        -->
    </ul>
  </div>
</template>

<script>

import database from '../firebase.js'
export default {
    data() {
        return {
            orders: [],
        }
    },
    methods: {
      fetchItems:function(){
        database.collection('orders').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.orders.push([item.id,item]) 
            })      })
        },
      deleteItem:function(event) {
        let doc_id = event.target.getAttribute("id");
        //alert(doc_id)
        database.collection('orders').doc(doc_id).delete().then(()=>{location.reload()});
        //database.collection('orders').doc(event).delete().then(()=>{location.reload()});
      },
      route(event) {
        let doc_id = event.target.getAttribute("id");
        //alert(doc_id)
        this.$router.push({name: 'Modify', params: {document_id: doc_id}})
      }
    },
    created(){
      this.fetchItems()    
    },
}

</script>

<style>

.ul5 {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.li5 {
  flex-grow: 1;
  flex-basis: 300px;
  /* text-align: center; */
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  display: flex;
}

.button4 {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  margin-left: 200px;
}
</style>
