<script>
  import { AppService } from '@app/app.service'
  import { DashboardService } from '@dashboard/dashboard.service'
  import CoreGrid from '@core/grid.component'
  import CoreButton from '@core/button.component'
  import to from 'to-case'
  import dayjs from 'dayjs'

  export default {
    name: 'csv-dashboard-grid',
    components: {
      CoreGrid,
      CoreButton
    },
    mounted() {
      const columnDefs = (DashboardService.getCSVFields() || [])
        .map(field => {
          const isDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(this.rowData[0][field])
          const isNumber = typeof this.rowData[0][field] === 'number'

          return {
            headerName: to.capital(field),
            field,
            sortable: true,
            filter: (() => {
              if (isDate) return 'agDateColumnFilter'
              if (isNumber) return 'agNumberColumnFilter'
              return 'agTextColumnFilter'
            })()
          }
        })
        this.columnDefs = columnDefs
    },
    data: () => ({
      columnDefs: []
    }),
    computed: {
      rowData: () => DashboardService.getCSVData(),
      name: () => DashboardService.getCSVStats().name,
      size: () => `${(DashboardService.getCSVStats().size / (1024*1024)).toFixed(2)} MB`,
      rowCount: () => DashboardService.getCSVStats().rowCount.toLocaleString('en-US'),
      lastModifiedDate: () => dayjs(DashboardService.getCSVStats().lastModifiedDate).format('DD/MM/YYYY @ HH:mm (Z)'),
      gridStyle() {
        if (window.innerWidth < 768) return `height: 450px;`

        const appBar = 50
        const heading = 95 + 40 
        const stats = 116
        const padding = 30
        const approximateHeight = window.innerHeight - appBar - heading - stats - padding

        return `height: ${approximateHeight}px;`
      }
    },
    methods: {
      goToUpload() {
        DashboardService.deleteCSV()
        AppService.goToDashboardUpload()
      }
    }
  }
</script>
    
<template>
  <div>
    <div class="grid-header">
      <div class="grid-header-stats">
        <div>File name: {{ name }}</div>
        <div>File size: {{ size }}</div>
        <div>Last modified: {{ lastModifiedDate }}</div>
        <div>Row count: {{ rowCount }}</div>
      </div>
      <div class="grid-header-button">
        <CoreButton @click="goToUpload">
          Start again
        </CoreButton>
      </div>
    </div>
    <CoreGrid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridStyle="gridStyle"
    />
  </div>
</template>

<style lang="scss" scoped>

  .grid-header {
    display: flex;
    padding: 10px;

    .grid-header-button {
      justify-self: flex-end;
      align-self: center;
      margin-left: auto;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;

      .grid-header-button {
        justify-self: center;
        align-self: center;
        margin: 0;
        margin-top: 20px;
        margin-bottom: 5px;
        width: 100%;

        button {
          width: 100%;
        }
      }
    }
  }
</style>