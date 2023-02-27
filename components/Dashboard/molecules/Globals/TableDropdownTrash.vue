<template>
  <div>
    <a
      class="text-blueGray-500 py-1 px-3"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
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
        Delete Permanent
      </a>
      <a @click="restoreData"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-400 hover:text-blue-700 text-blueGray-700"
      >
        Restore Data
      </a>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      allow: true,
    };
  },
  
  mounted() {},

  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    deleteData() {
      this.dropdownPopoverShow = false
      this.$emit("deleteData");
    },
    restoreData() {
      this.dropdownPopoverShow = false
    	this.$emit('restoreData')
    }
  },
};
</script>
