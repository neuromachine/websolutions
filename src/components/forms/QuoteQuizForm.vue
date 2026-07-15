<script setup>
import { ref, computed } from 'vue';
import { useFormStore } from '@/stores/formStore';
import { useQuoteCartStore } from '@/stores/quoteCartStore';
import quoteQuizSchema from '@/schemas/quoteQuizForm';

const emit = defineEmits(['close']);

const store = useFormStore();
const cartStore = useQuoteCartStore();

const currentStep = ref(1);
const totalSteps = 4;

const formData = ref({
  projectType: '',
  goal: '',
  urgency: '',
  budgetRange: '',
  existingAssets: '',
  contactName: '',
  contactEmail: '',
  comment: ''
});

const submitStatus = computed(() => store.forms['quote_quiz']?.status || null);
const isSubmitting = computed(() => submitStatus.value === 'loading');

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSubmit = async () => {
  // Validate strictly required fields
  if (!formData.value.contactName || !formData.value.contactEmail) {
    alert("Пожалуйста, заполните имя и контактные данные.");
    return;
  }

  const payload = {
    ...formData.value,
    cartItems: cartStore.items,
    estimatedTotal: cartStore.estimatedTotal.value
  };

  try {
    await store.submitForm('quote_quiz', payload);
    // Success handled by formStore, clear cart
    cartStore.clearCart();
  } catch (err) {
    console.error("Quiz submission failed", err);
  }
};
</script>

<template>
  <div class="quote-quiz">
    <div v-if="submitStatus === 'success'" class="success-state">
      <h3>Спасибо за вашу заявку!</h3>
      <p>Мы получили ваш запрос и свяжемся с вами в ближайшее время для обсуждения деталей.</p>
      <button @click="emit('close')" class="btn-primary">Закрыть</button>
    </div>
    
    <div v-else>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
      </div>
      <div class="step-indicator">Шаг {{ currentStep }} из {{ totalSteps }}</div>

      <form @submit.prevent="currentStep === totalSteps ? handleSubmit() : nextStep()">
        
        <!-- Step 1 -->
        <div v-show="currentStep === 1" class="step-content">
          <h4>О вашем проекте</h4>
          <div class="form-group">
            <label>Тип бизнеса / проекта</label>
            <input v-model="formData.projectType" type="text" placeholder="Например: Интернет-магазин, Корпоративный портал..." class="form-control" />
          </div>
          <div class="form-group">
            <label>Основная цель</label>
            <input v-model="formData.goal" type="text" placeholder="Увеличение продаж, автоматизация рутины..." class="form-control" />
          </div>
        </div>

        <!-- Step 2 -->
        <div v-show="currentStep === 2" class="step-content">
          <h4>Сроки и Бюджет</h4>
          <div class="form-group">
            <label>Срочность / Дедлайн</label>
            <input v-model="formData.urgency" type="text" placeholder="Как можно скорее, через месяц..." class="form-control" />
          </div>
          <div class="form-group">
            <label>Ориентировочный бюджет</label>
            <input v-model="formData.budgetRange" type="text" placeholder="До $500, гибкий..." class="form-control" />
          </div>
        </div>

        <!-- Step 3 -->
        <div v-show="currentStep === 3" class="step-content">
          <h4>Текущая инфраструктура</h4>
          <div class="form-group">
            <label>Существующие активы</label>
            <textarea v-model="formData.existingAssets" rows="3" placeholder="Уже есть домен, старый сайт, CRM система..." class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label>Дополнительные комментарии</label>
            <textarea v-model="formData.comment" rows="3" placeholder="Любые важные детали..." class="form-control"></textarea>
          </div>
        </div>

        <!-- Step 4 -->
        <div v-show="currentStep === 4" class="step-content">
          <h4>Контактные данные</h4>
          <div class="form-group">
            <label>Ваше имя <span class="required">*</span></label>
            <input v-model="formData.contactName" type="text" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Email или Телефон <span class="required">*</span></label>
            <input v-model="formData.contactEmail" type="text" required class="form-control" />
          </div>

          <div v-if="submitStatus === 'error'" class="error-msg">
            Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.
          </div>
        </div>

        <div class="form-actions">
          <button type="button" v-if="currentStep > 1" @click="prevStep" class="btn-secondary" :disabled="isSubmitting">
            Назад
          </button>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            {{ currentStep === totalSteps ? (isSubmitting ? 'Отправка...' : 'Отправить запрос') : 'Далее' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.quote-quiz {
  font-family: inherit;
}

.success-state {
  text-align: center;
  padding: 40px 20px;
}

.success-state h3 {
  color: #2e7d32;
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #eee;
  border-radius: 3px;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #00D9EA;
  transition: width 0.3s ease;
}

.step-indicator {
  font-size: 13px;
  color: #888;
  margin-bottom: 24px;
  text-align: right;
}

.step-content h4 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #00D9EA;
}

.required {
  color: #d32f2f;
}

.error-msg {
  color: #d32f2f;
  font-size: 14px;
  margin-bottom: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.btn-primary {
  background-color: #00D9EA;
  color: #fff;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-primary:hover, .btn-secondary:hover {
  opacity: 0.9;
}

.btn-primary:disabled, .btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
