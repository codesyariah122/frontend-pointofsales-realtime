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
            Daftar Product
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
          <button @click="totalTrash > 0 ? $router.push({path: `/dashboard/inventory/trash?type=${context.trash_type}`}) : ''" type="button" class="inline-block px-4 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            <i class="fas fa-fw fa-lg fa-trash"/>TRASH ({{totalTrash}})
          </button>
        </div>
        <div>
          <dashboard-modal-add-product-modal
            :showModal="showModal"
            @toggle-modal="toggleModal"
            @show-toast-message="showToastMessage"
          />
        </div>
      </div>
      <div
        v-if="showModal"
        class="opacity-25 fixed inset-0 z-40 bg-black"
      ></div>

      <!-- filtering -->
      <div class="flex justify-start max-w-screen-lg items-start mt-12">
        <h5 class="mr-12">Filter By :</h5>
        <div class="shrink-0 w-36">
          <div class="form-check">
            <input @change="searchByName($event)" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Name" id="flexCheckDefault" v-model="checkName">
            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
              Name
            </label>
          </div>
        </div>
        <div class="shrink-0 w-36">
          <div class="form-check">
            <input @change="searchByBarcode($event)" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Barcode" id="barcode" v-model="checkBarcode">
            <label class="form-check-label inline-block text-gray-800" for="barcode">
              Barcode
            </label>
          </div>
        </div>
        <div class="shrink-0 w-36">
          <div class="form-check">
            <input @change="searchByCategory($event)" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="Category" id="category" v-model="checkCategory">
            <label class="form-check-label inline-block text-gray-800" for="category">
              Category
            </label>
          </div>
        </div>
      </div>

      <div v-if="loadingShow" class="flex justify-center place-content-center items-center mt-6 mb-6">
        <div class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
        text-purple-500" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else class="flex justify-center place-content-center items-center mt-6 mb-6">
        <div v-if="showSearch && checkName || checkBarcode" class="shrink-0 w-full">
          <div class="form-check">
            <label
              for="exampleFormControlInput4"
              class="form-label inline-block mb-2 text-gray-700 text-sm"
              >Search by : {{searchType}}</label>
            <input v-if="searchType === 'Name'"
              type="text"
              @keyup="filterData"
              class="
                form-control
                block
                w-full
                px-2
                py-1
                text-sm
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              v-model="queryName"
              id="exampleFormControlInput4"
              placeholder="Form control sm"
            />
            <input v-else
              type="text"
              @keyup="filterData"
              class="
                form-control
                block
                w-full
                px-2
                py-1
                text-sm
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              v-model="queryBarcode"
              id="exampleFormControlInput4"
              placeholder="Form control sm"
            />
          </div>
        </div>
        <div v-else class="shrink-0 w-full">
          <div v-if="showSearch && checkCategory">
            <select v-if="loadingProductCategories" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example" >
                <option selected disabled>
                  <div class="flex items-center justify-center space-x-2">
                    <div class="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </option>
              </select>
              <select v-else
              class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              @change="changeCategories($event)"
              >
              <option selected disabled>
                Pilih Category
              </option>
              <!-- loop item -->
              <option v-for="(category, idx) in categories" :key="idx"
                :value="category.id"
                >
                {{category.name}} <span v-html="category.icon"></span>
              </option>
            </select>
          </div>
        </div>
      </div>
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
              Barcode
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Product
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Category
            </th>

            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Stock
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
                Ooops!! Product <a type="button"
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
            
            <div v-if="loadingBarcode" class="flex animate-pulse flex-row items-center w-36 h-16  justify-center space-x-5">
              <div class="flex flex-col space-y-3">
                <div class="w-36 h-16 bg-gray-300 h-6 rounded-md ">
                </div>
              </div>
            </div>

            <div v-else>
              <img :src="barcode" class="w-32 h-16 mb-4"/>

              <!-- <div v-html="qrcode"></div> -->

              <h5>
                {{product.barcode}}
              </h5>
            </div>
            
            </td> 
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ product.name }}
            </td>

            <td v-for="category in product.categories" :key="category.id"
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4"
            ><span v-html="category.icon"></span>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4"
            >
              {{product.stock}} Kg
            </td>
            
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
              <dashboard-molecules-globals-table-dropdown
                @deleteData="
                  deleteData(
                    product.id
                  )
                " :data="product.barcode" :context="context" @show-toast-message="showToastMessage"
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
        <dashboard-molecules-globals-pagination :links="links" :paging="paging" @fetch-data="fetchAllProductData" :category="queryCategory"/>
      </div>
    </div>
  </div>
</template>


<script>
import globals from '@/mixins/globals'

