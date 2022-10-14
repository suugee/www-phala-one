import { createRouter, createWebHashHistory } from 'vue-router'

import MyIndex from "./components/MyIndex.vue";
import DashBoard from "./components/DashBoard.vue";
import CalcDelegates from "./components/CalcDelegates.vue";
import CalcRewards from "./components/CalcRewards.vue";
// import SoloMonitor from "./components/SoloMonitor.vue";
import PoolStakers from "./components/PoolStakers.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: MyIndex },
        { path: '/dashboard', component: DashBoard },
        { path: '/delegates', component: CalcDelegates },
        { path: '/rewards', component: CalcRewards },
        // { path: '/monitor', component: SoloMonitor },
        { path: '/stakers', component: PoolStakers },
    ]
})

export default router