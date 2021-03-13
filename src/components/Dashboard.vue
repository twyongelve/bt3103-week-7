<template>
    <div>
        <ul class ="ul">
            <li class = "li">
                <router-link to="/" exact>Home</router-link>
            </li>
            <li class = "li">
                <router-link to="/orders" exact>Orders</router-link>
            </li>
            <li class = "li">
                <router-link to = "/Dashboard" exact>Dashboard</router-link>
            </li>
        </ul>
        <div>
            <bar-chart></bar-chart>
            <line-chart></line-chart>
        </div>
    </div>
</template>

<script>

import BarChart from './charts/BarChart.vue'
import CallApi from './charts/CallApi.vue'
export default {
    components: {
        'bar-chart' : BarChart,
        'line-chart' : CallApi,
    }
}
</script>