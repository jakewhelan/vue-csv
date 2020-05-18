<script>
  import { AgGridVue } from 'ag-grid-vue'

  export default {
    name: 'core-grid',
    props: {
      columnDefs: Array,
      rowData: Array,
      gridStyle: {
        type: String,
        default: ''
      }
    },
    components: {
      AgGridVue
    }
  }
</script>
    
<template>
  <AgGridVue
    class="ag-theme-alpine"
    :style="gridStyle"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :rowBuffer="100"
  />
</template>

<style lang="scss" scoped>
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>