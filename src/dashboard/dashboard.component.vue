<script>
  import CoreHeading from '@core/heading.component'

  export default {
    name: 'csv-dashboard',
    components: {
      CoreHeading
    }
  }
</script>
    
<template>
  <div>
    <CoreHeading
      heading="Dashboard"
      subheading="View, search, filter and see stats about your data"
    />
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
</style>
