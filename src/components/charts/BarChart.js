import {Bar} from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            temp: [],
            labels: [],
            count: {},
            datasets: [{
                label: "Dish count",
                backgroundColor: ["blue","purple","green","orange","brown","yellow","purple"],
                data: [],
                borderWidth:1.0,
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                yAxes:[{
                    ticks:{
                        min:0,
                        //max:20,
                    }
                 }],  
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        
        querySnapShot.forEach(doc => {
            this.datacollection.temp.push(doc.data().orderItems)
            //this.datacollection.datasets[0].backgroundColor.push(doc.data().color)
            //this.datacollection.datasets[0].data.push(doc.data().orderItems)
        })
        for (let i = 0; i < this.datacollection.temp.length; i++) {
            for (let j = 0; j < this.datacollection.temp[i].length; j++) {
                //console.log(this.datacollection.temp[i][j].itemName)
                if (this.datacollection.labels.includes(this.datacollection.temp[i][j].itemName)) {
                    this.datacollection.count[this.datacollection.temp[i][j].itemName] 
                    = Number(this.datacollection.count[this.datacollection.temp[i][j].itemName]) 
                    + Number(this.datacollection.temp[i][j].itemQuantity);
                    continue;
                } else {
                    this.datacollection.labels.push(this.datacollection.temp[i][j].itemName);
                    this.datacollection.count[this.datacollection.temp[i][j].itemName] = Number(this.datacollection.temp[i][j].itemQuantity);
                }
                
            }  
        }
        //alert(this.datacollection.labels)
        //console.log(this.datacollection.count);
        //console.log(this.datacollection.labels);
        //alert(this.datacollection.datasets[0].data);
        for (var c in this.datacollection.labels) {
            this.datacollection.datasets[0].data.push(this.datacollection.count[this.datacollection.labels[c]]);
        }   
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}