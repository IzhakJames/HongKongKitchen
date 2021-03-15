<template>
  <div id="modify">
    <label for="item1" v-for="(order, index) in datapacket" v-bind:key="index"
      >{{ order.food }}: {{ order.quantity }} <br />
      <br />
      <input
        v-bind:id="index"
        type="number"
        name="item1"
        placeholder="0"
        min="0"
        value="0"
      />
      <br />
    </label>
    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase";

export default {
  data() {
    return {
      doc_id: "",
      datapacket: [],
    };
  },
  props: {
    id: String,
  },
  methods: {
    fetchItems: function() {
      this.doc_id = this.$route.params.id;
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.id === this.doc_id) {
              this.datapacket = doc.data().order;
            }
          });
        });
    },
    updateOrder: function() {
      var temp = [...this.datapacket];
      var newUpdates = [];
      for (let i = 0; i < 6; i++) {
        newUpdates.push(document.getElementById("" + i).value);
      }
      console.log(newUpdates);
      for (let j = 0; j < 6; j++) {
        temp[j].quantity = newUpdates[j];
      }
      console.log(temp);
      database
        .collection("orders")
        .doc(this.doc_id)
        .update({
          order: temp,
        })
        .then(() => this.$router.push({ path: "/orders" }));
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
label {
  padding: 10px 0px;
  display: block;
  font-size: 20px;
}

input {
  padding: 10px 0px;
  display: inline-block;
  height: 10px;
  width: 300px;
}

button {
  width: 200px;
  height: 50px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  font-size: 20px;
}
</style>
