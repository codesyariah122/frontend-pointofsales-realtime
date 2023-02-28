<style lang="css" scoped></style>
<template>
  <div
    v-if="showModal && !edit"
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative w-auto my-6 mx-auto max-w-3xl">
      <!--content-->
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
      >
        <form @submit.prevent="addData">
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-1xl font-semibold">Tambah Data {{context.title}}</h3>
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
              <div v-if="context.title === 'User'">
                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Name`"
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
                    type="number"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Phone`"
                    v-model="form.phone"
                  />
                  <div v-if="validation.phone" class="flex py-6">
                    <div
                      class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                      role="alert"
                    >
                      {{ validation.phone[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Email`"
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
                  <input
                    type="password"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Password`"
                    v-model="form.password"
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
                    <select v-if="loadingRole" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                      @change="changeRoles($event)"
                    >
                      <option selected disabled>Pilih Roles</option>
                      <!-- loop item -->
                      <option v-for="(role, idx) in roles" :key="idx"
                        :value="role.id"
                      >
                        {{$role(role.roles)}}
                      </option>
                    </select>

                      <div v-if="validation.roles" class="flex py-6">
                        <div
                        class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                        role="alert"
                        >
                        {{ validation.roles[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-start items-start">
                  <div class="mb-6 w-full">
                    <select v-if="loadingRole" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                      @change="changeStatus($event)"
                    >
                      <option selected disabled>Pilih Status</option>
                      <!-- loop item -->
                      <option v-for="(item, idx) in status" :key="idx"
                        :value="item"
                      >
                        {{item}}
                      </option>
                    </select>

                    <div v-if="validation.status" class="flex py-6">
                        <div
                        class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                        role="alert"
                        >
                        {{ validation.status[0] }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="context.title === 'Customer' || context.title === 'Supplier'">
                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Name`"
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
                <div v-if="context.title === 'Supplier'" class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Company Name"
                    v-model="form.company_name"
                  />
                  <div v-if="validation.company_name" class="flex py-6">
                    <div
                      class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                      role="alert"
                    >
                      {{ validation.company_name[0] }}
                    </div>
                  </div>
                </div>
                <div class="flex justify-start">
                  <div class="shrink-0 w-full">
                    <small class="text-red-700">
                      * Optional
                    </small>
                  </div>
                </div>

                <div class="form-group mb-6">
                  <input
                    type="number"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Phone`"
                    v-model="form.phone"
                  />
                  <div v-if="validation.phone" class="flex py-6">
                    <div
                      class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                      role="alert"
                    >
                      {{ validation.phone[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Email`"
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
                  <textarea
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Address`"
                    v-model="form.address"
                  ></textarea>
                  <div v-if="validation.address" class="flex py-6">
                    <div
                      class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                      role="alert"
                    >
                      {{ validation.address[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-group mb-6">
                  <textarea
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    :placeholder="`${context.title} Notes`"
                    v-model="form.notes"
                  ></textarea>
                  <div v-if="validation.notes" class="flex py-6">
                    <div
                      class="bg-yellow-100 rounded-lg text-base text-yellow-700 w-full"
                      role="alert"
                    >
                      {{ validation.notes[0] }}
                    </div>
                  </div>
                </div>
              </div>


              <div v-else>
                Product & Category Form Add
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
  props: ["showModal", "context", "endPoint", "paging", "roles", "status", "loadingRole", "edit"],
  data() {
    return {
      loading: null,
      loadingAdd: null,
      loadingCategories: null,
      form: {
      },
      api_url: process.env.NUXT_ENV_API_URL,
      validation: [],
    };
  },

  beforeMount() {
    this.authTokenStorage();
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

    addData() {
      try {
        this.loadingAdd = true
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token.token}`
          }
        }
        const endPoint = `${this.api_url}${this.endPoint}`
        console.log(endPoint)
        this.$axios.post(endPoint, this.form, config)
        .then(({data}) => {
          if(data.success) {
            this.toggleModal()
            this.$emit('show-toast-message', `Success added new ${this.context.title} ${data.data[0].name}`, data.message)
            if(this.context.title === 'Costumer' || this.context.title === 'Supplier') {
              this.$emit('update-data', false, false, this.paging.current, '', '')
            } else if(this.context.title === 'User') {
              this.$emit('update-data', true);
            } else {
              console.log("Buat product update data")
            }
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
    },

    changeRoles(e) {
      this.form.roles = e.target.value
    },

    changeStatus(e) {
      this.form.status = e.target.value
    }

  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
