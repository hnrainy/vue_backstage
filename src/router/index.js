import Vue from 'vue'
import VueRouter from "vue-router";
import Login from '../views/MyLogin.vue'
import Home from '../components/MyHome.vue'
import Showye from '../views/MyShouye.vue'
import Shangpin from '../views/MyShangpin.vue'
import Pinlei from '../views/MyPinlei.vue'
import Dingdan from '../views/MyDingdan.vue'
import Yonghu from '../views/MyYonghu.vue'
import Xiangqing from '../components/shangpin/MyXiangqing.vue'
import Bianji from '../components/shangpin/MyBianji.vue'
// import Xinzeng from '../components/shangpin/MyXinzeng.vue'
import Dingdanxiangqing from '../components/dingdan/MyDingdanxiangqing.vue'
import Zipinlei from "../components/pinlei/MyZipinlei.vue"
Vue.use(VueRouter)


const routes= [
    {
        path:'/',
        redirect:'/login',
    },
    {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/home',
            name:'home',
            component:Home,
            redirect:'/home/shouye',
            // alias:'/',

           children:[
            
            {
                path:'shouye',
                name:'shouye',
                component:Showye,
            },
            {
                path:'shangpin',
                name:'shangpin',
                component:Shangpin,
            },
            {
                path:'xiangqing/:id',
                name:'xiangqing',
                component:Xiangqing,
            },
            {  path:'bianji/:id',
                name:'bianji',
                component:Bianji,
            },
            {  path:'xinzeng',
                name:'xinzeng',
                component:Bianji,
            },
            {
                path:'pinlei',
                name:'pinlei',
                component:Pinlei,
            },
            {
                path:'zipinlei/:id',
                name:'zipinlei',
                component:Zipinlei,
            },
            {
                path:'dingdan',
                name:'dingdan',
                component:Dingdan,
                children:[
                    
                ]
            },
            {
                        path:'dingdanxiangqing/:num',
                        name:'dingdanxiangqing',
                        component:Dingdanxiangqing
                    },
            {
                path:'yonghu',
                name:'yonghu',
                component:Yonghu
            }
           ]
        }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
