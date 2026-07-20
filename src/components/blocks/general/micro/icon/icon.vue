<script setup>
import { ref, computed } from "vue"
import { useGsapOrchestrator } from '@/composables/useGsapOrchestrator'
import {getIconAnimations} from "@/components/blocks/general/micro/icon/icon.animations.js";
const iconWrap = ref(null)
const stroke = ref(null)
const fill = ref(null)
const animConfig = computed(() => getIconAnimations({
  iconWrap: iconWrap.value,
  stroke: stroke.value,
  fill: fill.value,
}))

useGsapOrchestrator(iconWrap, animConfig)
</script>

<template>
  <div ref="iconWrap" class="icon_wrap">
    <svg id="marketing" class="icon_ws" viewBox="0 0 245.36 234.6">
      <g ref="stroke" id="base">
        <path id="bargraph" class="cls-1" d="M6.57,228.04h16.89v-67.08c0-.1,1.31-1.41,1.41-1.41h38.47c.17,0,2.35,2.18,2.35,2.35v66.15h10.32v-94.29c0-.26,1.46-2.56,1.88-2.81,1.59-.96,33.16-.97,37.11-.52,1.35.15,2.46.12,3.16,1.53l.06,96.11h11.26v-125.26c0-.16,1.45-1.65,1.89-1.86,1.74-.82,32.54-1.02,36.16-.53,1.24.17,4.18,1.2,4.18,2.39v125.26h11.26V71.82c0-.1,1.31-1.41,1.41-1.41h38.47c.21,0,2.35,2.93,2.35,3.28v154.34h18.3c1.99,0,3,6.57,0,6.57H1.41c-.1,0-1.41-1.31-1.41-1.41V2.39C0,.47,6.57.47,6.57,2.39v225.65Z"/>
        <path id="arrow" class="cls-1" d="M198.69,57.07c-2.86,3.17-11.12-6.75-13.44-9.16-1.43-1.48-.83-3.63-3.53-2.69-31.55,27.7-68.08,50.22-107.37,65.31-6.9,2.65-38.66,14.04-43.73,12.31-.88-.3-.99-.76-1.39-1.43-.6-.99-4.79-16.51-4.81-17.8-.02-1.44.14-2.29,1.31-3.23,1.68-1.35,15.48-4.16,19.08-5.31,32.77-10.49,64.78-26.14,92.84-46.02,3.73-2.64,27.82-20.67,27.4-23.06s-17.42-13.54-10.03-16.86L206.94,0c6-.2,4.6,3.63,3.88,7.71-2.93,16.56-8.2,33.01-12.13,49.35Z"/>
      </g>
      <g ref="fill" id="fill">
        <rect id="fill_bar_4" class="cls-5" x="189.53" y="76.98" width="28.15" height="151.06"/>
        <path id="fill_bar_3" class="cls-4" d="M165.13,107v121.03h-29.09v-119.63c0-.1,1.31-1.41,1.41-1.41h27.68Z"/>
        <path id="fill_bar_2" class="cls-2" d="M111.65,137.03v91.01h-29.09c-.09-27.31-.13-54.64.59-81.94.04-1.34-1.85-9.07.82-9.07h27.68Z"/>
        <rect id="fill_bar_1" class="cls-3" x="30.02" y="166.11" width="29.09" height="61.92"/>
        <path id="fill_arrow" class="cls-2" d="M203.59,7.55c-1.21,4.96-6.89,35.56-9.34,37.11-4.58,2.88-6.53-9.93-13.44-7.87-1.38.41-15.17,13.5-18.05,15.76-28.4,22.31-61.13,40.52-94.96,53.28-4.89,1.85-28.31,10.19-31.66,9.66-3.25-.51-3.63-7.44-4.24-10.37,43.61-10.6,86.52-32.06,121.89-59.66,2.59-2.02,19.22-15.64,19.64-16.99,1.81-5.85-8.24-9.09-9.23-14.35l39.4-6.57Z"/>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.icon_wrap { width: 50px; height: 50px;}
.icon_ws{
  width: 100%;
  height: auto;
  display: block;

  --stroke: #010202;
  --blue: #0c90c7;
  --cyan: #00d9ea;
  --yellow: #ffc500;
  --red: #ff5a5f;
}

:deep(.cls-1) { fill: var(--stroke); }
:deep(.cls-2) { fill: var(--blue); }
:deep(.cls-3) { fill: var(--cyan); }
:deep(.cls-4) { fill: var(--yellow); }
:deep(.cls-5) { fill: var(--red); }

</style>