<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-12/12 px-4">
      <DashboardProductsInventoryTable />
    </div>

    <div class="w-full lg:w-12/12 px-4 mt-12">
      <DashboardProductsCategoryProductTable/>
    </div>
  </div>
</template>

<script>
export default {
  name: "inventory",
  layout: "admin",
};
</script>
