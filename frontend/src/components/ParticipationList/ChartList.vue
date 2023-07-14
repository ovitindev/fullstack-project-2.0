<template>
    <div style="max-width: 60%;" class="float-left ml-5">
        <canvas ref="chart"></canvas>
    </div>

    <div class="float-right mt-4">
        <ul>
        <li v-for="participation in participations" :key="participation.id">
            <div :style="{ 'background-color': participation.color }" class="color-square"></div>
            <span class="chart-text" :style="{ 'color': participation.color }">{{ participation.firstname + ' ' +
            participation.lastname }}</span>
        </li>
        </ul>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'ChartList',

    props: {
        participations: {
            type: Array,
            default: () => ([]),
        },
    },
  
    mounted() {
      this.createChart();
    },
  
    methods: {
      createChart() {
        const data = {
          datasets: [{
            data: [],
            backgroundColor: []
          }]
        };
  
        const ctx = this.$refs.chart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'doughnut',
          data: data
        });
      },

      updateChart() {
        if (this.chart) {
          this.chart.data.datasets[0].data = this.participations.map(item => item.part);
          this.chart.data.datasets[0].backgroundColor = this.participations.map(item => item.color);
          this.chart.update();
        }
      },
    },
};
</script>
