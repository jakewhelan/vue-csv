<script>
  import { getDroppedCSV, getUploadedCSV } from './dashboard.helpers'
  import CoreLoading from '@core/loading.component'
  import CoreButton from '@core/button.component'
  import { DashboardService } from './dashboard.service'
  import { AppService } from '@app/app.service'
  import { Routes } from '@app/app.routes'
  import { router } from '@app/app.router'

  export default {
    name: 'csv-dashboard-upload',
    components: {
      CoreLoading,
      CoreButton
    },
    mounted() {
      window.addEventListener('dragenter', this.showDropArea)
    },
    beforeDestroy() {
      window.removeEventListener('dragenter', this.showDropArea)
    },
    data: () => ({
      dropEnabled: false,
      loading: false,
      error: ''
    }),
    computed: {
      isDropAllowed() {
        return this.dropEnabled && !this.loading
      },
      hasError() {
        return Boolean(this.error)
      }
    },
    methods: {
      async uploadCSV(file) {
        this.loading = true
        const success = await DashboardService.uploadCSV(file).catch(() => false)

        if (success) {

          /**
           * We check here to see if the route has changed
           * 
           * The user is allowed to navigate away during the
           * file upload - if they are no longer on the upload
           * page we won't redirect them.
           */
          if (router.currentRoute.name === Routes.DashboardUpload.name) AppService.goToDashboard()
        } else {
          this.loading = false
          this.error = 'There was a problem uploading your CSV'
        }
      },
      uploadFile() {
        this.$refs.fileUploadInput.click()
      },
      onFileUpload(event) {
        const { files } = event.target
        const { file, error } = getUploadedCSV(files)
        
        if (file === null) {
          this.error = error
          return
        }

        this.error = ''
        this.uploadCSV(file)
      },
      showDropArea() {
        this.dropEnabled = true
      },
      hideDropArea() {
        this.dropEnabled = false
      },
      allowFileDrop(event) {
        if (!event.dataTransfer) return
        event.dataTransfer.dropEffect = 'copy'
      },
      onFileDrop (event) {
        const { dataTransfer } = event
        if (!dataTransfer) return

        const { file, error } = getDroppedCSV(dataTransfer)
        if (file === null) {
          this.error = error
          this.hideDropArea()
          return
        }

        this.error = ''
        this.hideDropArea()
        this.uploadCSV(file)
      }
    }
  }
</script>
    
<template>
  <div>
    <div
      @drop.stop.prevent="onFileDrop"
      @dragenter.prevent="allowFileDrop"
      @dragleave.prevent="hideDropArea"
      @dragover.prevent="allowFileDrop"
      v-show="isDropAllowed"
      class="drop-area"
    />
    <div
      @drop.stop.prevent="onFileDrop"
      @dragenter.prevent="allowFileDrop"
      @dragover.prevent="allowFileDrop"
      v-show="isDropAllowed"
      class="drop-area-text"
    >
      Drop file here to upload
    </div>

    <div v-if="loading">
      <CoreLoading
        message="Uploading and parsing your .CSV file"
        class="loading"
      />
    </div>
    <div v-else>
      <div
        v-show="hasError"
        class="error-announcement"
      >
        {{ error }}
      </div>
      <h1 :class="{ errorShown: hasError }">
        Click upload or drop a .CSV file onto this page to begin uploading
      </h1>
      <CoreButton
        @click="uploadFile"
        class="upload-button"
        large
      >
        Upload
      </CoreButton>
      <input
        @change="onFileUpload"
        ref="fileUploadInput"
        type="file"
        hidden
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loading {
    margin-top: 100px;
  }
  
  .drop-area {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    background: #f5da55;
    opacity: .6;
  }

  .drop-area-text {
    position: absolute;
    display: block;
    margin: 0 auto;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    width: 300px;
    transform: translateY(-50%);
    font-size: 28px;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  }

  h1 {
    margin-top: 80px;
    font-size: 28px;
    color: lighten(#24292e, 5%);
    text-align: center;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;

    &.errorShown {
      margin-top: 0;
    }
  }

  .upload-button {
    margin: 50px auto 0;
  }

  .error-announcement {
    background: darken(red, 10%);
    padding: 8px 20px;
    border-radius: 20px;
    display: block;
    margin: 27px auto 0;
    max-width: 800px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 18px;
  }
</style>