<template>
  <main>
    <ParticipationHeader @create="handleCreate" />
    <ParticipationList
      ref="participationList"
      :participations="participations"
      @delete="handleDelete"
    />
  </main>
</template>

<script>
import axios from 'axios';
import ParticipationHeader from './components/ParticipationHeader';
import ParticipationList from './components/ParticipationList';

export default {
  name: 'App',
  components: {
    ParticipationHeader,
    ParticipationList
  },
  data() {
    return {
      participations: [],
      token: process.env.VUE_APP_API_KEY,
      url: process.env.VUE_APP_API_URL,
      port: process.env.VUE_APP_API_PORT,
      tokenApi: ''
    }
  },
  async mounted() {
    let maxRetryCount = 3; // Número máximo de tentativas
    let retryCount = 0; // Contador de tentativas

    while (retryCount < maxRetryCount) {
      try {
        const response = await axios.get(`${this.url}:${this.port}/participations`, {
          headers: {
            'Authorization': this.tokenApi,
          }
        });

        response.data.forEach(item => {
          this.participations.push({
            id: item._id,
            firstname: item.first_name,
            lastname: item.last_name,
            part: item.participation,
            color: item.color
          });
        });

        this.updateChart();

        break;

      } catch (error) {
        if (error?.response?.status == 403 || error?.response?.status == 401) {
          this.tokenApi = await this.createToken().then(token => token);
        }

        retryCount++;
      }
    }
  },

  methods: {
    async createToken() {
      try {
        const response = await axios.get(`${this.url}:${this.port}`, {
          headers: {
            'Authorization': this.token,
          }
        });

        return response.data.token; // Retorna o novo token obtido

      } catch (error) {
        console.error(error);
      }
    },

    async handleCreate({ data: { firstname, lastname, part, color }, onSuccess }) {
      if (firstname.trim() === '' || lastname.trim() === '' || part === '' || color === '') {
        return;
      }

      let maxRetryCount = 3; // Número máximo de tentativas
      let retryCount = 0; // Contador de tentativas

      while (retryCount < maxRetryCount) {
        try {
          const response = await axios.post(`${this.url}:${this.port}/participations`, {
            first_name: firstname,
            last_name: lastname,
            participation: part,
            color: color,
          }, {
            headers: {
              'Authorization': this.tokenApi,
            }
          });

          this.participations.push({
            id: response.data._id,
            firstname: firstname,
            lastname: lastname,
            part: part,
            color: color
          });

          this.updateChart();
          onSuccess();

          break;
        } catch (error) {
          if (error?.response?.status == 403 || error?.response?.status == 401) {
            this.tokenApi = await this.createToken().then(token => token);
          }

          retryCount++;
          console.error(error);
        }
      }
    },

    async handleDelete({ id, index }) {
      let maxRetryCount = 3; // Número máximo de tentativas
      let retryCount = 0; // Contador de tentativas

      while (retryCount < maxRetryCount) {
        try {
          await axios.delete(`${this.url}:${this.port}/participations/${id}`, {
            headers: {
              'Authorization': this.tokenApi,
            }
          });

          this.participations.splice(index, 1);
          this.updateChart();

          break;
        } catch (error) {
          if (error.response.status == 403 || error.response.status == 401) {
            this.tokenApi = await this.createToken().then(token => token);
          }

          retryCount++;
          console.error(error);
        }
      }
    },

    updateChart() {
      const participationList = Object.assign({}, this.$refs.participationList);
      participationList.updateChart();
    },
  },
};
</script>
