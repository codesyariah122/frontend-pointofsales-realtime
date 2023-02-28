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
            Daftar Supplier
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
          <button @click="totalTrash > 0 ? $router.push({path: `/dashboard/suppliers/trash?type=${context.trash_type}`}) : ''" type="button" class="inline-block px-4 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            <i class="fas fa-fw fa-lg fa-trash"/>TRASH ({{totalTrash}})
          </button>
        </div>
        <div>
          <dashboard-molecules-globals-modal
            :showModal="showModal"
            :context="context"
            endPoint="/fitur/supplier-management"
            :paging="paging"
            @toggle-modal="toggleModal"
            @show-toast-message="showToastMessage"
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
              Name
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Company
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Phone
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
          <tr v-if="empty">
            <th colspan="12" class="max-w-screen-lg border-1">
              <div
                class="flex place-content-center items-center justify-center mt-6"
              >
              <div class="bg-yellow-100 rounded-lg py-5 px-6 mb-4 text-base text-yellow-700 mb-3 cursor-pointer" role="alert">
                Ooops!! Data <a type="button"
                v-on:click="toggleModal()" class="font-bold text-red-800">Tidak ditemukan.</a>.
              </div>
              </div>
            </th>
          </tr>
          
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
          
          <tr v-else v-for="(product, index) in products">
           <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{product.name}}
            </td> 
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ product.company_name }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ product.phone ? product.phone : '-' }}
            </td>

            
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <dashboard-molecules-globals-table-dropdown
                @deleteData="
                  deleteData(
                    product.id
                  )
                " :data="product.id" :context="context" @show-toast-message="showToastMessage" endPoint="/fitur/supplier-management" :token="token"
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
    <div class="mt-12 mb-12">
      <div class="flex justify-end items-end">
        <dashboard-molecules-globals-pagination :links="links" :paging="paging" @fetch-product="fetchAllSupplierData" />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  
  data() {
    return {
      alertToast: '',
      showToast: null,
      messageToast: '',
      loadingBarcode: null,
      loadingDelete: null,
      loadingTrash: null,
      loading: null,
      api_url: process.env.NUXT_ENV_API_URL,
      showModal: false,
      products: [],
      links: [],
      empty: null,
      paging: {
        current: null,
        from: null,
        last: null,
        per_page: null,
        total: null
      },
      loadingProductCategories: null,
      loadingShow: null,
      totalTrash: 0,
      roles: '',
      context: {
        title: 'Supplier',
        trash_type: 'SUPPLIER_DATA'
      }
    };
  },

  props: {
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.checkIsLogin();
    this.fetchAllSupplierData(true, false, this.paging.current, '', '');
    this.fetchAllSupplierTrash(true);
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    

    fetchAllSupplierData(loading, loadingDelete, page=1, name='', phone='', email=''){
      try {
        this.empty = false
        this.dropdownPopoverShow = false;
        this.loading = loading
        this.loadingDelete = loadingDelete
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }

        const endPoint = `${this.api_url}/fitur/supplier-management?page=${page}&name=${name}&phone=${phone}&email=${email}`

        this.$axios
        .get(endPoint, config)
        .then(({data}) => {
          if(data.data.data.length > 0) {
            this.products = data.data.data
            this.links = data.data.links
            this.paging.current = data.data.current_page
            this.paging.from = data.data.from
            this.paging.last = data.data.last_page
            this.paging.per_page = data.data.per_page
            this.paging.total = data.data.total
          } else {
            this.products = []
            this.links = []
            this.paging.current = null
            this.paging.from = null
            this.paging.last = null
            this.paging.per_page = null
            this.paging.total = null
            setTimeout(() => {
              this.empty = true
            }, 500)
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
            this.loadingDelete = false
          }, 500)
        })
        .catch(err => {
          console.log(err?.response?.data)
        })
      } catch (err) {
        console.log(err.message)
      }
    },

    deleteData(id) {
      try {
        this.$swal({
          title: "Are you sure?",
          text: "Yakin ingin menghapus data customer!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, move trashed!",
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
            const endPoint = `${this.api_url}/fitur/supplier-management/${product_id}`;

            this.$axios
              .delete(endPoint, config)
              .then(({ data }) => {
                if (data?.success) {
                  this.showToastMessage(data.message, 'Move Product To Trash')
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
                }, 500);
              })
              .catch((err) => console.log(err?.response?.data));
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    },

    showToastMessage(msg, alert) {
      this.showToast = true
      this.messageToast = msg
      this.alertToast = alert
    },


    filterData(e) {
      if(this.searchType === 'Name') {
        this.queryName = e.target.value
        this.query.name = e.target.value
      } else {
        this.queryBarcode = e.target.value
        this.query.barcode = e.target.value
      }
    },

    fetchAllSupplierTrash(loading) {
      try {
        this.loadingTrash = loading;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/total-trash?type=SUPPLIER_DATA`;
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
              setTimeout(() => {
                this.loadingTrash = false;
              }, 500);
            });
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
    }
  },
  watch: {
    notifs() {
      if (this.notifs.length > 0) {
        if(this.context.title === 'Supplier') {
          this.fetchAllSupplierData(false, true, this.paging.current, '', '', '');
          this.fetchAllSupplierTrash(true);
        }
      }
    }
  },
};
</script>
