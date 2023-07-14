<template>
  <div class="container">
    <HeaderList />

    <div class="row">
      <div class="col-md-6 mt-4">
        <TableList
          :participations="participations"
          @delete="$emit('delete', $event)"
        />
      </div>

      <div class="col-md-6 mt-4">
        <ChartList ref="chart" :participations="participations" />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import HeaderList from './HeaderList';
  import TableList from './TableList';
  import ChartList from './ChartList';


  export default {
    name: 'ParticipationList',

    components: {
      HeaderList,
      TableList,
      ChartList
    },

    props: {
      participations: {
        type: Array,
        default: () => ([]),
      },
    },

    methods: {
      updateChart() {
        this.$refs.chart.updateChart();
      },
    },
  };
  </script>
  
  
  <style>
  header {
    background-color: #00b8e2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
  }
  
  .btn-primary {
    color: #fff;
    background-color: #00b8e2;
    border-color: #fff;
  }
  
  
  .square-input {
    padding: 12px;
    box-sizing: border-box;
  
  }
  
  .title {
    font-weight: bold;
    font-size: 28px;
    font-family: revert;
    color: #394b50;
  }
  
  .subtitle {
    color: #394b50;
    font-size: 16px;
  
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  ul li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .color-square {
    width: 23px;
    height: 23px;
    margin-right: 10px;
    border-radius: 3px;
  
  }
  
  .chart-text {
    font-family: revert;
    font-weight: 600;
    font-size: 16px;
  }
  </style>