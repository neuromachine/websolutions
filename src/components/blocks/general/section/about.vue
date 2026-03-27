<script setup>
const props = defineProps({
  slide: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <!-- Start About Section -->
  <section class="about-area bg-grey section-padding">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="about-content">
            <h6 class="sub-title">{{props.slide.subtitle}}</h6>
            <h2>{{props.slide.maintitle}}</h2>
            <div v-html="props.slide.body"></div>
            <div class="about-btn-box">
              <RouterLink :to=props.slide.link class="default-btn">
                {{props.slide.anchor}}<span></span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="about-image">
            <img src="@/assets/img/about-2.png" alt="About image">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End About Section -->
</template>

<style scoped>

</style>