<template>
  <div
  v-if="showModal"
  class="overflow-x-hidden overflow-y-auto fixed inset-0 justify-center items-center flex z-9999"
  >
  <div v-if="context.title === 'Product'" class="relative w-auto my-6 mx-auto max-w-3xl">
    <!--content-->
    <div v-if="loadingDetail" class="flex justify-center items-center">
     <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else
  class="border-0 rounded-lg shadow-xl drop-shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white z-50"
  >
  <form @submit.prevent="updateProduct">
    <!--header-->
    <div
    class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t mt-12"
    >
    <h3 class="text-1xl font-semibold">Edit Product {{form.name}}</h3>
    <button
    class="ml-auto border-0 text-black opacity-3 float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
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
      type="text"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Nama Product"
      v-model="form.name"
      />
    </div>

    <div class="form-group mb-6">
      <input
      type="text"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Size"
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
    </div>

    <div class="form-group mb-6">
      <input
      type="number"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Sell Price"
      v-model="form.sell_price"
      />
    </div>

    <div class="form-group mb-6">
      <input
      type="number"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Stock"
      v-model="form.stock"
      />
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
      <option selected :value="category.id">
       {{form.categories[0].name}} <span v-html="form.categories[0].icon"></span>
      </option>
     <!-- loop item -->
     <option v-for="(category, idx) in categories.filter(d=>d.id !== form.categories[0].id)" :key="idx"
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
v-if="loadingEdit"
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
<div v-else class="relative w-auto my-6 mx-auto max-w-3xl">
  <div v-if="loadingDetail" class="flex justify-center items-center">
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else
  class="border-0 rounded-lg shadow-xl drop-shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white z-50"
  >
  <h1>Category Product Edited</h1>

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
v-if="loadingEdit"
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
</div>
</div>
</div>
</template>

<script>
  export default {
    props: ["showModal", "barcode", "context"],
    data() {
      return {
        loadingDetail: null,
        loading: null,
        loadingEdit: null,
        loadingCategories: null,
        categories: [],
        form: {},
        category: {
          id: null
        },
        category_id: null,
        api_url: process.env.NUXT_ENV_API_URL,

        validation: [],
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  created() {
    if(this.context.title === "Product") {
     this.setEditProduct();
   }
 },

 mounted() {
   this.fetchCategories();
 },

 methods: {
  authTokenStorage() {
    this.$store.dispatch("auth/storeAuthToken", "auth");
  },

  toggleModal() {
      // this.form = {}
    this.$emit("toggle-modal");
  },

  setEditProduct() {
   try {
    this.loadingDetail = true
    const config = {
     headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.token}`
    }
  }
  const endPoint = `${this.api_url}/fitur/product-management/${this.barcode}`
  this.$axios.get(endPoint, config)
  .then(({data}) => {
   if(data.success) {
    this.form = data.data
    this.form.size = this.$size(data.data.size)
    data.data.categories.map(category => {
     this.category.id = category.id
   })
  }
})
  .finally(() => {
   setTimeout(() => {
    this.loadingDetail = false
  }, 1500)
 })
  .catch(err => {
   console.log(err.response.data)
 })
} catch(err) {
  console.log(err.message)
}
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
  this.category_id = e.target.value
},

updateProduct() {
  try {
    this.loadingEdit = true
    const config = {
     headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token.token}`
    }
  }
  const endPoint = `${this.api_url}/fitur/product-management/${this.barcode}`

  const data = {
   name: this.form.name,
   size: this.form.size === null ? null : this.form.size,
   buy_price: this.form.buy_price,
   sell_price: this.form.sell_price,
   stock: this.form.stock,
   category_id: this.category_id === null ? this.category.id : this.category_id
 }

 this.$axios.put(endPoint, data, config)
 .then(({data}) => {
   if(data.success) {
    this.toggleModal()
    this.$emit('toast-message', data.message, `Update Product ${data.data.name}`)
  } else {
    this.$swal({
      icon: 'error',
      title: 'Oops...',
      text: data.message,
    })
    this.toggleModal()
  }
})
 .finally(() => {
   setTimeout(() => {
    this.loadingEdit = false
  }, 1500)
 })
 .catch(err => {
   if(err.response.data) {
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
watch: {
  notifs() {
    if (this.notifs.length > 0) {
      if(this.context.title === 'Product') {
        this.setEditProduct();
      }
    }
  },
}
};
</script>
