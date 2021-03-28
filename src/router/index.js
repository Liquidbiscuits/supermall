import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("../views/home/Home.vue")
const Cart = () => import("../views/cart/Cart.vue")
const Category = () => import("../views/category/Category.vue")
const Profile = () => import("../views/profile/Profile.vue")
const Detail = () => import("../views/detail/Detail.vue")
Vue.use(Router)

export default new Router({
  routes: [
   {
     path:"",
     redirect:"/home"
   },
   {
     path:"/home",
     component:Home
   },
   {
     path:"/cart",
     component:Cart
   },
   {
     path:"/category",
     component:Category
   },
   {
     path:"/profile",
     component:Profile
   },
   {
     path:"/detail/:iid",
     component:Detail
   },
   
  ],
  //将网址中的/#/去掉
  mode: "history",

})
