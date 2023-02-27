<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <cards-card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4"></div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-10/12 mb-12 xl:mb-0 px-4">
        <cards-card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <cards-card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <cards-card-social-traffic />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard.role",
  layout: "admin",
};
</script>
