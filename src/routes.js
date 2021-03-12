//Step 2 -- Define Routes
import PageContent from './components/PageContent.vue'
import Orders from './components/Orders.vue'
import Modify from './components/Modify.vue'
import DashBoard from './components/Dashboard.vue'

export default[
    { path: '/', component: PageContent},
    { path: '/orders', component: Orders},
    { name: "Modify", path: '/Modify', component: Modify, props:'true'},
    { path: "/DashBoard", component: DashBoard},
]


