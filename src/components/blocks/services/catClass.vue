<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  childs: {
    type: Array,
    required: false
  },
})
</script>

<template>
  <div class="single-services-two-item">
    <div class="services-icon-box">
      <div class="default-icon">
        <img src="/assets/img/icon/services-icon-1.svg" alt="svg icon">
      </div>
      <div class="hover-icon">
        <img src="/assets/img/icon/services-icon-hover-1.svg" alt="svg icon">
      </div>
    </div>
    <div class="services-two-content">
      <h3>{{props.name}}</h3>
      <p>{{props.descr}}</p>
      <ul v-if="props.childs && props.childs?.length" class="list_services">
        <li v-for="(schild, indexS) in props.childs" :key="indexS">
          <RouterLink :to="{ path: '/group/' + schild.key }">{{schild.name}}</RouterLink>
        </li>
      </ul>
      <div class="services-btn">
        <RouterLink class="read-more" :to="{ path: '/group/' + props.slug }"><i class="bi bi-arrow-right-short"></i> Подробнее</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list_services {
  padding: 5px 0;
  /*  border-top: 2px solid #e6e5f1;
    border-bottom: 2px solid #e6e5f1;*/
  margin-bottom: 20px;
}

.list_services  li  {
  position: relative;
  color: #5f5f5f;
  font-size: 16px;
  padding-left: 20px;
  margin: 10px 0;
}

.list_services li:before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  background-color: #7b68ee;
}

</style>