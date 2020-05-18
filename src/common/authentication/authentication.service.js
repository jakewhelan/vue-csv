import { authenticationMutations } from './authentication.store'
import HmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import { store } from '@app/app.store'

/**
 * AuthenticationService
 * 
 * Provides an API for managing tokens, communicating
 * with the backend regarding authentication concerns
 * and commiting to authentication vuex state.
 */
class AuthenticationSvc {
  #mockUsers = new Map([
    ['jake', '1234'],
    ['richard', '5678'],
    ['thomas', 'abcd']
  ])
  #jwtKeyStoreKey = 'JWT_KEY_STORE'
  #userTokenKey = 'JWT'

  /**
   * Dirty mocked login/authentication call
   * 
   * - Check credentials and authorises them
   *   if username and password pair are valid
   * - Updating the vuex store with login state
   * - Generates a JWT token and assign it to
   *   the user
   * 
   * @param {string} username users username
   * @param {string} password users password
   * @returns {boolean}
   */
  async login (username, password) {
    const normalisedUsername = username.toLowerCase()

    if (!this.#mockUsers.has(normalisedUsername)) return false
    
    const storedPassword = this.#mockUsers.get(normalisedUsername)
    if (storedPassword !== password) return false

    /**
     * Commit successful login to store
     */
    authenticationMutations.login(username)

    /**
     * Generate and store session token
     */
    const token = this.#generateJWT(username)
    this.#setToken(token)

    return true
  }

  /**
   * Set user as logged out in vuex store
   */
  async logout () {
    this.#revokeToken()
    authenticationMutations.logout()
  }

  /**
   * Checks for the existance of a JWT
   * token and furthermore attempts to
   * discover its relationship with a user.
   * 
   * If either of these checks fail, the
   * user is deemed _not authenticated_.
   */
  isUserAuthenticated () {
    const token = this.#getToken()
    if (token === null) return false

    const user = this.#getUserForToken(token)
    if (user === null) return false

    if (store.state.authentication.user !== user) authenticationMutations.login(user)
    return true
  }

  /**
   * Set users JWT token in localStorage
   * 
   * @param {string} token 
   */
  #setToken(token) {
    window.localStorage.setItem(this.#userTokenKey, token)
  }

  /**
   * Clears the users JWT token
   */
  #revokeToken() {
    window.localStorage.removeItem(this.#userTokenKey)
  }

  /**
   * Retrieve users JWT token from localStorage
   */
  #getToken() {
    return window.localStorage.getItem(this.#userTokenKey)
  }

  /**
   * Queries the keystore with the provided
   * JWT token to see if there is a matching
   * user
   * 
   * @param {string} token 
   */
  #getUserForToken(token) {
    const keyStore = this.#loadKeyStore()
    if (!keyStore.has(token)) return null

    return keyStore.get(token)
  }

  /**
   * Parse the key store (key:username pairs) from
   * localStorage
   * 
   * @returns {Map<string, string>}
   */
  #loadKeyStore () {
    const keystoreExists = Boolean(window.localStorage.getItem(this.#jwtKeyStoreKey) !== null)
    const keyStore = keystoreExists
      ? JSON.parse(window.localStorage.getItem(this.#jwtKeyStoreKey))
      : []

    return new Map(keyStore)
  }

  /**
   * Serialises keystore and stores in localStorage
   * 
   * @param {Map<string, string>} keyStore 
   */
  #saveKeyStore (keyStore) {
    const serialisedKeyStore = JSON.stringify(Array.from(keyStore))
    window.localStorage.setItem(this.#jwtKeyStoreKey, serialisedKeyStore)
  }

  /**
   * Mock token generation
   * 
   * Should obviously be server-side
   * 
   * @param {string} username 
   * @returns {string} signed JWT token
   */
  #generateJWT(username) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }
    const utf8Header = this.#toUtf8(JSON.stringify(header))
    const encodedHeader = this.#toBase64Url(utf8Header)

    const data = {
      username
    }
    const utf8Data = this.#toUtf8(JSON.stringify(data))
    const encodedData = this.#toBase64Url(utf8Data)

    const token = `${encodedHeader}.${encodedData}`
    const secret = 'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAdQVh+/hIIw2I068/wpAUFZq9fsmwWVSkEJ2cVd7e7vDxSpxidO0vnz6cQVTxkHo8V2kNov+bfMWwKlBlFhihoQIDAQAB'
    const signature = HmacSHA512(token, secret)
    const encodedSignature = this.#toBase64Url(signature)
    const signedToken = `${token}.${encodedSignature}`

    const keyStore = this.#loadKeyStore()
    keyStore.set(signedToken, username)
    this.#saveKeyStore(keyStore)

    return signedToken
  }

  /**
   * Encodes value as UTF Uint16Array-alike
   * @param {string} value
   * @returns {CryptoJS.enc.Utf8}
   */
  #toUtf8 (value) {
    console.log(value, Utf8.parse(value))
    return Utf8.parse(value)
  }

  /**
   * Encodes value as base64url
   * @param {CryptoJS.enc.Utf8} value
   * @returns {string}
   */
  #toBase64Url (value) {
    return Base64.stringify(value)
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }
}

/**
 * Instantiate and export AuthenticationService as a singleton
 */
export const AuthenticationService = new AuthenticationSvc()
