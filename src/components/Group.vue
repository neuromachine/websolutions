<script setup>
import { onMounted, watch } from "vue";
import catClass from "@/components/blocks/services/catClass.vue";
import item from "@/components/blocks/services/presentation/item.vue"
import service from "@/components/blocks/services/presentation/service.vue"
import content from "@/components/blocks/services/presentation/content.vue"
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
  <section class="py-[100px]">

    <div v-if="dataStore.isCatReady" class="container">

      <content
        :content="dataStore.category.content"
      />

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
<!--        <item v-for="item in dataStore.category.blocks[0].items"
              :slug="item.key"
              :name="item.name"
              :properties="item.properties"
        />-->
        <service v-for="(item, index) in dataStore.category.blocks[0].items"
              :slug="item.key"
              :name="item.name"
              :index="index"
                 :owner="dataStore.category"
              :properties="item.properties"
        />
      </div>

    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>

</template>
