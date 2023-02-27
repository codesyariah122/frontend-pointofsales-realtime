<template>
  <div>
    <a
      class="text-blueGray-500 py-1 px-3"
      href="#pablo"
      ref="btnDropdownRef"
      @click="toggleDropdown($event)"
    >
      <i class="fas fa-ellipsis-h"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-gray-600 text-white opacity-100 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        @click="deleteData"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-400 hover:text-blue-700 text-blueGray-700"
      >
        Move To Trash
      </a>
      <nuxt-link v-if="context.title === 'Product' || context.title === 'User'"
        :to="{path: `/dashboard/inventory/${data}`}"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-400 hover:text-blue-700 text-blueGray-700"
      >
        Detail {{context.title}}
      </nuxt-link>
      <a v-if="context.title === 'Product' || context.title === 'User'" @click="toggleModal()"
        slot="button"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-400 hover:text-blue-700 text-blueGray-700 cursor-pointer"
      >
        Edit {{context.title}}
      </a>
    </div>
    <dashboard-modal-edit-product-modal v-if="context.title === 'Product'" @toggle-modal="toggleModal" :showModal="showModal" :barcode="data" @toast-message="toastMessage" :context="context"/>
    
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  props: ['data', 'context',  'endPoint', 'roles', 'edit', 'status'],
  data() {
    return {
      dropdownPopoverShow: false,
      allow: true,
      showModal: null,
      loadingEdit: null,
      detail: {},
      api_url: process.env.NUXT_ENV_API_URL,
    };
  },

  beforeMount() {
    this.authTokenStorage()
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "top-start",
        });
      }
    },

    deleteData() {
      this.dropdownPopoverShow = false;
      this.$emit("deleteData");
    },

    toggleModal() {
      this.showModal = !this.showModal;
      this.dropdownPopoverShow = false
    },

    toastMessage(msg, alert) {
      this.$emit('show-toast-message', msg, alert)
    }
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
