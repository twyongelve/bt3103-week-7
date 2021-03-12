<template>
  <div>
    <li class = "li3" v-for="(key,items) in datapacket" :key="items">
      <ul class = "ul3" v-for="(it,itkey) in key" v-bind:key ="itkey">
        {{it.itemName}}: {{it.itemQuantity}}
        <br><br>
        <input placeholder="0" :id = itkey type ="number" min = "0" >
      </ul>
    </li>
     <button class ="button5" v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            item: {},
            datapacket: [],
            copy: [],
            id: this.$route.params.document_id
        }
    },
    methods: {
      fetchItems:function(){
            //alert('SXfISE4waB0AzOh7ReiX')
            //database.collection('orders').doc('SXfISE4waB0AzOh7ReiX').get().then(snapshot => {
            database.collection('orders').doc(this.$route.params.document_id).get().then(snapshot => {
            this.item = snapshot.data();
            this.datapacket.push(this.item['orderItems']);
        })
      },
      updateOrder:function() {
        for (let i = 0; i < this.datapacket[0].length; i++) {
          //alert(document.getElementById("itkey").value);
          //if (document.getElementById(i).value > 0) {
            if (document.getElementById(i).value == '') {
                this.copy.push({
                  itemQuantity: this.datapacket[0][i].itemQuantity,
                  itemName: this.datapacket[0][i].itemName
                })
            } else {
                this.copy.push({
                itemQuantity: document.getElementById(i).value,
                itemName: this.datapacket[0][i].itemName
            });
          }
            
          //}
        }
        database.collection('orders').doc(this.id).update({
          orderItems: this.copy
        }).then(()=>{
          this.$router.push('/orders');
        });
      }
    },
    created(){
      this.fetchItems()    
    },
}

</script>

<style>

.ul3 {
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.li3 {
  flex-grow: 1;
  flex-basis: 300px;
  /* text-align: center; */
  border: none;
  margin: 10px;
  list-style: none;
  font-size: 20px;
}

.button5 {
  width: 150px;
  height: 50px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  font-size: 20px;
}
</style>