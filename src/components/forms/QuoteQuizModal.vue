<script setup>
import AppModal from '@/components/ui/AppModal.vue';
import QuoteQuizForm from './QuoteQuizForm.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <AppModal v-if="isOpen" @close="handleClose">
    <template #header>
      <h3 class="modal-title">Оформление заявки</h3>
    </template>
    <template #default>
      <QuoteQuizForm @close="handleClose" />
    </template>
  </AppModal>
</template>

<style scoped>
.modal-title {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}
</style>
