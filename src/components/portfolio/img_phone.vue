<script setup>
defineProps({
  filename: String,
})
</script>

<template>
  <div class="portfolio-details-image phone_wrap">

    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.14 375">
      <g id="IMG" class="img_wrap">
        <image  class="image_p" :href="'/assets/img/portfolio/images/'+filename"/>
      </g>
      <path id="uplayer" class="white" d="M0,0v375h200V0H0ZM194.14,334c0,15.46-12.54,28-28,28H30.14c-15.47,0-28-12.54-28-28V30C2.14,14.54,14.67,2,30.14,2h136c15.46,0,28,12.54,28,28v304Z"/>
      <rect id="frame_p" class="cls-3" x="3.35" y="2.89" width="192" height="360" rx="28" ry="28"/>
      <path id="shadow" d="M200.14,41v296c0,17.67-14.33,32-32,32H40.14c-9.48,0-18-4.12-23.86-10.67,4.08,2.34,8.81,3.67,13.86,3.67h136c15.46,0,28-12.54,28-28V30c0-3.52-.65-6.89-1.84-9.99,4.88,5.62,7.84,12.96,7.84,20.99Z"/>
<!--      <path id="dinamic" class="cls-4" d="M81.54,15h31.2c1.33,0,2.4.9,2.4,2h0c0,1.1-1.07,2-2.4,2h-31.2c-1.33,0-2.4-.9-2.4-2h0c0-1.1,1.07-2,2.4-2Z"/>-->
<!--      <circle id="button" class="cls-2" cx="98.14" cy="332" r="10"/>-->
    </svg>
  </div>
</template>

<style scoped>
.phone_wrap { max-width: 300px;}
#frame_p {
  fill: none;
  stroke: #362c72;
  stroke-width: 2px;
}
#button,#dinamic {
  fill: #000;
}
.white {fill: #fff;}
.image_p { width: 100%; height: auto;}
#shadow {fill: #0a53be}
</style>