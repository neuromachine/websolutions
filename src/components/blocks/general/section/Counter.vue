<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import CounterUp from "counterup2"; //https://github.com/bfintal/Counter-Up2

const props = defineProps({
  list: {
    type: Object,
    required: true
  },
})

const counterRefs = ref([]); // Массив ссылок на все счетчики

const counters = computed(() => {
  const items = props.list.items || [];
  return items.map((item) => ({
    value: item.title,
    label: item.descr,
  }));
});

onMounted(() => {
  const instance = getCurrentInstance();
  const Waypoint = instance.appContext.config.globalProperties.$Waypoint;

  if (!Waypoint) return;

  counterRefs.value.forEach((counter) => {
    new Waypoint({
      element: counter,
      handler: function () {
        CounterUp(counter, { duration: 1000, delay: 16 });
        this.destroy(); // Удаляем Waypoint после анимации
      },
      offset: "75%",
    });
  });
});
</script>

<template>
  <!-- Start Counter Section -->
  <section class="counter-area section-padding">
    <div class="container">
      <div class="row">
        <div v-for="(item, index) in counters" :key="index" class="col-lg-3 col-md-6 counter-item">
          <div class="single-counter">
            <div class="counter-contents">
              <h2>
                <span ref="counterRefs" class="counter-number">{{ item.value }}</span>
                <span>+</span>
              </h2>
              <h3 class="counter-heading">{{ item.label }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Counter Section -->
</template>


<style scoped>

</style>
