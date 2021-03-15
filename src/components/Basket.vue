<template>
  <div class="basket">
    <p>Menu:</p>
    <ul>
      <li v-for="item in selected" v-bind:key="item.index">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <br />
    <button
      v-on:click="
        findTotal();
        sendOrder();
      "
    >
      Calculate Total
    </button>
    <p v-if="calc === true">Subtotal: ${{ subTotal }}</p>
    <p v-if="calc === true">Grand Total: ${{ grandTotal }}</p>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      subTotal: 0,
      calc: false,
      grandTotal: 0,
      orders: [],
      orderedFood: [],
    };
  },
  props: {
    selected: {
      type: Array,
    },
  },
  methods: {
    findTotal: function() {
      this.subTotal = 0;
      for (let i = 0; i < this.selected.length; i++) {
        this.subTotal += this.selected[i][1] * this.selected[i][2];
      }
      this.calc = true;
    },
    sendOrder: function() {
      var food = [
        "Prawn omelette",
        "Dry Beef Hor Fun",
        "Sambal KangKung",
        "Pork Fried Rice",
        "Mapo Tofu",
        "Cereal Prawn",
      ];
      this.orders = [];
      this.orderedFood = [];
      for (let i = 0; i < this.selected.length; i++) {
        this.orderedFood.push(this.selected[i][0]);
        this.orders.push({
          food: this.selected[i][0],
          quantity: this.selected[i][1],
        });
      }
      for (let j = 0; j < 6; j++) {
        if (!this.orderedFood.includes(food[j])) {
          this.orders.push({ food: food[j], quantity: 0 });
        }
      }
      database
        .collection("orders")
        .add({
          order: this.orders,
        })
        .then(() => location.reload());
    },
  },
  watch: {
    subTotal: function() {
      this.grandTotal = parseFloat(this.subTotal * 1.07).toFixed(2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 15vw;
  height: 5vh;
  font-size: 30px;
  margin: 0px 20px;
  border-radius: 10px;
  background: rgb(253, 188, 199);
}
</style>
