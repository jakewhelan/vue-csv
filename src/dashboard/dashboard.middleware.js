import { DashboardService } from './dashboard.service'
import { AppService } from '@app/app.service'
import { Routes } from '@app/app.routes'

export const DashboardMiddleware = (to, _, next) => {
  const isCSVUploaded = DashboardService.isCSVUploaded()

  if (!isCSVUploaded && to.name !== Routes.DashboardUpload.name) {
    AppService.goToDashboardUpload()
    return
  }
  
  console.log(isCSVUploaded, to, Routes.DashboardUpload.name)
  console.log(isCSVUploaded, to === Routes.DashboardUpload.name)
  if (isCSVUploaded && to.name === Routes.DashboardUpload.name) {
    AppService.goToDashboard()
    return
  }

  next()
}