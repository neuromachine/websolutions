<script setup>
import catClass from "@/components/blocks/services/catClass.vue";
import item from "@/components/blocks/services/presentation/item.vue"
import service from "@/components/blocks/services/presentation/service.vue"
import content from "@/components/blocks/services/presentation/content.vue"

import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
// const { blockStore, navigationStore } = usePageOrchestrator('group', 'structure+category', {
const { blockStore } = usePageOrchestrator('group', 'category', {
  fetch: (route) => route.params.slug
})
</script>

<template>
  <section class="service_section">

    <div v-if="blockStore.isCatReady" class="container">

      <content
        :content="blockStore.category.content.content"
      />

      <div v-if="blockStore.isHaveSubCat" class="row groups_list">
        <div v-for="(item, index) in blockStore.category.children" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>

      <div v-if="blockStore.isHaveItems" class="row items_list">
<!--        <item v-for="item in blockStore.category.blocks[0].items"
              :slug="item.key"
              :name="item.name"
              :properties="item.properties"
        />-->
        <service v-for="(item, index) in blockStore.category.blocks[0].items"
              :slug="item.key"
              :name="item.name"
              :index="index"
                 :owner="blockStore.category"
              :properties="item.properties"
        />
      </div>

    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>

</template>
