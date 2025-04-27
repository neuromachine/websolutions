<script setup>
import {computed} from "vue";

import item from "@/components/blocks/services/item.vue";

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

const tree = computed(() => {
  // console.log(tree)
  return mainStore.geyServicesTree(mainStore.data.tree);
});
</script>

<template>
  <!-- Start Services Three Section -->
  <section id="list_services" class="list_s services-section-three section-padding">
    <div class="container">
      <div class="row">
        <item v-for="(item, index) in tree" :key="index"
                     :id="item.id"
                     :title="item.title"
                     :childs="item.childs"
                     :slug="item.slug"
        />
        />
        <div class="col-lg-4 col-md-6">
          <div class="single-services-three-item">
            <div class="services-icon">
              <img src="/assets/img/icon/services-three-icon-1.svg" alt="svg icon">
            </div>
            <div class="services-three-content">
              <h3>Managed IT Services</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore</p>
              <ul class="features-list">
                <li><span>Cloud Services</span></li>
                <li><span>Managed IT Service</span></li>
                <li><span>IT Security Services</span></li>
                <li><span>Practice IT Management</span></li>
                <li><span>Solving IT Problems</span></li>
              </ul>
              <div class="services-btn">
                <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-three-item">
            <div class="services-icon">
              <img src="/assets/img/icon/services-three-icon-2.svg" alt="svg icon">
            </div>
            <div class="services-three-content">
              <h3>Cloud Hosting</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore</p>
              <ul class="features-list">
                <li><span>Cloud Services</span></li>
                <li><span>Managed IT Service</span></li>
                <li><span>IT Security Services</span></li>
                <li><span>Practice IT Management</span></li>
                <li><span>Solving IT Problems</span></li>
              </ul>
              <div class="services-btn">
                <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-three-item">
            <div class="services-icon">
              <img src="/assets/img/icon/services-three-icon-3.svg" alt="svg icon">
            </div>
            <div class="services-three-content">
              <h3>IT Consulting</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore</p>
              <ul class="features-list">
                <li><span>Cloud Services</span></li>
                <li><span>Managed IT Service</span></li>
                <li><span>IT Security Services</span></li>
                <li><span>Practice IT Management</span></li>
                <li><span>Solving IT Problems</span></li>
              </ul>
              <div class="services-btn">
                <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-three-item">
            <div class="services-icon">
              <img src="/assets/img/icon/services-three-icon-4.svg" alt="svg icon">
            </div>
            <div class="services-three-content">
              <h3>Data Analytics</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore</p>
              <ul class="features-list">
                <li><span>Cloud Services</span></li>
                <li><span>Managed IT Service</span></li>
                <li><span>IT Security Services</span></li>
                <li><span>Practice IT Management</span></li>
                <li><span>Solving IT Problems</span></li>
              </ul>
              <div class="services-btn">
                <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-three-item">
            <div class="services-icon">
              <img src="/assets/img/icon/services-three-icon-5.svg" alt="svg icon">
            </div>
            <div class="services-three-content">
              <h3>Networking Services</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore</p>
              <ul class="features-list">
                <li><span>Cloud Services</span></li>
                <li><span>Managed IT Service</span></li>
                <li><span>IT Security Services</span></li>
                <li><span>Practice IT Management</span></li>
                <li><span>Solving IT Problems</span></li>
              </ul>
              <div class="services-btn">
                <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-three-item">
            <div class="services-icon">
              <img src="/assets/img/icon/services-three-icon-6.svg" alt="svg icon">
            </div>
            <div class="services-three-content">
              <h3>Security Sloution</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore</p>
              <ul class="features-list">
                <li><span>Cloud Services</span></li>
                <li><span>Managed IT Service</span></li>
                <li><span>IT Security Services</span></li>
                <li><span>Practice IT Management</span></li>
                <li><span>Solving IT Problems</span></li>
              </ul>
              <div class="services-btn">
                <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Three Section -->
</template>

<style scoped>
.list_s {}
</style>