export default {
  mixins: [globals],
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
      barcode: [],
      qrcode: [],
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
      showSearch: false,
      checkName: null,
      checkBarcode: null,
      checkCategory: null,
      searchType: '',
      queryName: '',
      queryBarcode: '',
      queryQrcode: '',
      queryCategory: '',
      query: {
        name: '',
        barcode: '',
        category: ''
      },
      totalTrash: 0,
      categories: [],
      category: {
        id: null
      },
      category_name: '',
      category_id: null,
      roles: '',
      context: {
        title: 'Product',
        trash_type: 'PRODUCT_DATA'
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
    this.fetchAllProductData(true, false, this.paging.current, '', '');
    this.fetchAllProductTrash(true);
    this.fetchCategories();
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    getBarcode(code, name) {
      try {
        this.loadingBarcode = true
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }
        const endPoint = `${this.api_url}/fitur/barcode`
        const data = {
          barcode: code,
          name: name
        }
        this.$axios.post(endPoint, data, config)
        .then(({data}) => {
          if(data.data) {
            this.barcode = data.data
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingBarcode = false
          }, 500)
        })
        .catch(err => {
          console.log(err?.response?.data)
        })
      } catch (err) {
        console.log(err.message)
      }
    },

    getQrCode(code, name){
      try {
        this.loadingBarcode = true
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }
        const endPoint = `${this.api_url}/fitur/qrcode`
        const data = {
          barcode: code,
          name: name
        }
        this.$axios.post(endPoint, data, config)
        .then(({data}) => {
          if(data.data) {
            this.qrcode = data.data
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingBarcode = false
          }, 500)
        })
        .catch(err => {
          console.log(err?.response?.data)
        })
      } catch (err) {
        console.log(err.message)
      }
    },

    fetchAllProductData(loading, loadingDelete, page=1, name='', barcode='', category_id=this.queryCategory){
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

        const endPoint = `${this.api_url}/fitur/product-management?page=${page}&name=${name}&barcode=${barcode}&category_id=${category_id}`


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
            this.products.map(item => {
              this.getBarcode(item.barcode, item.name)
              this.getQrCode(item.barcode, item.name)
            })
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
          text: "Yakin ingin menghapus product !",
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
            const endPoint = `${this.api_url}/fitur/product-management/${product_id}`;

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

    fetchCategories() {
      try {
        this.loadingProductCategories = true
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }
        const endPoint = `${this.api_url}/fitur/category-management`

        this.$axios.get(endPoint, config)
        .then(({data}) => {
          if(data?.data?.data.length > 0) {
            this.categories = data?.data?.data
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingProductCategories = false
          }, 500)
        })
        .catch(err => console.log(err?.response?.data));

      } catch(err) {
        console.log(err.message)
      }
    },

    changeCategories(e) {
      this.queryCategory = parseInt(e.target.value)
      const categories = this.categories.map(category => category)
      this.category_name = categories.filter(c => c.id === parseInt(e.target.value))[0].name
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
    searchByName(e) {
      this.fetchAllProductData(false, false, 1, '', '', '')
      this.loadingShow = true
      if(this.checkBarcode || this.checkCategory) {
        this.queryBarcode = ''
        this.query.barcode = ''
        this.checkBarcode = false
        this.queryCategory = '',
        this.query.category = ''
        this.checkCategory = false
        this.searchType = e.target.value
      }
      this.searchType = e.target.value
      setTimeout(() => {
        this.loadingShow = false
        this.showSearch = true
      }, 500)
    },

    searchByBarcode(e) {
      this.fetchAllProductData(false, false, 1, '', '', '')
      this.loadingShow = true
      if(this.checkName || this.checkCategory) {
        this.queryName = ''
        this.query.name = ''
        this.checkName = false
        this.queryCategory = '',
        this.query.category = ''
        this.checkCategory = false
        this.searchType = e.target.value
      }
      this.searchType = e.target.value
      setTimeout(() => {
        this.loadingShow = false
        this.showSearch = true
      }, 500)
    },

    searchByCategory(e) {
      this.queryCategory = ''
      this.fetchAllProductData(false, false, 1, '', '', '')
      this.loadingShow = true
      if(this.checkName || this.checkBarcode) {
        this.queryName = ''
        this.query.name = ''
        this.checkName = false
        this.queryBarcode = ''
        this.query.barcode = ''
        this.checkBarcode = false
        this.searchType = e.target.value
      }
      this.searchType = e.target.value

      setTimeout(() => {
        this.loadingShow = false
        this.showSearch = true
      }, 500)
    },

    fetchAllProductTrash(loading) {
      try {
        this.loadingTrash = loading;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        const endPoint = `${this.api_url}/fitur/total-trash?type=PRODUCT_DATA`;
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
        if(this.context.title === 'Product') {
          // console.log(this.notifs);
          this.fetchAllProductData(false, true, this.paging.current, '', '', '');
          this.fetchAllProductTrash(true)
        }
      }
    },
    queryName() {
      if(this.queryName !== '') {
        this.fetchAllProductData(true, false, 0, this.queryName, '')
      }
    },
    queryBarcode() {
      if(this.queryBarcode !== '') {
        this.fetchAllProductData(false, false, 0, '', this.queryBarcode, '')
      }
    },
    queryQrcode() {
      if(this.queryQrcode !== '') {
        this.fetchAllProductData(false, false, 0, '', this.queryQrcode, '')
      }
    },
    queryCategory() {
      if(this.queryCategory !== '') {
        this.fetchAllProductData(true, false, 0, '', '', parseInt(this.queryCategory))
      }
    }
  },
};
</script>
