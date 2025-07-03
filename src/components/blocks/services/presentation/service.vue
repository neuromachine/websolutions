<script setup>
import Icon from "@/components/blocks/services/micro/icon.vue";

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  properties: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <div class="col-lg-3 col-md-6">
    <div class="service">
      <div class="icon">
        <Icon
            :slug="props.slug"
        />
      </div>
      <div class="title">
        Лэндинг пейдж – Старт
      </div>
      <div class="descr">
        Для быстрого запуска и теста ниши
      </div>
      <div class="price roboto">
        от <span class="sofia_bold">15 000</span> ₽
      </div>
      <div class="term roboto">
        срок <span class="sofia_bold">от 1 до 2 недель</span>
      </div>
      <ul class="conditions">
        <li>Адаптивность</li>
        <li>Базовые функции</li>
        <li>Одно изменение ТЗ</li>
      </ul>
      <div class="b_wrap">
        <RouterLink class="know_price" :to="{ path: '/blocks/item/' + props.key }">Узнать точную цену</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: #000;
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
}
  .service .icon { width: 50px; height: 50px;}
  .service .title { font-size: 16px; font-weight: bold; margin: 16px 0 16px 0;}
  .service .descr { font-size: 14px; line-height: 17px; color: #5F5F5F; margin: 0 0 16px 0;}
  .service .roboto { font-family: Roboto, "Helvetica Neue", sans-serif; font-size: 11px; line-height: 22px; margin: 0 0 16px 0;}
    .service .sofia_bold { font-family: "Sofia Sans", sans-serif; font-size: 18px; font-weight: bold; margin: 0 10px 0 10px;}
  .service .conditions { padding: 0 0 0 16px; color: #5F5F5F;}
    .service .conditions li { margin: 4px 0 4px 0; list-style: disc;}
  .service .b_wrap {  display: flex; margin: 16px 0 0 0;}
  .service .know_price { color: #00D9EA; border: solid 1px #00D9EA; border-radius: 4px; padding: 18px 14px;}
  .service .know_price:hover { background-color: #00D9EA; color: #FFF; }
</style>