<script setup>

</script>


<template>
    <div class="logo_wrap">
      <img src="/assets/img/logo.png" alt="logo" class="white"><img src="/assets/img/logo-black.png" alt="logo" class="black">
    </div>
</template>


<style scoped>
.logo_wrap { font-size: 0; line-height: 0; display: block}
.logo_wrap .white{ display: block}
.index-navber .logo_wrap .white{ display: none}
.logo_wrap .black{ display: none}
.index-navber .logo_wrap .black{ display: block}
.is-sticky .logo_wrap  .white {display: none}
.is-sticky .logo_wrap  .black { display: block}
</style>
