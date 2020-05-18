<script>
  import { AuthenticationService } from '@authentication/authentication.service'
  import { AppService } from '@app/app.service'
  import CoreButton from '@core/button.component'
  import CoreInput from '@core/input.component'
  import CoreHeading from '@core/heading.component'

  export default {
    name: 'csv-login',
    components: {
      CoreButton,
      CoreInput,
      CoreHeading
    },
    data: () => ({
      username: '',
      password: '',
      error: ''
    }),
    computed: {
      hasError() {
        return Boolean(this.error)
      }
    },
    methods: {
      async login() {
        const { username, password } = this
        const success = await AuthenticationService.login(username, password)

        if (success) {
          this.error = ''
          AppService.continueToInterceptedRoute()
        } else {
          this.error = 'Invalid username or password'
        }
      }
    }
  }
</script>
    
<template>
  <div>
    <CoreHeading
      heading="Login to continue"
      subheading="Please enter your username and password below"
    />
    <div 
      :class="{
        inputContainer: true,
        errorShown: hasError
      }"
    >
      <div
        v-show="hasError"
        class="error-announcement"
      >
        {{ error }}
      </div>
      <CoreInput 
        @keyup.enter="login"
        v-model="username"
        placeholder="Username"
        focusOnInit
        :hasError="hasError"
      />
      <CoreInput
        @keyup.enter="login"
        v-model="password"
        placeholder="Password"
        type="password"
        :hasError="hasError"
      />
      <CoreButton
        @click="login"
      >
        login
      </CoreButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .inputContainer {
    max-width: 500px;
    margin: 0 auto;
    margin-top: 80px;

    
    &.errorShown {
      margin-top: 27px;
    }

    input:nth-of-type(2) {
      margin-top: 10px;
      margin-bottom: 40px;
    }

    button {
      width: 100%;
      margin: 0 auto;
    }

    .error-announcement {
      background: darken(red, 10%);
      padding: 8px 20px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      max-width: 800px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 10px;
      font-size: 18px;
    }
  }
</style>