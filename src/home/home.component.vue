<script>
// TODO: add VUE CSV giant text as bg, change colour to dark (home page only)
// steal title style from: https://babeljs.io/setup
// TODO: create @common/input.component, @common/grid.component, @common/title.component

  import { AppService } from '@app/app.service'
  import CoreButton from '@core/button.component'

  export default {
    name: 'csv-home',
    components: {
      CoreButton
    },
    computed: {
      isAppPWA: () => window?.matchMedia('(display-mode: standalone)').matches
    },
    methods: {
      goToDashboard() {
        AppService.goToDashboard()
      },
      install() {
        if (!window.deferredInstallPrompt) return
        window.deferredInstallPrompt.prompt()
      }
    }
  }
</script>
    
<template>
  <div class="main">
    <div class="content">
      <h1>VUE CSV is a .CSV parser and viewer.</h1>
      <h2>Upload, view, sort and filter .CSV data right in your browser.</h2>
      <CoreButton 
        @click="goToDashboard"
        lightMode
        large
      >
        Get started
      </CoreButton>
      <div
        v-show="!isAppPWA"
        @click.prevent="install"
        class="announcement"
      >
        Click here to <strong>install VUE CSV to your device</strong> and avail of offline mode.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .main {
    background: #24292e;
    max-width: 100vw !important;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 200vh;
      height: 500vw;
      background-size: 80%;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDc1IDE5NS41Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxwYXRoIGlkPSJfVlVFX0NTViIgZGF0YS1uYW1lPSIgIFZVRSBDU1YiIGNsYXNzPSJjbHMtMSIgZD0iTTE3NS43NjIsOTAuODExSDEyOC44MjlMNjMuMTc0LDIyMS4wNjRxLTIuNzY5LDUuNTM4LTQuNjgsMTAuMjg0dC0zLjEsOC41NjlINTQuMzQxYTQzLjc0LDQzLjc0LDAsMCwwLC43MjUtOC45cS0wLjA2OC00LjgxLS40NjEtOS40MjZMNDEuODE3LDkwLjgxMUgtMS44MjFMMjIuNDM3LDI3OS44NjNINjkuMzcxWm0xNzcuNDUxLDBIMzEwLjIzNUwyODYuMjQxLDIwMi4wOGE5OC40MSw5OC40MSwwLDAsMS02LjU5MiwyMS4wMjgsNDcuMzEsNDcuMzEsMCwwLDEtOS4xLDEzLjY0NSwzMC4zNTgsMzAuMzU4LDAsMCwxLTExLjYsNy4zODMsNDIuMzQxLDQyLjM0MSwwLDAsMS0xMy45NzUsMi4yNDEsMzQuOSwzNC45LDAsMCwxLTEyLjA2My0yLjA0NCwyNy43MjMsMjcuNzIzLDAsMCwxLTkuNzU2LTYsMjYuOTUxLDI2Ljk1MSwwLDAsMS02LjQ2LTkuODIyQTM2LjczNywzNi43MzcsMCwwLDEsMjE0LjM5LDIxNWE3Mi43NTMsNzIuNzUzLDAsMCwxLDEuMTg3LTExLjg2NXExLjE4Ni02Ljk4NywyLjYzNi0xMy45NzVsMjEuMzU4LTk4LjM0OUgxOTYuNTkyTDE3NS41LDE4OC45cS0xLjU4Myw3LjEyMS0yLjYzNywxNS4zNTlhMTE5LjM0LDExOS4zNCwwLDAsMC0xLjA1NSwxNS4xLDcxLjQsNzEuNCwwLDAsMCw0Ljc0NiwyNi44MjgsNTUuMSw1NS4xLDAsMCwwLDEzLjU3OSwyMC4wMzksNTkuMjYsNTkuMjYsMCwwLDAsMjEuNDksMTIuNTkxLDg3LjI3NSw4Ny4yNzUsMCwwLDAsMjguNDc2LDQuMzVxMjEuODgzLDAsMzcuMDQ2LTUuNTM3YTY3LjI1MSw2Ny4yNTEsMCwwLDAsMjUuMzc4LTE1Ljk1Miw3OC45NjYsNzguOTY2LDAsMCwwLDE2LjQxNC0yNS4zMTMsMTkwLjQzNSwxOTAuNDM1LDAsMCwwLDEwLjE1MS0zMy40ODZabTE0OS42MzQsMGgtMTA4LjlsLTQwLjIxLDE4OS4wNTNINDY3LjEybDcuMzgyLTM0LjU0MUg0MDMuOTdsOS4yMjktNDIuNDUxaDYxLjNsNy41MTUtMzQuODA1SDQyMC40NWw4Ljk2NS00Mi41ODNoNjYuMDQ5Wk03NDYuNDgsOTYuMjE2cS00LjIyMS0xLjQ0OS05LjY5LTIuOTY2dC0xMS45MzEtMi43NjlRNzE4LjQsODkuMjMsNzExLjI4LDg4LjQzOGExMzMuNzM4LDEzMy43MzgsMCwwLDAtMTQuNzY2LS43OTEsMTQ4LjA4LDE0OC4wOCwwLDAsMC0zNi44NDgsNC4yODUsMTE2LjQsMTE2LjQsMCwwLDAtMjkuOCwxMS45MzEsOTcuMTc2LDk3LjE3NiwwLDAsMC0yMi44MDgsMTguMTk0LDEwMy4wNTUsMTAzLjA1NSwwLDAsMC0xNi4wODMsMjMuMTM3LDExMy4zODMsMTEzLjM4MywwLDAsMC05LjU1OSwyNi43NjMsMTMzLjAyNywxMzMuMDI3LDAsMCwwLTMuMTY0LDI5LjA2OSw5NC4yMDgsOTQuMjA4LDAsMCwwLDUuNzM1LDMzLjY4NCw3MC45NzMsNzAuOTczLDAsMCwwLDQzLjA0NSw0Mi41ODNxMTUuNjg3LDUuODY1LDM1LjQ2NCw1Ljg2N2ExNDcuMzA3LDE0Ny4zMDcsMCwwLDAsMjYuNTY0LTIuMTc1LDEwNC45NDEsMTA0Ljk0MSwwLDAsMCwyMS41NTYtNi4yNjJsOC45NjQtNDAuMjFxLTQuNjE1LDIuMzczLTkuNjg5LDQuNDgyYTEwMi4zMTEsMTAyLjMxMSwwLDAsMS0xMC43NDUsMy43NTcsOTUuODYzLDk1Ljg2MywwLDAsMS0xMiwyLjYzNyw4OC4wOTIsODguMDkyLDAsMCwxLTEzLjU3OS45ODksNjIuMzMyLDYyLjMzMiwwLDAsMS0yMC43LTMuMjMsNDMuNDc0LDQzLjQ3NCwwLDAsMS0xNS44Mi05LjQ5Miw0MS42NzgsNDEuNjc4LDAsMCwxLTEwLjE1MS0xNS40OTEsNTguNzA4LDU4LjcwOCwwLDAsMS0zLjU2LTIxLjIyNiw4Mi4wMyw4Mi4wMywwLDAsMSw0LjYxNC0yNy41NTMsNjYuOTg5LDY2Ljk4OSwwLDAsMSwxMy41OC0yMi45NCw2NS40LDY1LjQsMCwwLDEsMjIuMDgyLTE1Ljc1NHExMy4xMTctNS44NjUsMzAuMjU2LTUuODY3YTgyLjMzNyw4Mi4zMzcsMCwwLDEsMTMuNjQ1LDEuMDU1LDkzLjM2Myw5My4zNjMsMCwwLDEsMTEuNjY4LDIuNyw3Ny41Niw3Ny41NiwwLDAsMSw5Ljk1NCwzLjc1N3E0LjU0OCwyLjExMSw4LjUsNC4yMTlaTTg4My44NTMsOTcuOTNxLTQuNzQ2LTEuOTc4LTEwLjU0Ny0zLjgyM3QtMTIuMzkyLTMuM3EtNi41OTQtMS40NDktMTMuODQzLTIuMzA3YTEyOC4yLDEyOC4yLDAsMCwwLTE1LjAyOS0uODU3cS0xOC43MjMsMC0zMi4yMzQsNS4wNzZUNzc3LjU5MywxMDYuMWE1MS43MDksNTEuNzA5LDAsMCwwLTEyLjc4OCwxOC44NTIsNTkuMDIsNTkuMDIsMCwwLDAtNC4wODcsMjEuNDg5LDU0LjU2Miw1NC41NjIsMCwwLDAsMi42MzcsMTcuNDY5LDUwLjkwOSw1MC45MDksMCwwLDAsNy4zODMsMTQuMjM4LDYxLjM2Niw2MS4zNjYsMCwwLDAsMTEuMzM4LDExLjYsMTA5LjM4NSwxMDkuMzg1LDAsMCwwLDE0LjYzMyw5LjY5cTcuNTE1LDQuMzUxLDEyLjcyMyw3Ljg0NWE1My41MjYsNTMuNTI2LDAsMCwxLDguMzcxLDYuNzIzLDIwLjUsMjAuNSwwLDAsMSw0LjU0OSw2LjcyNCwyMS4xNiwyMS4xNiwwLDAsMSwxLjM4NCw3Ljg0NCwyMi44NywyMi44NywwLDAsMS0xLjQ1LDguMTc0LDE2Ljg3MywxNi44NzMsMCwwLDEtNC43NDYsNi43MjQsMjMuMzE2LDIzLjMxNiwwLDAsMS04LjU3LDQuNTQ4LDQzLjIwOSw0My4yMDksMCwwLDEtMTIuNzg4LDEuNjQ4LDcwLjMxMiw3MC4zMTIsMCwwLDEtMTMuNTc5LTEuMzE5LDc5LjgzMyw3OS44MzMsMCwwLDEtMTIuOTg2LTMuNjkxLDkzLjA3OCw5My4wNzgsMCwwLDEtMTItNS41MzcsOTkuNSw5OS41LDAsMCwxLTEwLjYxMy02LjcyNGwtNy4yNTEsMzcuNDQyYTEwMC42NDYsMTAwLjY0NiwwLDAsMCwxMC45NDMsNC44NzgsMTMyLjY5NCwxMzIuNjk0LDAsMCwwLDEzLjM4MSw0LjI4NCwxMjguODg1LDEyOC44ODUsMCwwLDAsMTUuMTYxLDMuMDMzLDExOC4xNzUsMTE4LjE3NSwwLDAsMCwxNi40MTQsMS4xMiwxMDguNjI0LDEwOC42MjQsMCwwLDAsMjYuMy0yLjgzNCw3NS45Miw3NS45MiwwLDAsMCwxOS4zMTQtNy40NDksNTIuMTQzLDUyLjE0MywwLDAsMCwyMS43NTMtMjMuMjY5LDU2LjMwNiw1Ni4zMDYsMCwwLDAsNC4yODUtMTIuOTg2LDYyLjc1OCw2Mi43NTgsMCwwLDAsMS4yNTItMTEuODY1LDUzLjIxNyw1My4yMTcsMCwwLDAtMi41LTE2Ljg3NSw0Ny42NjEsNDcuNjYxLDAsMCwwLTcuMzgzLTEzLjkwOSw3MC42ODEsNzAuNjgxLDAsMCwwLTExLjgtMTIsMTUzLjI4OCwxNTMuMjg4LDAsMCwwLTE1Ljg4Ni0xMS4xNHEtNi44NTYtNC4yMTgtMTEuNjY4LTcuNzEyYTQ3Ljc2MSw0Ny43NjEsMCwwLDEtNy43NzgtNi44NTYsMjIuOTg2LDIyLjk4NiwwLDAsMS00LjM1MS02Ljk4NywyMi4yMDksMjIuMjA5LDAsMCwxLTEuMzg0LTcuOTc2LDE4Ljc4MywxOC43ODMsMCwwLDEsNS42NjktMTMuMDUyLDIzLjg3MywyMy44NzMsMCwwLDEsOC4xNzQtNS4wNzYsMzQuNDIxLDM0LjQyMSwwLDAsMSwxMi42NTYtMi4wNDMsNjguNTgzLDY4LjU4MywwLDAsMSwxMi45MiwxLjE4Niw5NC42MTYsOTQuNjE2LDAsMCwxLDExLjgsMy4wMzMsODEuNTQzLDgxLjU0MywwLDAsMSwxMC41NDcsNC4yODRxNC45NDQsMi40NDIsOS4wMzEsNC45NDRabTIwMC45MTctNy4xMTloLTQ2LjkzTDk3Mi4xODMsMjIxLjA2NHEtMi43NjksNS41MzgtNC42OCwxMC4yODR0LTMuMSw4LjU2OUg5NjMuMzVhNDMuNzksNDMuNzksMCwwLDAsLjcyNS04LjlxLTAuMDY4LTQuODEtLjQ2MS05LjQyNkw5NTAuODI2LDkwLjgxMUg5MDcuMTg4bDI0LjI1OCwxODkuMDUzaDQ2LjkzM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTg3LjY1NikiLz4KPC9zdmc+Cg==);
      opacity: .3;
      transform: rotate(45deg) translate3d(-160vw, -100vw, 0);
    }
  }

  .content {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 5;

    button {
      margin: 70px auto 30px;
    }
  }

  .announcement {
    background: #f5da55;
    padding: 8px 20px;
    border-radius: 20px;
    display: block;
    margin: 80px auto 0;
    max-width: 800px;
    text-align: center;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    strong {
      font-family: 'Segoe UI Bold', Helvetica, Arial, sans-serif;
    }

    @media screen and (max-width: 768px) {
      margin: 0 -10px;
      border-radius: 0;
    }
  }

  h1 {
    text-align: center;
    margin-top: 80px;
    color: #f5da55;
    font-size: 64px;
    font-family: 'Segoe UI Bold', Helvetica, Arial, sans-serif;

    @media screen and (max-width: 768px) {
      font-size: 48px;
    }
  }

  h2 {
    font-size: 28px;
    color: #fff;
    text-align: center;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  }
</style>