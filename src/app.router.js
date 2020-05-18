import Vue from "vue"
import Router from "vue-router"
import { AuthenticationMiddleware } from '@authentication/authentication.middleware'
import { DashboardMiddleware } from '@dashboard/dashboard.middleware'
import { Routes } from './app.routes'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: Routes.Login.path,
      name: Routes.Login.name,
      component: () => import("@authentication/authentication.component"),
      beforeEnter: AuthenticationMiddleware
    },
    {
      path: Routes.Home.path,
      name: Routes.Home.name,
      component: () => import("./home/home.component"),
    },
    {
      path: Routes.Dashboard.path,
      component: () => import("@dashboard/dashboard.component"),
      beforeEnter: AuthenticationMiddleware,
      children: [
        {
          path: '',
          name: Routes.Dashboard.name,
          component: () => import("@dashboard/dashboard-grid.component"),
          beforeEnter: DashboardMiddleware
        },
        {
          path: Routes.DashboardUpload.path,
          name: Routes.DashboardUpload.name,
          component: () => import("@dashboard/dashboard-upload.component"),
          beforeEnter: DashboardMiddleware
        },
        
      ]
    }
  ]
})
