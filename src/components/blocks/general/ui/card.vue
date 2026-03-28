<script setup>

</script>
<template>
  <div class="ui-card">
    <div class="ui-card__header">
      <div class="ui-card__header-inner">
        <div class="ui-card__icon">
          <slot name="icon"></slot>
        </div>
        <div class="ui-card__title">
          <slot name="title"></slot>
        </div>
      </div>
    </div>
    <div class="ui-card__body">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<style scoped>
/* custom styles */
.ui-card {
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
}
.ui-card__header {
  padding: 1rem 1rem 1rem 1.5rem;
}
.ui-card__header-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}
.ui-card__icon {
  flex: 0 0 auto;
}
.ui-card__title {
  flex: 1 1 auto;
  font-size: 1rem;
  font-weight: bold;
}
.ui-card__body {
  padding: 0 1rem 2rem 1.5rem;
  color: #5f5f5f;;
}
@media (max-width: 767px) {
  .ui-card__header {
    padding: 0.8rem;
  }
  .ui-card__header-inner {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  .ui-card__icon {
    flex: auto;
  }
  .ui-card__title {
    flex: auto;
    text-align: center;
  }
  .ui-card__body {
    padding: 0 0.8rem 0.8rem 1rem;
  }
}
</style>