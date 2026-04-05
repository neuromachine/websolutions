<script setup>
const props = defineProps({
  list: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <!-- Start Works Process Section -->
  <section class="workprocess-section bg-grey section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">{{props.list.subtitle}}</h6>
            <h2>{{props.list.title}}</h2>
          </div>
        </div>
        <div v-for="(item , index) in props.list.items" class="col-lg-3 col-md-6">
          <div class="workprocess-single-item">
            <div class="workprocess-icon-box">
              <img :src="item.icon" alt="icon">
            </div>
            <div class="workprocess-info">
              <h3>{{item.title}}</h3>
              <p>{{item.descr}}</p>
            </div>
            <div class="workprocess-number-bg"><span>0{{ index + 1 }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Works Process Section -->
</template>

<style scoped>

</style>