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
            Daftar Pengguna
          </h3>
        </div>
      </div>
      <div class="flex justify-start items-start mt-6 mb-6">
        <div v-if="roles !== 'CASHIER'" class="shrink-0 w-24">
          <button
            class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            v-on:click="toggleModal()"
          >
            <i class="fas fa-fw fa-md fa-plus"></i> add
          </button>
        </div>
        <div class="shrink-0 w-40 px-5">
              <button @click="totalTrash > 0 ? $router.push({path: '/dashboard/users/trash'}) : ''" type="button" class="inline-block px-4 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                <i class="fas fa-fw fa-lg fa-trash"/>TRASH ({{totalTrash}})
              </button>
        </div>
        <div>
          <dashboard-modal-add-user-modal
            :showModal="showModal"
            @toggle-modal="toggleModal"
          />
        </div>
      </div>
      <div
        v-if="showModal"
        class="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>
    </div>
    <div v-if="showToast" class="flex flex-col justify-center">
      <div class="bg-blue-600 shadow-lg top-0 mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
        <div class="bg-blue-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-blue-500 rounded-t-lg">
          <p class="font-bold text-white flex items-center">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
            </svg>
            {{alertToast}}</p>
          <div class="flex items-center">
            <button @click="showToast = !showToast" type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
        <div class="p-3 bg-blue-600 rounded-b-lg break-words text-white">
          {{messageToast}}
        </div>
      </div>
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
              Status
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Is Login
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Last Login
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
              <i
                :class="
                  user.status === 'ACTIVE'
                    ? 'text-emerald-500'
                    : 'text-orange-400'
                "
                class="fas fa-circle mr-2"
              ></i>
              {{ user.status }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <i
                :class="
                  user.is_login % 2 === 1 ? 'text-emerald-500' : 'text-gray-500'
                "
                class="fas fa-circle mr-2"
              ></i>
              {{ user.is_login % 2 === 1 ? "Online" : "Offline" }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{
                $moment(user.last_login).isValid()
                  ? $moment(user.last_login).fromNow()
                  : "-"
              }}
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <span v-for="role in user.roles" :key="role.id">
                {{ $role(role.roles) }}
              </span>
            </td>

            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <dashboard-molecules-globals-table-dropdown
                @deleteData="
                  deleteUser(user.id)" :data="user.id" show-toast-message="showToastMessage" :context="context" endPoint="/fitur/user-management" :roles="listRoles" :status="statusUser" :edit="context.edit.status"
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
      showToast: null,
      loadingDelete: null,
      loadingRole: null,
      loading: null,
      users: [],
      api_url: process.env.NUXT_ENV_API_URL,
      showModal: false,
      totalTrash: 0,
      roles: '',
      listRoles: [],
      statusUser: ["INACTIVE", "ACTIVE"],
      context: {
        edit: {
          status: true,
          key: 'edit-user'
        },
        title: "User",
        trash_type: 'USER_DATA'
      }
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
    this.checkIsLogin();
    this.fetchAllUserData(true);
    this.fetchAllUserTrash(true);
    this.fetchRoleUser()
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    fetchAllUserData(loading) {
      try {
        this.loading = loading;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/user-management`;
        this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            if (data?.data?.length > 0) {
              this.users = data?.data;
            }
          })
          .finally(() => {
            setTimeout(() => {
              setTimeout(() => {
                this.loading = false;
              }, 1500);
            });
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
    
    deleteUser(id, name, role, isLogin) {
      try {
        if (isLogin === 1) {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "It's possibble to action!",
          });
        } else {
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
              if (role === "OWNER") {
                this.$swal({
                  icon: "error",
                  title: "Oops...",
                  text: "It's possibble to action!",
                });
                this.loadingDelete = false;
              } else {
                this.loadingDelete = true;
                const user_id = id;
                const config = {
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${this.token.token}`,
                  },
                };
                const endPoint = `${this.api_url}/fitur/user-management/${user_id}`;
                this.$axios
                  .delete(endPoint, config)
                  .then(({ data }) => {
                    if (data?.success) {
                      this.showToastMessage(data.message, 'Move User To Trash')
                    } else {
                      this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                      })
                    }
                  })
                  .finally(() => {
                    setTimeout(() => {
                      this.loadingDelete = false;
                    }, 1500);
                  })
                  .catch((err) => {
                    console.log(err?.response?.data)
                  });
              }
            }
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    showToastMessage(msg, alert) {
      this.showToast = true
      this.messageToast = msg
      this.alertToast = alert
    },

    fetchAllUserTrash(loading) {
      try {
        this.loadingTrash = loading;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/total-trash?type=USER_DATA`;
        this.$axios
          .get(endPoint, config)
          .then(({ data }) => {
            if (data?.data > 0) {
              this.totalTrash = data?.data
            } else {
              this.totalTrash = 0
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loadingTrash = false;
            }, 1000);
          })
          .catch((err) => {
            console.log(err.response);
          });
      } catch (err) {
        console.log(err.message);
      }
    },

    fetchRoleUser() {
      try {
        this.loadingRole = true;
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
            this.listRoles = data.data
          })
          .finally(() => {
            setTimeout(() => {
              this.loadingRole = false;
            }, 1000);
          })
          .catch((err) => {
            console.log(err.response);
          });
      } catch (err) {
        console.log(err.message);
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
            this.roles = this.$role(data.data[0].roles[0].roles)
          })
          .catch((err) => {
            console.log(err)
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
  watch: {
    notifs() {
      if (this.notifs.length > 0) {
        this.fetchAllUserData(false);
        this.fetchAllUserTrash(true)
      }
    },
  },
};
</script>
