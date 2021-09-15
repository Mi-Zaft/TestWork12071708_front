<template>
  <div class="container">
    <h3 class="mt-5 mb-5">Create a new service</h3>
    <form @submit.prevent>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          aria-label="Title"
          aria-describedby="basic-addon1"
          v-model="this.title"
        />
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">Desc</span>
        <textarea
          v-model="this.desc"
          class="form-control"
          aria-label="Desc"
        ></textarea>
      </div>

      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Cost"
          aria-label="Cost"
          aria-describedby="basic-addon2"
          v-model="this.cost"
        />
      </div>
      <button
        @click="this.createRequest()"
        type="Submit"
        class="btn btn-success w-100"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: null,
      cost: null,
      desc: null,
    };
  },
  mounted() {
    this.getServiceRequest();
  },
  methods: {
    async getServiceRequest() {
      try {
        await axios
          .get(
            `${process.env.VUE_APP_API_URL}/api/services/` +
              this.$route.params.id,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt-token"),
              },
            }
          )
          .then((response) => {
            this.title = response.data.data.title;
            this.cost = response.data.data.cost;
            this.desc = response.data.data.desc;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async createRequest() {
      try {
        await axios
          .put(
            `${process.env.VUE_APP_API_URL}/api/services/` +
              this.$route.params.id,
            {
              title: this.title,
              cost: this.cost,
              desc: this.desc,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.$router.push({ name: "Services" });
          });
      } catch (e) {
        console.log(e.response.data);
      }
    },
  },
};
</script>