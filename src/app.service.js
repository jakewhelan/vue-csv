import { router } from '@app/app.router.js'
import { Routes } from '@app/app.routes.js'

/**
 * AppService
 * 
 * Provides an API for app-level concerns
 * such as routing.
 */
class AppSvc {
  #authenticatedDestinationName = Routes.Home.name

  /**
   * Checks if provided path is the current route
   * @param {Route} route 
   * @returns {boolean}
   */
  #isCurrentRoute ({ name }) {
    return router.currentRoute.name === name
  }

  goToHome () {
    if (this.#isCurrentRoute(Routes.Home)) return

    const { name } = Routes.Home
    router.push({ name })
  }

  /**
   * @param {string} [authenticatedDestination] the destination the user will land at once they've recieved authorisation
   */
  goToLogin ({ authenticatedDestinationName = Routes.Home.name } = {}) {
    if (this.#isCurrentRoute(Routes.Login)) return

    this.#authenticatedDestinationName = authenticatedDestinationName
    const { name } = Routes.Login
    router.push({ name })
  }

  /**
   * Users without authorisation are forced to the 
   * login page, but once they have logged in this
   * method will send them to their intended destination
   */
  continueToInterceptedRoute () {
    if (this.#authenticatedDestinationName === Routes.Login.name) {
      this.goToHome()
      return
    }
    
    router.push({ name: this.#authenticatedDestinationName })
  }

  goToDashboard () {
    if (this.#isCurrentRoute(Routes.Dashboard)) return
    const { name } = Routes.Dashboard
    router.push({ name })
  }

  goToDashboardUpload () {
    if (this.#isCurrentRoute(Routes.DashboardUpload)) return

    const { name } = Routes.DashboardUpload
    router.push({ name })
  }
}

/**
 * Instantiate and export AuthenticationService as a singleton
 */
export const AppService = new AppSvc()
