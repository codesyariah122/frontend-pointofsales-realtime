<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Tempat Sampah
          </h3>
        </div>
      </div>
      <div class="flex justify-start items-start mt-6 mb-6">
        <div class="shrink-0 w-24">
          <button @click="$router.go(-1)"
            class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            v-on:click="toggleModal()"
          >
            <i class="fas fa-fw fa-md fa-arrow-left"></i> Back
          </button>
        </div>
      </div>
      <div
        v-if="showModal"
        class="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Nama
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              email
            </th>
            

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Role
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Delete At
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th>
          </tr>
        </thead>

        <tbody class="py-12 px-12 mb-16 mt-16 w-full">
          <tr v-if="loading">
            <th colspan="12" class="max-w-screen-lg">
              <div
                class="flex place-content-center items-center justify-center"
              >
                <div
                  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </th>
          </tr>
          <tr v-else v-for="(user, index) in users" :key="index">
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ user.name }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ user.email }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <span v-for="role in user.roles" :key="role.id">
                {{ $role(role.roles) }}
              </span>
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ $moment(user.delete_at).fromNow() }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <dashboard-molecules-globals-table-dropdown-trash
                @deleteData="
                  deleteUser(
                    user.id,
                    user.name,
                    $role(user.roles[0].roles),
                    user.is_login
                  )
                " @restoreData="restoreData(user.id)"
              />
            </td>
          </tr>
          <tr v-if="loadingDelete">
            <th colspan="12" class="max-w-screen-lg">
              <div
                class="flex place-content-center items-center justify-center"
              >
                <div
                  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingDelete: null,
      loading: null,
      users: [],
      api_url: process.env.NUXT_ENV_API_URL,
      showModal: false,
    };
  },

  props: {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.fetchAllUserTrash(true);
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },


    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    fetchAllUserTrash(loading, loadingDelete) {
      try {
        this.loading = loading;
        this.loadingDelete = loadingDelete;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/trashed?type=USER_DATA`;
        this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            if(data?.data?.data.length === 0) {
              this.$router.go(-1)
            }
            if (data?.data?.data?.length > 0) {
              this.users = data?.data?.data;
            } else {
              this.users = []
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false;
              this.loadingDelete = false;
            }, 500);
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.data) {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Role ini tidak diizinkan!",
              });
              this.$router.go(-1);
            }
          });
      } catch (err) {
        console.log(err.message);
      }
    },

    restoreData(id) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: "Pulihkan data user ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, restore it!",
        }).then((result) => {
          if (result.isConfirmed) {
            this.loadingDelete = true;
            const product_id = id;
            this.$axios.defaults.headers.common['Accept'] = 'application/json'
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.token.token}`
            const endPoint = `${this.api_url}/fitur/trashed/${product_id}/?type=USER_DATA`;
            this.$axios
              .put(endPoint)
              .then(({ data }) => {
                if (data?.success) {
                  this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: `Product ${data.data.name}, has been restored!`,
                    showConfirmButton: false,
                    timer: 1000,
                  });
                }
              })
              .finally(() => {
                setTimeout(() => {
                  this.loadingDelete = false;
                }, 500);
              })
              .catch((err) => console.log(err?.response?.data));
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    },

    deleteUser(id) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: "Yakin ingin menghapus user !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            this.loadingDelete = true;
            const product_id = id;
            const config = {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${this.token.token}`,
              },
            };
            const endPoint = `${this.api_url}/fitur/trashed/${product_id}/?type=USER_DATA`;
            this.$axios
              .delete(endPoint, config)
              .then(({ data }) => {
                if (data?.success) {
                  this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: `Product ${data.data.name}, has been permanently deleted!`,
                    showConfirmButton: false,
                    timer: 1000,
                  });
                }
              })
              .finally(() => {
                setTimeout(() => {
                  this.loadingDelete = false;
                }, 500);
              })
              .catch((err) => console.log(err?.response?.data));
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    },

    
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
  watch: {
    notifs() {
      if (this.notifs.length > 0) {
        this.fetchAllUserTrash(false, true);
      }
    },
  },
};
</script>
