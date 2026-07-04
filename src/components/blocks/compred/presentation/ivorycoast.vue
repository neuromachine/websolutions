<script setup>
import qrcode from "@/components/blocks/general/ui/qrcode.vue";
</script>

<template>
  <section>
    <div class="container">
      <qrcode
          url="https://www.wspro.xyz/vi/compred/ivorycoast"
          :size="150"
          foreground-color="#2c3e50"
      />
    </div>
  </section>
</template>
