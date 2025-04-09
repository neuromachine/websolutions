<script setup>

import {computed} from "vue";
import {useRoute} from "vue-router";

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";

import sourceData from "@/data.json";

const route = useRoute();

// Ищем объект в массиве по slug
const item = computed(() => sourceData.find((item) => item.slug == route.params.slug));
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Услуги', link: '/services' },
 // { title: item.title, link: '/service/'+item.slug }
]" />

  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <div class="services-details-content">
            <div class="services-details-image">
              <img src="/assets/img/services-details-1.jpg" alt="image">
            </div>

            <h3>{{item.title}}Software Development Consulting We Provide</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt laborum</p>

            <div class="features-text">
              <h4>We Provide Our Client Best Software & IT Solution Services</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. minim veniam, quis nostrud exercitation ullamco laboris nisi commodo consequat.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt laborum</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt laborum</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <aside class="services-widget">
            <section class="widget widget_categories">
              <h3 class="widget-title">Our Services</h3>
              <ul>
                <li> <a href="#">IT Solutions</a></li>
                <li> <a href="#">Web Development</a></li>
                <li> <a href="#">Technology</a></li>
                <li> <a href="#">Networking Services</a></li>
                <li> <a href="#">Software Development</a></li>
              </ul>
            </section>
            <section class="widget widget_download_btn">
              <h3 class="widget-title">Company Profile</h3>
              <div class="download-btn-box">
                <a href="#" class="default-btn">Download PDF <span></span></a>
                <a href="#" class="default-btn" >Download Word File <span></span></a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Details Section -->
</template>

<style scoped>

</style>