// import { store } from '@app/app.store'
// import { dashboardMutations } from './dashboard.store'
import papa from 'papaparse'

/**
 * DashboardService
 * 
 * Provides an API for uploading and parsing CSV,
 * and interacting with the CSV dashboard
 */
class DashboardSvc {
  #csvRows = null
  #csvFields = null
  #csvStats = {}

  isCSVUploaded() {
    return Boolean(this.#csvRows !== null)
  }

  /**
   * Mock method which would otherwise
   * upload the CSV to the server
   * and recieve the parsed json
   * in response.
   * 
   * When the transaction has resolved
   * it sets the CSV upload status in
   * the dashboard vuex state.
   * 
   * @param {File} CSV
   */
  uploadCSV(file) {
    let rows = []
    let fields = []

    /**
     * Currently no failure condition, so it always
     * resolves true
     */
    return new Promise((resolve, reject) => {
      papa.parse(file, {
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        worker: true,
        skipEmptyLines: true,
        chunk({ data, meta }) {
          rows = rows.concat(data)
          fields = meta.fields
        },
        complete: () => {
          this.#csvRows = rows
            .map(row => {
              const entries = Object
                .entries(row)
                .map(([key, value]) => [key, value || 'BLANK'])

              return Object.fromEntries(entries)
            })
          this.#csvFields = fields
          
          const { lastModifiedDate, name, size } = file
          this.#csvStats = {
            lastModifiedDate,
            name,
            size,
            rowCount: this.#csvRows.length
          }

          resolve(true)
        }
      })
    })
  }

  deleteCSV() {
    this.#csvRows = null
    this.#csvFields = null
  }

  getCSVData() {
    return this.#csvRows
  }

  getCSVFields() {
    return this.#csvFields
  }

  getCSVStats() {
    return this.#csvStats
  }
}

/**
 * Instantiate and export DashboardService as a singleton
 */
export const DashboardService = new DashboardSvc()
