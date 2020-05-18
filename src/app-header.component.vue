<script>
  import { store } from '@app/app.store'
  import { router } from '@app/app.router'
  import { Routes } from '@app/app.routes'
  import { AppService } from '@app/app.service'
  import { AuthenticationService } from '@authentication/authentication.service'
  import to from 'to-case'

  export default {
    name: 'csv-header',
    methods: {
      brandOnClick() {
        AppService.goToHome()
      },
      login () {
        AppService.goToLogin({ authenticatedDestinationName: this.$route.name })
      },
      logout () {
        AppService.goToHome()
        AuthenticationService.logout()
      }
    },
    computed: {
      isUserAuthenticated: () => Boolean(store.state.authentication.user),
      username: () => to.capital(store.state.authentication.user)
    }
  }
</script>
    
<template>
  <header>
    <div class="container">
      <a 
        @click.prevent="brandOnClick"
        class="brand"
      >
        vue csv
      </a>
      <a
        v-if="!isUserAuthenticated"
        @click.prevent="login"
        class="link --last"
      >
        Login
      </a>
      <span
        v-else
        class="login-container"
      >
        <a class="link --no-action --padding-right">
          {{ username }}
        </a>
        <a
          @click.prevent="logout"
          class="link"
        >
          Logout
        </a>
      </span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  header {
    background: #323330;
    width: 100%;
    min-height: 50px;
    max-height: 50px;
    padding: 8px 0;
    flex: 1;
  }

  .container {
    max-width: 1400px;
    min-height: 36px;
    max-height: 36px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
  }

  a {
    display: block;
  }

  .login-container {
    justify-self: flex-end;
    margin-left: auto;
    display: flex;
  }

  .link {
    color: #fff;
    line-height: 36px;
    text-decoration: none;

    &:hover {
      color: #f5da55;
      cursor: pointer;
    }

    &.--no-action {
      color: #f5da55;
      cursor: default;
    }

    &.--last {
      justify-self: flex-end;
      margin-left: auto;
    }

    &.--padding-right {
      padding-right: 25px;
    }

    &.--group {
      display: flex;
    }
  }

  .brand {
    height: 34px;
    display: block;
    color: #f9dc3e;
    font-family: lemon-milk, Arial, Helvetica, sans-serif;
    font-size: 24px;
    line-height: 34px;
    cursor: pointer;
  }
</style>