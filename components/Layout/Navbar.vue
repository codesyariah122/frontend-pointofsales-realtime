<template>
  <nav
    class="drop-shadow-2xl w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light sticky top-0 z-50"
  >
    <div
      class="container-fluid w-full flex flex-wrap items-center justify-between px-6"
    >
      <button
        class="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          class="w-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          ></path>
        </svg>
      </button>
      <div
        class="collapse navbar-collapse flex-grow items-center"
        id="navbarSupportedContent"
      >
        <a
          class="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1"
          href="#"
        >
          <img src="/icon.png" class="w-12 mx-auto" alt="" loading="lazy" />
        </a>
        <!-- Left links -->
        <ul
          class="navbar-nav flex flex-col pl-0 list-style-none mr-auto mx-auto"
        >
          <li class="nav-item p-2">
            <a
              class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
              href="#"
              >Dashboard</a
            >
          </li>
          <li class="nav-item p-2">
            <a
              class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
              href="#"
              >Team</a
            >
          </li>
          <li class="nav-item p-2">
            <a
              class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
              href="#"
              >Projects</a
            >
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <div class="flex items-center relative">
        <button
          @click="toLogin"
          type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Login
        </button>
      </div>
      <!-- Right elements -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      toLogin: () => this.$router.push({ path: "/auth/login" }),
      api_url: process.env.NUXT_ENV_API_URL,
      tokenLogin: ''
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.checkIsLogin();
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },
    checkIsLogin() {
      if (this.token !== null) {
        console.log(this.token.token);
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
            console.log(data);
            if (data.data[0].logins[0].user_token_login === this.token.token) {
              // this.$swal(
              //   "You are login",
              //   `You are login as a ${this.getRoles(
              //     data.data[0].roles[0].roles
              //   )}`,
              //   "warning"
              // );
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
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
