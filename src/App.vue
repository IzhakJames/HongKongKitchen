<template>
  <div id="app">
    <h1>HongKong Kitchen</h1>
    <ul>
      <li class="nav"><router-link to="/" exact>Home</router-link></li>
      <li class="nav"><router-link to="/orders" exact>Orders</router-link></li>
      <li class="nav">
        <router-link to="/dashboard" exact>Dashboard</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
h1 {
  text-align: center;
  font-size: 50px;
  background: lightblue;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.nav {
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
