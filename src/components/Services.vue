<script setup>
import {computed} from "vue";
import ServiceItem from "@/components/ServiceItem.vue";
/*
import data_json from "@/services.json";
onMounted(() => {
  console.log(data)
});
const data = data_json
*/
import {useRoute} from "vue-router";
const route = useRoute();

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();
// const item = computed(() => {
//   if (!route.params.slug) return null;
//   return mainStore.getServiceBySlug(route.params.slug);
// });
const tree = computed(() => {
  return mainStore.geyServicesTree(mainStore.data.tree);
});


</script>

<template>
  <!-- Start Services Section -->
  <section class="services-section section-padding">
    <div class="container">
      <div class="row">
        <ServiceItem v-for="(item, index) in tree" :key="index"
                     :id="item.id"
                     :title="item.title"
                     :childs="item.childs"
                     :slug="item.slug"
        />
      </div>
    </div>
  </section>
  <!-- End Services Section -->

  <!-- Start Hire Section -->
  <section class="hire-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 col-md-12">
          <div class="hire-content">
            <h6 class="sub-title">Want to work with us?</h6>
            <h2>Digitally Transform & Grow Your Business</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud consectetur voluptatem accusantium doloremque adipiscing elit.</p>
            <div class="hire-btn">
              <a class="default-btn" href="tel:12345678">Call Now<span></span></a>
              <a class="default-btn-one" href="contact.html">Contact Us<span></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hire Section -->

  <!-- Start Overview Section -->
  <section class="overview-section section-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="overview-image">
            <img src="/assets/img/choose-1.png" alt="image">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="overview-content">
            <h6 class="sub-title">Why Choose Us?</h6>
            <h2>Safeguard Your Brand with Cyber Security and IT Solutions</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul class="features-list">
              <li> <span>Remote IT Assistance</span></li>
              <li> <span>Cloud Services</span></li>
              <li> <span>Managed IT Service</span></li>
              <li> <span>IT Security Services</span></li>
              <li> <span>Practice IT Management</span></li>
              <li> <span>Solving IT Problems</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Overview Section -->

  <!-- Start Overview Section -->
  <section class="overview-section pt-50 pb-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="overview-content">
            <h6 class="sub-title">WHY TRUST US?</h6>
            <h2>Achieve Digital Transformation For Your Retail Business Services</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul class="features-list">
              <li> <span>Protect your Business</span></li>
              <li> <span>Network Security</span></li>
              <li> <span>Data Security</span></li>
              <li> <span>Small Business Owners</span></li>
              <li> <span>Running your Business</span></li>
              <li> <span>Network Monitoring</span></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="overview-image-2">
            <img src="/assets/img/choose-2.png" alt="image">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Overview Section -->
</template>

<style scoped>
.lv3 {
  color: #c31010;}

.subitems { display: none}
</style>