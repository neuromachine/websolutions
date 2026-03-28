<script setup>
import $ from 'jquery'
import {onMounted} from "vue"
onMounted( () => {
  $('.accordion').find('.accordion-title').on('click', function(){
    // Adds Active Class
    $(this).toggleClass('active');
    // Expand or Collapse This Panel
    $(this).next().slideToggle('slow');
    // Hide The Other Panels
    $('.accordion-content').not($(this).next()).slideUp('slow');
    // Removes Active Class From Other Titles
    $('.accordion-title').not($(this)).removeClass('active');
  });
})
const props = defineProps({
  list: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <!-- Start Faq Section -->
  <section class="faq-section home-faq bg-grey section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <div class="faq-img">
            <img src="@/assets/img/faq.png" alt="images">
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="section-title">
            <h6 class="sub-title">{{props.list.subtitle}}</h6>
            <h2>{{props.list.title}}</h2>
          </div>
          <div class="faq-accordion first-faq-box">
            <ul class="accordion">
              <li class="accordion-item" v-for="(item,index) in props.list.items">
                <a class="accordion-title" href="javascript:void(0)"> <i class="fa fa-plus"></i> {{item.title}}</a>
                <p class="accordion-content">{{item.descr}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Faq Section -->
</template>

<style scoped>

</style>