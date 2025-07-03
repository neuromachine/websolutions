<script setup>
const props = defineProps({
/*  id: {
    type: Number,
    required: true
  },*/
  slug: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div class="svg_wrap">
<!--    <div v-if="id === 12" class="services-icon">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M236 420c0-9.935-5.439-19.09-14.198-23.779-72.477-38.793-118.37-120.733-102.752-211.648 13.529-78.756 75.602-143.727 153.824-160.064a215.935 215.935 0 0 1 12.925-2.284c-23.244-3.473-47.789-2.965-72.925 2.284C134.652 40.847 72.579 105.817 59.05 184.574c-15.631 90.993 30.354 172.995 102.938 211.747C170.637 400.939 176 409.985 176 419.79v.21c0 44.183 35.817 72 80 72 10.613 0 20.733-1.621 30-4.672-29.313-9.651-50-33.758-50-67.328z" style="" fill="#cee1f2" data-original="#cee1f2"></path><path d="m176 180-40 40 40 40M336 180l40 40-40 40M276 140l-40 160" style="stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" fill="none" stroke="#ff9800" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#ff5cf4" opacity="1" class=""></path><path d="m20 20 40 20M452 40l40-20M20 416l40-20M452 396l40 20M456 220C456 95.461 342.168-2.493 212.874 24.51 134.652 40.846 72.579 105.817 59.05 184.574 43.425 275.528 89.365 357.5 161.896 396.272c8.667 4.633 14.104 13.69 14.104 23.518v.21c0 44.183 35.817 72 80 72h0c44.183 0 80-27.817 80-72v-.21c0-9.838 5.428-18.88 14.104-23.518C413.073 362.611 456 296.39 456 220z" style="stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" fill="none" stroke="#7b68ee" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#0023c4" class="" opacity="1"></path></g></svg>
    </div>-->
    <div v-if="props.slug ==='razrabotka'">
      <i class="bi bi-gear"></i>
    </div>
    <div class="grad gra_w_to_s" v-else-if="props.slug =='0'">
      <i class="bi bi-star"></i>
    </div>
    <div class="grad gra_s_to_b" v-else-if="props.slug =='1'">
      <i class="bi bi-stars"></i>
    </div>
    <div class="grad gra_y_to_o" v-else-if="props.slug =='2'">
      <i class="bi bi-trophy"></i>
    </div>
    <div class="grad gra_o_to_r" v-else-if="props.slug =='3'">
      <i class="bi bi-award"></i>
    </div>
    <div v-else-if="props.slug ==='prodvizenie'">
      <i class="bi bi-megaphone"></i>
    </div>
    <div v-else-if="props.slug ==='podderzka-i-soprovozdenie'">
      <i class="bi bi-shield-check"></i>
    </div>
    <div v-else-if="props.slug ==='kontent-i-kreativ'">
      <i class="bi bi-pen"></i>
    </div>
    <div v-else-if="props.slug ==='konsalting-i-strategiia'">
      <i class="bi bi-bar-chart"></i>
    </div>
    <div v-else class="services-icon">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M152 220c0-100.26 73.776-183.284 170-197.76A201.584 201.584 0 0 0 292 20C181.543 20 92 109.543 92 220s89.543 200 200 200c10.197 0 20.214-.768 30-2.24-96.224-14.476-170-97.5-170-197.76z" style="" fill="#f0f8ff" data-original="#cee1f2" class="" opacity="1"></path><path d="m212 180-40 40 40 40M372 180l40 40-40 40M312 140l-40 160" style="stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" fill="none" stroke="#ff9800" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#ff5cf4" opacity="1" class=""></path><circle cx="292" cy="220" r="200" style="stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" fill="none" stroke="#7b68ee" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#0023c4" opacity="1" class=""></circle><path d="m124.396 444.166-36.115 36.115C80.469 488.094 70.234 492 60 492s-20.469-3.906-28.281-11.719c-15.625-15.625-15.625-40.938 0-56.562l36.115-36.115" style="stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" fill="none" stroke="#7b68ee" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" data-original="#0023c4" opacity="1" class=""></path></g></svg>
    </div>
  </div>

</template>

<style scoped>
svg {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
.svg_wrap i { font-size: 42px; color: #223A76}
.svg_wrap .gra_w_to_s i {background: linear-gradient(45deg, #E5F7FD 0%, #00D9EA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}
.svg_wrap .gra_s_to_b i {background: linear-gradient(45deg, #00D9EA 0%, #0C90C7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}
.svg_wrap .gra_y_to_o i {background: linear-gradient(45deg, #FFE265 0%, #FFC500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}
.svg_wrap .gra_o_to_r i {background: linear-gradient(45deg, #FFC500 0%, #FF5A5F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}

</style>