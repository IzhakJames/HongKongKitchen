<template>
  <div class="pageContent">
    <div id="itemsList">
      <ul>
        <li v-for="item in items" v-bind:key="item.id">
          <h3 id="itemName">{{ item.name }}</h3>
          <img v-bind:src="item.imageURL" alt="food" />
          <p id="price">${{ item.price }}</p>
          <counterBtn
            v-bind:itemSelected="item"
            v-on:counter="onCounter"
          ></counterBtn>
        </li>
      </ul>
    </div>
    <basket id="shoppingBasket" v-bind:selected="itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter";
import Basket from "./Basket";
import database from "../firebase.js";

export default {
  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },
  components: {
    counterBtn: QuantityCounter,
    basket: Basket,
  },
  methods: {
    onCounter: function(item, count) {
      var temp = [...this.itemsSelected];
      if (this.itemsSelected.length === 0 && count > 0) {
        //if there is nothing in items selected, push ORDER in
        temp.push([item.name, count, item.price]);
      } else {
        // loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          if (item_name === item.name && count > 0) {
            temp[i][1] = count;
            break;
          } else if (item_name === item.name && count === 0) {
            temp.splice(i, 1);
            break;
          } else if (
            item_name !== item.name &&
            i + 1 === this.itemsSelected.length
          ) {
            temp.push([item.name, count, item.price]);
            break;
          } else {
            continue;
          }
        }
      }
      this.itemsSelected = [...temp];
    },
    fetchItems: function() {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.items.push(doc.data());
          });
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
  font-size: 30px;
}
</style>
