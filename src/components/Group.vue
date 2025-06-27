<script setup>
import { onMounted, watch } from "vue";
import catClass from "@/components/blocks/services/catClass.vue";
import item from "@/components/blocks/services/presentation/item.vue"
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import {useRoute} from "vue-router";
const route = useRoute();
function load() {
  dataStore.fetchBlockCategory(route.params.slug);
}
onMounted(() => {load()});
watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        load()
      }
    }
)
</script>

<template>
  <section class="services-section section-padding">

    <div v-if="dataStore.isCatReady" class="container">

      <div class="row">
<!--        <div class="name">{{dataStore.category.name}}</div>-->
<!--        <div class="descr">{{dataStore.category.description}}</div>-->
        <div class="content" v-html="dataStore.category.content"></div>
      </div>

      <div v-if="dataStore.isHaveSubCat" class="row">
        <div v-for="(item, index) in dataStore.category.children" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>

      <div v-if="dataStore.isHaveItems" class="row">
        <item v-for="item in dataStore.category.blocks[0].items"
              :slug="item.key"
              :name="item.name"
              :properties="item.properties"
        />
      </div>

    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>

</template>

<style scoped>


</style>