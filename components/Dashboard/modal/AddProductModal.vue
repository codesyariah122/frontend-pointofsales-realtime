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
        <form @submit.prevent="addProduct">
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-1xl font-semibold">Tambah Product Baru</h3>
            <button
              class="p-1 ml-auto border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              <i class="fas fa-fw fa-md fa-times"></i>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6">
            <div class="p-6 rounded-lg max-w-screen">
              <div class="form-group mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Nama Product"
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
                  placeholder="contoh: [x, l, z]"
                  v-model="form.size"
                />
                
              </div>

              <div class="form-group mb-6">
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Buy Price"
                  v-model="form.buy_price"
                />
                <div v-if="validation.buy_price" class="flex py-6">
                  <div
                    class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                    role="alert"
                  >
                    {{ validation.buy_price[0] }}
                  </div>
                </div>
              </div>

              <div class="form-group mb-6">
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Sell Price"
                  v-model="form.sell_price"
                />
                <div v-if="validation.sell_price" class="flex py-6">
                  <div
                    class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                    role="alert"
                  >
                    {{ validation.sell_price[0] }}
                  </div>
                </div>
              </div>

              <div class="form-group mb-6">
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Stock"
                  v-model="form.stock"
                />
                <div v-if="validation.stock" class="flex py-6">
                  <div
                    class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                    role="alert"
                  >
                    {{ validation.stock[0] }}
                  </div>
                </div>
              </div>

              <div class="flex justify-start items-start">
                <div class="mb-6 w-full">
                  <select v-if="loadingCategories" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example">
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
                    <option selected disabled>Pilih Category</option>
                    <!-- loop item -->
                    <option v-for="(category, idx) in categories" :key="idx"
                      :value="category.id"
                    >
                      {{category.name}} <span v-html="category.icon"></span>
                    </option>
                  </select>
                </div>
              </div>
              

              <div class="flex justify-start items-start space-x-6">
               
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
      loadingCategories: null,
      categories: [],
      form: {
      },
      api_url: process.env.NUXT_ENV_API_URL,
      
      validation: [],
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.fetchCategories()
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    toggleModal() {
      this.form = {}
      this.validation = []
      this.$emit("toggle-modal");
    },

    fetchCategories() {
      try {
        this.loadingCategories = true
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }
        const endPoint = `${this.api_url}/fitur/category-management`

        this.$axios.get(endPoint, config)
        .then(({data}) => {
          if(data?.data?.data?.length > 0) {
            this.categories = data?.data?.data
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingCategories = false
          }, 1500)
        })
        .catch(err => console.log(err?.response?.data));

      } catch(err) {
        console.log(err.message)
      }
    },

    changeCategories(e) {
      this.form.category_id = e.target.value
    },

    addProduct() {
      try {
        this.loadingAdd = true
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }
        const endPoint = `${this.api_url}/fitur/product-management`
        this.$axios.post(endPoint, this.form, config)
        .then(({data}) => {
          if(data.success) {
            this.toggleModal()
            this.$emit('show-toast-message', `Success added new product ${data.data[0].name}`, data.message)
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingAdd = false
          }, 1500)
        })
        .catch(err => {
          // console.log(err.response.data)
          if(err.response.data) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            this.validation = err.response.data
          }
        })

      } catch (err) {
        console.log(err.message)
      }
    }

  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
