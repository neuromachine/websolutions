<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
  list: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <!-- Start Services Two Section -->
  <section class="services-section-two section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">{{props.list.subtitle}}</h6>
            <h2>{{props.list.title}}</h2>
          </div>
        </div>
        <div v-for="(item, index) in props.list.items" class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img :src="item.icon" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img :src="item.icon_h" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>{{item.title}}</h3>
              <p>{{item.descr}}</p>
              <div class="services-btn">
                <RouterLink :to="item.link" class="read-more"><i class="bi bi-arrow-right-short"></i> {{ t('ui.more')}}</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Two Section -->
</template>

<style scoped>

</style>