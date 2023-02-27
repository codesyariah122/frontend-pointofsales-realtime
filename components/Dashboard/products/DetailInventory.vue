<template>
	<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
	:class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
	>
	<div class="rounded-t mb-0 px-6 py-6 border-0">
		<div class="flex justify-start items-start mb-12">
			<div>
				<div class="flex space-x-2 justify-center">
					<button @click="$router.go(-1)" type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
						<i class="fas fa-arrow-left"></i> Kembali
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap items-center">
			<div class="relative w-full px-4 max-w-full flex-grow flex-1">
				<h3
				class="font-semibold text-lg"
				:class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
				>
				{{message}}
			</h3>
		</div>
	</div>
	<div v-if="loadingDetail" class="flex justify-center items-center">
		<div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
	<div v-else class="flex justify-start items-start mt-6 mb-6">
		<div class="flex justify-center">
			<ul class="bg-white rounded-lg w-96 text-gray-900">
				<li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
					{{detail.name}}
				</li>
				<li class="px-6 py-2 border-b border-gray-200 w-full">
					<img :src="barcodePng" class="w-36 h-24">
					<h5 class="text-gray-600">
						{{detail.barcode}}
					</h5>
				</li>
				<li class="px-6 py-2 border-b border-gray-200 w-full">
					<h5>
						Size: {{$size(detail.size)}}
					</h5>
				</li>
				<li class="px-6 py-2 border-b border-gray-200 w-full">
					Category: {{category.name}} <span v-html="category.icon" class="text-2xl"></span>
				</li>
				<li class="px-6 py-2 border-b border-gray-200 w-full">
					Buy Price : {{$format(detail.buy_price)}}
				</li>
				<li class="px-6 py-2 border-b border-gray-200 w-full">
					Sell Price : {{$format(detail.sell_price)}}
				</li>
				<li class="px-6 py-2 w-full rounded-b-lg">
					Stock: {{detail.stock}}
				</li>
			</ul>
		</div>
	</div>
</div>
</div>
</template>

<script>
	export default {
		props: {
			color: {
			default: "light",
				validator: function (value) {
					return ["light", "dark"].indexOf(value) !== -1;
				},
			},
		},

		data() {
			return {
				loadingDetail: null,
				barcode: this.$route.params.barcode,
				detail: {},
				api_url: process.env.NUXT_ENV_API_URL,
				barcodePng: '',
				category: {
					name: '',
					icon: ''
				},
				message: ''
			}
		},

		beforeMount() {
			this.authTokenStorage();
		},

		created() {
			this.detailProduct()
		},

		methods: {
			authTokenStorage() {
				this.$store.dispatch("auth/storeAuthToken", "auth");
			},

			detailProduct() {
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
							this.message = data.message
							this.detail = data.data
							data.data.categories.map(category => {
								this.category.name = category.name
								this.category.icon = category.icon
							})
							this.getBarcode(data.data.barcode, data.data.name)
						}
					})
					.finally(() => {
						setTimeout(() => {
							this.loadingDetail = false
						}, 1500)
					})
					.catch(err => {
						console.log(err)
					})
				} catch(err) {
					console.log(err.message)
				}
			},

			getBarcode(code, name) {
				try {
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
							this.barcodePng = data.data
						}
					})
					.catch(err => {
						console.log(err?.response?.data)
					})
				} catch (err) {
					console.log(err.message)
				}
			},
		},

		computed: {
			token() {
				return this.$store.getters["auth/getAuthToken"];
			}
		},
	}
</script>