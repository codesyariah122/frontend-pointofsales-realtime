/**
 * @author: pujiermanto@gmail.com
 * @globals: method reusable for any component and any source 
*/

export default {
	data() {
		return {
			globalLoading: null,
			expires_at: null,
			api_url: process.env.NUXT_ENV_API_URL,
			notifs: []
		}
	},

	beforeMount() {
		this.authTokenStorage();
	},

	created() {
		this.checkNewData();
	},

	mounted() {
		this.checkNewData()
	},

	methods: {
		authTokenStorage() {
			this.$store.dispatch("auth/storeAuthToken", "auth");
		},

		checkNewData() {
			window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen('EventNotification', (e) => {
				// check console for production
				console.log(e)
				this.notifs.push(e[0]);
			});
		},

		sesiLogout(roles) {
			const endPoint = `${this.api_url}/auth/logout`;
			this.$axios.defaults.headers.common["Accept"] = "application/json";
			this.$axios.defaults.headers.common[
				"Authorization"
				] = `Bearer ${this.token.token}`;
			this.$axios
			.post(endPoint)
			.then(({ data }) => {
				if (data.success) {
					this.$swal(`Sesi login habis!`, "", "success");
					this.$store.dispatch("auth/removeAuthToken", "auth");
					this.$store.dispatch("auth/removeExpiredLogin", 'expired_at')
					setTimeout(() => {
						if(this.path === '/') {
							location.reload()
						} else {
							this.$router.replace("/");
						}
					}, 1500);
				}
			})
			.catch((err) => console.log(err));
		},

		logout() {
			this.$swal({
				title: `Apa kamu ingin keluar dari Dashboard ${this.roles} ?`,
				showDenyButton: false,
				showCancelButton: true,
				confirmButtonText: "Keluar",
				denyButtonText: `Batal`,
			}).then((result) => {
				if (result.isConfirmed) {
					this.globalLoading = true
					const endPoint = `${this.api_url}/auth/logout`;
					this.$axios.defaults.headers.common["Accept"] = "application/json";
					this.$axios.defaults.headers.common[
						"Authorization"
						] = `Bearer ${this.token.token}`;
					this.$axios
					.post(endPoint)
					.then(({ data }) => {
						if (data.success) {
							this.$swal(`Logout Berhasil!`, "", "success");
							this.$store.dispatch("auth/removeAuthToken", "auth");
							this.$store.dispatch("auth/removeExpiredLogin", 'expired_at')
							setTimeout(() => {
								if(this.path === '/') {
									location.reload()
								} else {
									this.$router.replace("/");
								}
							}, 1500);
						}
					})
					.catch((err) => console.log(err))
					.finally(() => {
						setTimeout(() => {
							this.globalLoading = false
						}, 500)
					});
				} else if (result.isDenied) {
					Swal.fire("Changes are not saved", "", "info");
				}
			});
		},
	},

	computed: {
		token() {
			return this.$store.getters["auth/getAuthToken"];
		},
	},
}