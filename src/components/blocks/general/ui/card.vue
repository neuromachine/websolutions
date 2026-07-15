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
      <slot>
        <slot name="text"></slot>
      </slot>
    </div>
    <div v-if="$slots.action" class="ui-card__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style scoped>
/* custom styles */
.ui-card {
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
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
  padding: 0 1rem 1rem 1.5rem;
  color: #5f5f5f;
  flex: 1 1 auto;
}
.ui-card__action {
  padding: 0 1rem 1.5rem 1.5rem;
  margin-top: auto;
}

@media (min-width: 768px) {
  .ui-card__action {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
  }
  .ui-card:hover .ui-card__action,
  .ui-card:focus-within .ui-card__action {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
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
  .ui-card__action {
    padding: 0 0.8rem 1rem 1rem;
  }
}
</style>