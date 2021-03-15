import { Line } from 'vue-chartjs'
import axios from 'axios'

export default{
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    data: [],
                    fill:false,
                    borderColor: "red",
                    label: 'central'
                },{
                    data: [],
                    fill:false,
                    borderColor: "orange",
                    label: 'east'
                },{
                    data: [],
                    fill:false,
                    borderColor: "yellow",
                    label: 'national'
                },{
                    data: [],
                    fill:false,
                    borderColor: "green",
                    label: 'north'
                },{
                    data: [],
                    fill:false,
                    borderColor: "blue",
                    label: 'south'
                },{
                    data: [],
                    fill:false,
                    borderColor: "purple",
                    label: 'west'
                }
            ]
            },
            options: {
                legend: { display: true},
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23').then(
                response => {response.data.items.forEach(doc => {
                    this.datacollection.labels.push(doc.timestamp);
                    this.datacollection.datasets[0].data.push(doc.readings.co_eight_hour_max.central);
                    this.datacollection.datasets[1].data.push(doc.readings.co_eight_hour_max.east);
                    this.datacollection.datasets[2].data.push(doc.readings.co_eight_hour_max.national);
                    this.datacollection.datasets[3].data.push(doc.readings.co_eight_hour_max.north);
                    this.datacollection.datasets[4].data.push(doc.readings.co_eight_hour_max.south);
                    this.datacollection.datasets[5].data.push(doc.readings.co_eight_hour_max.west);
                })
                this.renderChart(this.datacollection, this.options)
            })
        }        
    },
    created() {
        this.fetchItems();
    },
}