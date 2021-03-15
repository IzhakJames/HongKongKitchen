<template>
  <div class="Orders">
    <ul>
      <li v-for="(order, index) in orders" :key="index">
        <div style="float: left; width:50%">
          <div v-for="value in order[1].order" :key="value.index">
            <span>{{ value.food }} : {{ value.quantity }}</span>
          </div>
        </div>
        <button v-on:click="deleteItem($event)" v-bind:id="order[0]">
          Delete
        </button>
        <button v-on:click="route($event)" v-bind:id="order[0]">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.orders.push([doc.id, doc.data()]);
          });
        });
    },
    deleteItem: function(event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete();
    },
    route: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: "modify", params: { id: doc_id } });
      console.log(doc_id);
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
