import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        temp: [],
        datacollection: {         
            labels: [],
            datasets: [{
                label: "west",
                data: [],
                fill: false,
                borderColor: "red"
            },
            {
                label: "national",
                data: [],
                fill: false,
                borderColor: "blue"
            },
            {
                label: "east",
                data: [],
                fill: false,
                borderColor: "green"
            },
            {
                label: "central",
                data: [],
                fill: false,
                borderColor: "orange"
            },
            {
                label: "south",
                data: [],
                fill: false,
                borderColor: "purple"
            },
            {
                label: "north",
                data: [],
                fill: false,
                borderColor: "lime"
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min:42
                    }
                }]
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
        //axios.get(`https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=100&type=json`)
        axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
        .then(response => {
            this.temp = response.data.items
            for (let date in this.temp) {
                this.datacollection.labels.push(this.temp[date]["timestamp"]+'')
                for (let region in this.temp[date]["readings"]["psi_twenty_four_hourly"]) {
                    if (region == "west") {
                        this.datacollection.datasets[0].data.push(this.temp[date]["readings"]["psi_twenty_four_hourly"][region]);
                    } else if (region == "national") {
                        this.datacollection.datasets[1].data.push(this.temp[date]["readings"]["psi_twenty_four_hourly"][region]);
                    } else if (region == "east") {
                        this.datacollection.datasets[2].data.push(this.temp[date]["readings"]["psi_twenty_four_hourly"][region]);
                    } else if (region == "central") {
                        this.datacollection.datasets[3].data.push(this.temp[date]["readings"]["psi_twenty_four_hourly"][region]);
                    } else if (region == "south") {
                        this.datacollection.datasets[4].data.push(this.temp[date]["readings"]["psi_twenty_four_hourly"][region]);
                    } else {
                        this.datacollection.datasets[5].data.push(this.temp[date]["readings"]["psi_twenty_four_hourly"][region]);
                    }
                }
            }
            console.log(this.datacollection.datasets[0].data)
            //for (let key in this.datacollection.datasets[0].data) {
                //alert(this.datacollection.datasets[0].data[key])
            //}
            /*
            response.data.forEach(data => { 
                this.datacollection.labels.push(data[0])
                this.datacollection.datasets[0].data.push(data[1])
            })
            */
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}