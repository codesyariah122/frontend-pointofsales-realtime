<style lang="css" scoped></style>
<template>
  <div
    v-if="showModal"
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative w-auto my-6 mx-auto max-w-3xl">
      <!--content-->
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
      >
        <form @submit.prevent="addUser">
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-1xl font-semibold">Tambah Pengguna Baru</h3>
            <button
              class="p-1 ml-auto border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              <i class="fas fa-fw fa-lg fa-times"></i>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6">
            <div class="p-6 rounded-lg max-w-screen">
              <div class="form-group mb-6">
                <input
                  @keyup="resetValidation"
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Nama Lengkap"
                  v-model="form.name"
                />
                <div v-if="validation.name" class="flex py-6">
                  <div
                    class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                    role="alert"
                  >
                    {{ validation.name[0] }}
                  </div>
                </div>
              </div>
              <div class="form-group mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  v-model="form.email"
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
              <div class="form-group mb-6">
                <!-- <input
                  type="password"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput126"
                  placeholder="Password"
                  v-model="form.password"
                /> -->
                <input
                  v-model="form.password"
                  id="password"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="password"
                  placeholder="Password"
                />
                <div v-if="validation.password" class="flex py-6">
                  <div
                    class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                    role="alert"
                  >
                    {{ validation.password[0] }}
                  </div>
                </div>
              </div>

              <div class="flex justify-start items-start">
                <div class="mb-6 w-full">
                  <select
                    class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    @change="changeRoles($event)"
                  >
                    <option v-if="loading" value="">
                      <div
                        class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </option>
                    <option v-else selected disabled>Pilih User Role</option>
                    <option
                      v-for="role in roles"
                      :key="role.id"
                      :value="role.id"
                    >
                      {{ role.text }}
                    </option>
                  </select>
                  <!-- <Select2
                    class="form-group max-w-screen-lg"
                    :options="roles"
                    :settings="settings"
                    @change="changeRoles($event)"
                    @select="selectedRoles($event)"
                  /> -->
                </div>
              </div>
              <div v-if="validation.roles" class="flex py-6">
                <div
                  class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                  role="alert"
                >
                  {{ validation.roles[0] }}
                </div>
              </div>

              <div class="flex justify-start items-start space-x-6">
                <div>
                  <div class="form-group form-check mb-6">
                    <input
                      @click="changeStatus(['ACTIVE'])"
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      id="ACTIVE"
                      v-model="form.status"
                      value="ACTIVE"
                      :disabled="selected.length > 0"
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="ACTIVE"
                      >ACTIVE</label
                    >
                  </div>
                  <div v-if="validation.status" class="flex py-6">
                    <div
                      class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                      role="alert"
                    >
                      {{ validation.status[0] }}
                    </div>
                  </div>
                </div>

                <div>
                  <div class="form-group form-check mb-6">
                    <input
                      @click="changeStatus(['INACTIVE'])"
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      id="INACTIVE"
                      v-model="form.status"
                      value="INACTIVE"
                      :disabled="selected.length > 0"
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="INACTIVE"
                      >INACTIVE</label
                    >
                  </div>
                </div>
                <div v-if="showChange">
                  <button
                    @click="cancelChange"
                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
          >
            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleModal()"
            >
              Close
            </button>
            <button
              type="submit"
              class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              <div
                v-if="loadingAdd"
                class="flex items-center justify-center space-x-2"
              >
                <div
                  class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <span v-else> Save Changes </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal"],
  data() {
    return {
      loading: null,
      loadingAdd: null,
      showChange: false,
      selected: [],
      disabled: null,
      hidePassword: true,
      form: {
        name: null,
        email: null,
        password: null,
        roles: null,
        status: [],
      },
      api_url: process.env.NUXT_ENV_API_URL,
      settings: {
        placeholder: "Pilih Roles",
      },
      roles: null,
      validation: [],
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.roleUserList();
  },

  methods: {
    showingPassword() {
      // this.hidePassword = !this.hidePassword;
      const password = document.querySelector("#password");
      if (password.type === "password") {
        password.type = "text";
        this.hidePassword = false;
      } else {
        password.type = "password";
        this.hidePassword = true;
      }
    },

    resetValidation() {
      this.validation = [];
    },

    addUser() {
      try {
        this.loadingAdd = true;
        const data = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          roles: this.form.roles,
          status: this.form.status[0],
        };

        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };

        const endPoint = `${this.api_url}/fitur/user-management`;

        this.$axios
          .post(endPoint, data, config)
          .then(({ data }) => {
            console.log(data);
            if (data.success) {
              this.$swal({
                position: "top-end",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1000,
              });
              this.form = {};
              this.showChange = false;
              this.selected = [];
              setTimeout(() => {
                this.$emit("toggle-modal");
              }, 1500);
            } else {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          })

          .finally(() => {
            setTimeout(() => {
              this.loadingAdd = false;
            }, 500);
          })

          .catch((err) => {
            if (err.response.data) {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
              this.validation = err.response.data;
            }
          });
      } catch (err) {
        console.log(err.message);
      }
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    toggleModal() {
      this.validation = [];
      this.form = {};
      this.selected = [];
      this.showChange = false;
      this.$emit("toggle-modal");
    },

    changeStatus(data) {
      this.showChange = true;
      if (this.selected.length === 0) {
        this.selected.push(data[0]);
      }
    },

    cancelChange() {
      const checked = document.querySelector(`#${this.selected[0]}`);
      console.log(checked.checked)

      if (checked.checked) {
        this.showChange = false;
        this.selected = [];
        checked.checked = false;
      }
    },

    roleUserList() {
      try {
        this.loading = true;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/role-management`;
        this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            const lists = data.data;
            const childrens = [];
            for (const key in lists) {
              childrens.push({
                id: lists[key].id,
                text: this.$role(lists[key].roles),
              });
            }
            this.roles = childrens;
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false;
            }, 500);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err.message);
      }
    },

    changeRoles(e) {
      const roles = e.target.value;
      this.form.roles = roles;
    },

    selectedRoles(e) {
      console.log(e);
    },
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
