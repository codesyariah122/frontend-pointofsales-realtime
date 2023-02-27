<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <div
        v-if="loadingData"
        class="flex items-center justify-center space-x-2"
      >
        <div
          class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <a
        v-else
        :href="`/dashboard/${roles}`"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        {{ name }}
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Another action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Something else here
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a
        @click="this.logout"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Keluar
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/team-1-800x800.jpg";

export default {
  data() {
    return {
      loadingData: null,
      api_url: process.env.NUXT_ENV_API_URL,
      dropdownPopoverShow: false,
      image: image,
      userToken: "",
      roles: "",
      name: "",
      notifs: [],
      path: this.$route.path
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  created() {
    this.checkNewData();
  },

  mounted() {
    this.checkIsLogin();
  },

  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },

    checkNewData() {
      window.Echo.channel("codot-admin").listen("EventNotification", (e) => {
        this.notifs.push(e[0]);
      });
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
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
            } else {
              this.$router.replace("/")
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

  notifs() {
    if (this.notifs.length > 0) {
      this.checkIsLogin()
    }
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
