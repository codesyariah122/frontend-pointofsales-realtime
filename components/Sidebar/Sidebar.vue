<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <nuxt-link
        class="md:block hidden text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        <img src="/icon.png" class="w-36 mb-2" alt="" />
        C.O.D(o.t) Distributor
      </nuxt-link>
      <nuxt-link
        class="sm:block md:hidden text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/"
      >
        <div class="flex justify-center place-content-center items-center">
          <div>
            <img src="/icon.png" class="w-12 mb-2" alt="" />
          </div>
          <div>C.O.D(o.t)</div>
        </div>
      </nuxt-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <dropdowns-notification-dropdown />
        </li>
        <li class="inline-block relative">
          <dropdowns-user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <nuxt-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                <img src="/icon.png" class="w-6 mb-2" alt="" />
                C.O.D(o.t) Distributor
              </nuxt-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-if="loading || this.globalLoading" class="flex justify-center items-center mt-12">
          <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else v-for="menu in menus" :key="menu.id">
          <hr class="my-4 md:min-w-full" />
            <!-- Heading -->
          <h6 v-if="menu.roles.map((role) => role).find((role) => role === user_roles)"
            class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
            >
            {{menu.menu}}
          </h6>
          <ul class="md:flex-col md:min-w-full flex flex-col list-none">
            <li v-for="sub in menu.sub_menus" :key="sub.id" class="items-center">
              
              <nuxt-link v-if="sub?.roles?.map((role) => role).find((role) => role === user_roles) | undefined"
                :to="`/dashboard${sub.link !== '/' ? sub.link : `/${roles}`}`"
                v-slot="{ href, navigate, isActive }"
                >
                <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 hover:text-blueGray-500',
                  ]"
                  >
                  <i
                  :class="[isActive ? `${sub.icon} text-sm mr-2 opacity-75` : `${sub.icon} text-sm mr-2 text-blueGray-300`]"
                ></i>
                  {{sub.menu}}
                </a>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
); }

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      loading: null,
      collapseShow: "hidden",
      api_url: process.env.NUXT_ENV_API_URL,
      menus: [],
      user_roles: null,
      roles: "",
      name: ""
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.fetchMenus();
    this.checkIsLogin();
  },

  methods: {
    toggleCollapseShow(classes) {
      this.collapseShow = classes;
    },
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },
    fetchMenus() {
      try {
        this.loading = true

        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/access-menu`;
        this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            this.menus = data.menus
            this.user_roles = data.users[0].roles[0].id
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 1500)
          })
          .catch((err) => console.log(err?.response?.data));
      } catch (err) {
        console.log(err.message);
      }
    },

    checkIsLogin() {
      if (this.token !== null) {
        this.loadingData = true;
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
            if (data.data[0].logins[0].user_token_login === this.token.token) {
              setTimeout(() => {
                this.loadingData = false;
                this.userDataCheck(data.data[0]);
              }, 500);
              this.userToken = data.data[0].logins.map((d) => d.user_token_login);
            }
          })
          .catch((err) => console.log(err));
      }
    },

    userDataCheck(userData) {
      this.roles = this.getRoles(userData.roles[0].roles);
      this.name = userData.name;
    },

    getRoles(data) {
      const checkRole = JSON.parse(data);
      const roles = checkRole[0].toString().toLowerCase();
      return roles;
    },

  },
  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
  components: {
    NotificationDropdown,
    UserDropdown,
  },
};
</script>
