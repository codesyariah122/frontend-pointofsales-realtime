<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <navbars-admin-navbar />

      <headers-header-stats />


      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <Nuxt />
        <footers-footer-admin />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import globals from '@/mixins/globals'

  Vue.mixin(globals)

  export default {
    mixins: [globals],
    data() {
      return {
        api_url: process.env.NUXT_ENV_API_URL,
        expires_at: ''
      };
    },

    beforeMount() {
      this.authTokenStorage();
    },

    mounted() {
      this.checkIsLogin();
      this.checkExpires();
    },

    methods: {
      authTokenStorage() {
        this.$store.dispatch("auth/storeAuthToken", "auth");
      },

      checkExpires() {
        if (this.token !== null) {
          const endPoint = `${this.api_url}/fitur/user-login`;
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
          };
          this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            const now = this.$moment().format('LLL')
            this.expires_at = this.$moment(data.data[0].expires_at).format('LLL')
            const roles = this.$role(data.data[0].roles[0].roles)
            if(now>=this.expires_at) {
              this.sesiLogout(roles)
            }
          })
          .catch((err) => {
            if (err?.response?.data) {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Error User Not Login!",
              });
              setTimeout(() => {
                this.$router.replace("/");
              }, 1500);
            }
          });
        } else {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Error Access!",
          });
          this.$router.replace("/");
        }
      },

      checkIsLogin() {
        if (this.token !== null) {
          const endPoint = `${this.api_url}/fitur/user-login`;
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
          };
          this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            if (data.data.logins[0].user_token_login !== this.token.token) {
              this.$router.replace("/");
            }
          })
          .catch((err) => {
            if (err?.response?.data) {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Forbidden Access!",
              });
              setTimeout(() => {
                this.$router.replace("/");
              }, 1500);
            }
          });
        } else {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Forbidden Access!",
          });
          this.$router.replace("/");
        }
      },
    },

    computed: {
      token() {
        return this.$store.getters["auth/getAuthToken"];
      },
    },
  };
</script>
