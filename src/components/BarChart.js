import { Bar } from 'vue-chartjs'
import database from "../firebase.js"

export default{
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels: ["Cereal Prawn", "Dry Beef Hor Fun", "Mapo Tofu", "Pork Fried Rice", "Prawn omelette","Sambal KangKung"],
                datasets: [{
                    label: "Food Orders (numbers)",
                    backgroundColor: ["red", "blue", "green", "yellow", "orange"],
                    data: []
                }]
            },
            options: {
                legend: { display: false},
                title: {
                    display: true,
                    text: 'Total Number of Each Dish'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
            var orders = {};
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    if (Object.keys(orders).length === 0) {
                        for (let i = 0; i < 6; i++) {
                            orders[doc.data().order[i].food] = parseInt(doc.data().order[i].quantity, 10);
                        }
                    } else {
                        for (let i = 0; i < 6; i++) {
                            orders[doc.data().order[i].food] += parseInt(doc.data().order[i].quantity, 10);
                        }
                    }
                })
                for (var item in orders) {
                    this.datacollection.datasets[0].data.push(orders[item]);
                }
                this.renderChart(this.datacollection, this.options);
            })

                    
        }
    },
    created() {
        this.fetchItems();
    },
}