<script setup>
defineProps({
  slug: String,
  filename: String,
  svg: false,
})
</script>

<template>
  <div class="img_desctop">
    <div v-if="svg" class="svg_wrap">
      <div class="portfolio-details-image">
        <svg id="_Слой_1" data-name="Слой_1" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 552.58 394.94">
          <g id="IMG" class="img_wrap">
            <image transform="translate(22.6 22.9)"  class="image" :href="'/assets/img/portfolio/'+slug+'/'+filename"/>
          </g>
          <path id="white" class="white" d="M0,0v394.9h552.6V0H0ZM522.6,330.9c0,6.6-5.4,12-12,12H34.6c-6.6,0-12-5.4-12-12V34.9c0-6.6,5.4-12,12-12h476c6.6,0,12,5.4,12,12v296Z"/>
          <path id="shadow" class="shadow" d="M528.6,12.9H36.6c-13.3,0-24,10.8-24,24v312c0,13.2,10.7,24,24,24h492c13.2,0,24-10.8,24-24V36.9c0-13.2-10.8-24-24-24ZM522.6,330.9c0,6.6-5.4,12-12,12H34.6c-6.6,0-12-5.4-12-12V34.9c0-6.6,5.4-12,12-12h476c6.6,0,12,5.4,12,12v296Z"/>
          <path id="frame" class="frame" d="M522.6,2.9H22.6C11.5,2.9,2.6,11.9,2.6,22.9v320c0,11,9,20,20,20h500c11,0,20-9,20-20V22.9c0-11-9-20-20-20ZM522.6,330.9c0,6.6-5.4,12-12,12H34.6c-6.6,0-12-5.4-12-12V34.9c0-6.6,5.4-12,12-12h476c6.6,0,12,5.4,12,12v296Z"/>
          <rect id="stand_1" class="stand_1" x="242.6" y="372.9" width="80" height="12" rx="4" ry="4"/>
          <path id="stand_2" class="stand_2" d="M217.6,384.9h130c2.8,0,5,2.2,5,5h0c0,2.8-2.2,5-5,5h-130c-2.8,0-5-2.2-5-5h0c0-2.8,2.2-5,5-5Z"/>
        </svg>
      </div>
    </div>
    <div v-else class="css_wrap">
      <img :src="'/assets/img/portfolio/'+slug+'/'+filename" >
    </div>
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