<template>
  <div class="container">
    <router-link
      :to="{ name: 'ServicesCreate' }"
      class="btn btn-success w-100 mb-3 mt-3"
      >Create</router-link
    >
    <table class="table">
      <thead class="table-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Cost</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          @dblclick="
            this.$router.push({
              name: 'ServicesEdit',
              params: { id: service.id },
            })
          "
          v-for="service in this.services"
          :key="service.id"
        >
          <th scope="row">{{ service.id }}</th>
          <td>{{ service.title }}</td>
          <td>{{ service.cost }}</td>
          <td>{{ service.active ? "Active" : "Not active" }}</td>
          <td>
            <button @click="this.delete(service.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      services: {},
    };
  },
  mounted() {
    this.getMainRequest();
  },
  methods: {
    async getMainRequest() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/api/services`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.services = response.data.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async delete(id) {
      try {
        await axios
          .put(
            `${process.env.VUE_APP_API_URL}/api/services/` + id,
            {
              active: false
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            this.getMainRequest();
          });
      } catch (e) {
        console.log(e.response.data);
      }
    },
  },
};
</script>