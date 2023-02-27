<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            
            <card-stats
              statSubtitle="TOTAL INVENTORY"
              :statTitle="`${totalProduct}`"
              :dataPercent="percentageProduct"
              statDataPercentColor="text-emerald-500"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="TOTAL USERS"
              :statTitle="`${totalUser}`"
              statArrow="down"
              statPercent="3.48"
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="fas fa-users"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="TOTAL CUSTOMER"
              :statTitle="`${totalCustomer}`"
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PERFORMANCE"
              statTitle="49,65%"
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="fas fa-percent"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

export default {
  components: {
    CardStats,
  },

  data () {
    return {
      notifs: [],
      total_user: null,
      api_url: process.env.NUXT_ENV_API_URL,
      dataPercent: {}
    }
  },

  beforeMount() {
    this.authTokenStorage();
  },

  created() {
    this.checkNewData();
  },

  mounted() {
    this.getTotalUser();
    this.getTotalProduct();
    this.getTotalCustomer();
  },

  methods: {
    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen("EventNotification", (e) => {
        this.notifs.push(e[0]);
      });
    },
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },
    getTotalUser() {
      this.$store.dispatch('totals/totalDataQuery', {api_url: this.api_url, type: 'TOTAL_USER', token: this.token})
    },
    getTotalProduct() {
      this.$store.dispatch('totals/totalDataQuery', {
        api_url: this.api_url,
        type: 'TOTAL_PRODUCT',
        token: this.token
      })
    },

    getTotalCustomer() {
      this.$store.dispatch('totals/totalDataQuery', {
        api_url: this.api_url,
        type: 'TOTAL_CUSTOMER',
        token: this.token
      })
    }
  },

  computed: {
    totalUser() {
      return this.$store.getters['totals/getTotalUser']
    },
    totalProduct() {
      return this.$store.getters['totals/getTotalProduct']
    },
    percentageProduct() {
      return this.$store.getters['totals/getPercentageProduct']
    },
    totalCustomer() {
      return this.$store.getters['totals/getTotalCustomer']
    },
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
  watch: {
    notifs() {
      if (this.notifs.length > 0) {
        this.getTotalUser()
        this.getTotalProduct()
        this.getTotalCustomer()
      }
    },
  },
};
</script>
