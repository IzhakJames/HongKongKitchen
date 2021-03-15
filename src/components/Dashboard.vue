<template>
  <div id="dashboard">
    <h1>Bar Chart</h1>
    <bar-chart></bar-chart>
    <h1>Line Chart</h1>
    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";
import LineChart from "./LineChart.js";

export default {
  components: {
    BarChart,
    LineChart,
  },
};
</script>

<style scoped></style>
