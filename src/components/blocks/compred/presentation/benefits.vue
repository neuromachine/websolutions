<script setup>
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <!-- presentation component start -->
  <section class="cards_block">
    <div class="container">
      <header class="cards_block__header text-center">
        <p class="cards_block__subtitle">
          {{ props.data.pretitle }}
        </p>
        <h2 class="cards_block__title">
          {{ props.data.title }}
        </h2>
      </header>
      <div class="row row-cols-2 row-cols-lg-4  align-items-stretch">
        <div class="d-flex col"  v-for="item in props.data.items" :key="item.title">
          <div class="card mb-4">
            <div class="card-header"><IconOffer :index="item.index" :properties="item" />{{ item.title }}</div>
            <div class="card-body">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- presentation component end -->
</template>

<style scoped>
/* redefinition base bootstrap styles */
.card { border: none;}
.card-header { background-color: transparent; border: none; }
/* custom styles */
.cards_block {padding: 100px 0;}
.cards_block__header {margin-bottom: 2rem;}
.cards_block__subtitle {
  color: #ff9800;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}
.cards_block__title {
  color: #404040;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
}
.card {box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);}

@media (max-width: 767px) {
  .cards_block__subtitle {
    font-size: 0.8rem;
  }
  .cards_block__title {
    font-size: 1.5rem;
  }
}
</style>