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


<!--      <div v-if="blockStore.isHaveSubCat" class="row groups_list">-->
      <div v-if="blockStore.isHaveSubCategories" class="row groups_list">
        <div v-for="(item, index) in blockStore.category.subcategories" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.slug
              :name=item.title
              :descr=item.descr
              :childs=item.childs
          />
        </div>
      </div>

      <template v-if="blockStore.isHaveItems">
        <template v-for="block in blockStore.category.blocks" :key="block.key || block.id">
          <div v-if="block.items && Object.keys(block.items).length" class="row items_list">
            <service v-for="(item, index) in block.items"
                  :key="item.key"
                  :slug="item.key"
                  :name="item.name"
                  :index="index"
                  :owner="blockStore.category"
                  :properties="item.properties"
            />
          </div>
        </template>
      </template>

    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>

</template>
