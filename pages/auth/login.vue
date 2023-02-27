<style lang="css" scoped>
  .rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>

<template>
  <div
  class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
  >
  <div v-if="loadingCheck" class="xl:w-12/12">
    <img src="/icon.png" class="rotate w-48" alt="" />
  </div>
  <div v-else class="xl:w-8/12">
    <div class="block bg-white shadow-lg rounded-lg">
      <div class="lg:flex lg:flex-wrap g-0">
        <div class="lg:w-6/12 px-4 md:px-0">
          <div class="md:mx-6">
            <div class="text-center">
              <img class="mx-auto w-36 py-2" src="/icon.png" alt="logo" />
              <h4 class="text-xl font-semibold mb-12 pb-1">COD(O.T) Admin</h4>
            </div>
            <form @submit.prevent="login">
              <p class="mb-4">
                Silahkan login untuk mengakses halaman dashboard
              </p>
              <div class="mb-4">

              </div>
              <div class="mb-4">
                <input
                v-model="form.email"
                type="text"
                :class="`${error ? 'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-red-600' : 'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'}`"
                id="exampleFormControlInput1"
                placeholder="Email Address"
                />
                <div v-if="validation.email" class="flex py-6">
                  <div
                  class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                  role="alert"
                  >
                  {{ validation.email[0] }}
                </div>
              </div>
            </div>
            <div class="mb-4">
              <div class="relative">
                <input
                v-model="form.password"
                id="password"
                :class="`${error ? 'pass1 h-12 w-full border mt-6 rounded-lg outline-none p-2 border border-solid border-red-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-red-600' : 'pass1 h-12 w-full border mt-6 rounded-lg outline-none p-2'}`"
                type="password"
                placeholder="Password"
                />
                <i
                @click="showingPassword"
                :class="`fa ${
                  hidePassword ? 'fa-eye-slash' : 'fa-eye'
                } eye_1 absolute top-10 right-3 cursor-pointer`"
                ></i>
                <div v-if="validation.password" class="flex py-6">
                  <div
                  class="bg-yellow-100 rounded-lg mb-4 text-base text-yellow-700 w-full"
                  role="alert"
                  >
                  {{ validation.password[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-center pt-1 mb-12 pb-1">
            <div class="mb-6 flex items-center justify-between">
              <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                type="checkbox"
                id="exampleCheck3" @change="remember_me"/>
                <label
                class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for="exampleCheck3">
                Remember me
              </label>
            </div>
          </div>
          <button  
          type="submit"
          class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          >
          <span
          v-if="loadingLogin"
          class="flex items-center justify-center"
          >
          <div
          class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
          >
          <span class="visually-hidden">Loading...</span>
        </div>
      </span>
      <span v-else> Log in </span>
    </button>
  </div>
</form>
</div>
</div>

<div
class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-r from-orange-500 via-amber-400 to-lime-300"
>
<div class="text-white px-4 py-6 md:p-12 md:mx-6">
  <div v-if="loadingData">
    <div
    class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
    role="status"
    >
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<div v-else>
  <h4 class="text-xl font-semibold mb-6">
    {{ owners.about }}
  </h4>

  <p class="text-sm">
    {{ owners.address }} ({{ owners.post_code }}) -
    {{ owners.city }} / {{ owners.province }}
  </p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
  export default {
    name: "auth.login",
    layout: "auth",

    data() {
      return {
        loadingData: null,
        loadingLogin: null,
        loadingCheck: null,
        api_url: process.env.NUXT_ENV_API_URL,
        owners: [],
        form: {},
        validation: [],
        hidePassword: true,
        error: false,
        showLogin: false
      };
    },

    beforeMount() {
      this.authTokenStorage();
    },

    mounted() {
      this.getOwnerInfo();
      this.checkIsLogin();
    },

    methods: {
      remember_me() {
        this.form.checked = true
      },
      showingPassword() {
        const password = document.querySelector("#password");
        if (password.type === "password") {
          password.type = "text";
          this.hidePassword = false;
        } else {
          password.type = "password";
          this.hidePassword = true;
        }
      },
      handleKeyup() {
        this.showLogin = true
      },
      getOwnerInfo() {
        this.loadingData = true;
        const endPoint = `${this.api_url}/web/context`;
        this.$axios
        .get(endPoint)
        .then(({ data }) => {
          if (data.data !== null) {
            this.owners = data.data[0];
          }
        })
        .catch((err) => err)
        .finally(() => {
          setTimeout(() => {
            this.loadingData = false;
          }, 1500);
        });
      },
      checkIsLogin() {
        if (this.token !== null) {
          this.loadingCheck = true;
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
            console.log(data.data[0].roles[0]);
            if (data.data[0].logins[0].user_token_login === this.token.token) {
              this.$swal(
                "You are login",
                `You are login as a ${this.getRoles(
                  data.data[0].roles[0].roles
                  )}`,
                "warning"
                );
              setTimeout(() => {
                this.$router.replace({
                  path: `/dashboard/${this.getRoles(
                    data.data[0].roles[0].roles
                    )}`,
                });
              }, 1500);
            }
          })
          .finally(() => (this.loadingCheck = false))
          .catch((err) => console.log(err));
        }
      },
      login() {
        this.loadingLogin = true;
        this.validation = [];
        const endPoint = `${this.api_url}/auth/login`;
        this.$axios
        .post(endPoint, {
          email: this.form.email,
          password: this.form.password,
          remember_me: this.form.checked ? this.form.checked : false
        })
        .then(({ data }) => {
          if (data.not_found) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: data.message,
            });
            this.error = true
            this.form = {}
          } else {
            if (!data.success) {
              this.$swal({
                icon: "warning",
                title: "Oops...",
                text: data.message,
              });
              this.error = true
              this.form = {}

            } else {
              let expires = []
              const roles = this.getRoles(data.data[0].roles[0].roles);
              const token = data.data.map((d) =>
                d.logins.map((login) => login.user_token_login)
                )[0];

              if(data.remember_token) {
                data.data.map((d) => {
                  const prepare = {
                    expires_at: d.expires_at,
                    remember_token: data.remember_token
                  }
                  expires.push(prepare)
                });

                this.saveExpires(expires[0])
              }

              this.saveLogin(token[0]);

              setTimeout(() => {
                this.$swal({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.$router.replace({
                  path: `/dashboard/${roles}`,
                });
              }, 500)

              }
            }
          })
        .catch((err) => {
          if (err?.response) {
            this.$swal({
              icon: "warning",
              title: "Oops...",
              text: err.message,
            });
            console.log(err)
            this.error = true
            this.validation = err?.response?.data;
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingLogin = false;
          }, 1500);
        });
      },

      saveLogin(data) {
        this.$store.dispatch("auth/storeAuthLogin", data);
      },

      saveExpires(data) {
        this.$store.dispatch("auth/storeExpiredLogin", data);
      },

      getRoles(data) {
        const checkRole = JSON.parse(data);
        const roles = checkRole[0].toString().toLowerCase();
        return roles;
      },

      authTokenStorage() {
        this.$store.dispatch("auth/storeAuthToken", "auth");
      },
    },
    watch: {
      owners() {
        return this.owners?.length > 0 ? this.owners : null;
      },
    },

    computed: {
      token() {
        return this.$store.getters["auth/getAuthToken"];
      },
    },
  };
</script>
