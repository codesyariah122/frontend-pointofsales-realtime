<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-8/12 px-4">
      <CardsCardSettings />
    </div>
    <div class="w-full lg:w-4/12 px-4">
      <CardsCardProfile />
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard.settings",
  layout: "admin",
};
</script>
