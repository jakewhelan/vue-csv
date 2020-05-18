import { AuthenticationService } from '@authentication/authentication.service'
import { AppService } from '@app/app.service'
import { Routes } from '@app/app.routes'

export const AuthenticationMiddleware = (to, _, next) => {
  const isAuthenticated = AuthenticationService.isUserAuthenticated()

  if (!isAuthenticated && to.name !== Routes.Login.name) {
    AppService.goToLogin({ authenticatedDestinationName: to.name })
    return
  }
  
  if (isAuthenticated && to.name === Routes.Login.name) {
    AppService.goToHome()
    return
  }

  next()
}