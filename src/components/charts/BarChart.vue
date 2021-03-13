<template>
  <div class="chart">
    <h1 class = "bch1">BarChart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    chart: Chart
  }
};
</script>

<style>
.bch1 {
    background-color: rgb(105, 106, 207);
}
</style>