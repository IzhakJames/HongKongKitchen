<template>
  <div class="counterBtn">
    <button v-on:click="decrement()">-</button>
    <span>{{ counter }}</span>
    <button v-on:click="increment()">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  props: {
    itemSelected: {
      type: Object,
    },
  },
  methods: {
    increment: function() {
      if (this.counter === 10) {
        alert("You cannot buy more than 10 items.");
      } else {
        this.counter++;
      }
      this.$emit("counter", this.itemSelected, this.counter);
    },
    decrement: function() {
      if (this.counter > 0) {
        this.counter--;
      }
      this.$emit("counter", this.itemSelected, this.counter);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 5vw;
  height: 10vh;
  font-size: 30px;
  margin: 0px 20px;
  border-radius: 10px;
  background: rgb(253, 188, 199);
}

span {
  font-size: 30px;
}
</style>
