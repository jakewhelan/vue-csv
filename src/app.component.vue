<script>
  import Header from './app-header.component.vue'
  import { AuthenticationService } from '@authentication/authentication.service'

  export default {
    name: 'csv-app',
    components: {
      Header
    },
    beforeMount() {
      AuthenticationService.isUserAuthenticated()
    }
  }
</script>
    
<template>
  <main v-cloak>
    <Header class="header" />
    <Transition name="appear">
      <RouterView class="router" />
    </Transition>
  </main>
</template>

<style lang="scss">
  @import '~modern-css-reset';

  @font-face {
    font-family: lemon-milk;
    src: url('../assets/font/lemon-milk.ttf');
  }

  @font-face {
    font-family: 'Segoe UI';
    src: url('../assets/font/Segoe-UI.ttf');
  }

  @font-face {
    font-family: 'Segoe UI Bold';
    src: url('../assets/font/Segoe-UI-Bold.ttf');
  }

  main {
    font-size: 16px;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
    display: flex;
    min-height: 100vh;
    min-width: 320px;
    flex-direction: column;
  }

  [v-cloak] {
    display: none;
  }

  .router {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    min-width: 320px;

    @media screen and (max-width: 768px) {
      padding: 0 10px;
    }
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
      outline: none;
  }

  .appear-enter-active {
    animation: appear .2s;
  }

  @keyframes appear {
    0% {
      transform: translate3d(-20px, 0, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
</style>