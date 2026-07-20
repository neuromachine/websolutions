<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AppModal from '@/components/ui/AppModal.vue';
import PackageConfigurator from './PackageConfigurator.vue';
import { useQuoteCartStore } from '@/stores/quoteCartStore';

const emit = defineEmits(['checkout']);

const { t } = useI18n();
const cartStore = useQuoteCartStore();

const handleClose = () => {
  cartStore.toggleCart(false);
};

const handleRemove = (id) => {
  cartStore.removeItem(id);
  if (cartStore.items.length === 0) {
    handleClose();
  }
};

const handleUpdateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity);
};

const handleUpdateNotes = (id, notes) => {
  cartStore.updateNotes(id, notes);
};

const handleCheckout = () => {
  emit('checkout');
  // Usually this routes to a form or opens a checkout modal, MVP just emits.
};
</script>

<template>
  <AppModal v-if="cartStore.isCartOpen" @close="handleClose">
    <template #header>
      <h3 class="cart-title">Конфигуратор запроса (Quote Cart)</h3>
    </template>

    <template #default>
      <div v-if="cartStore.items.length === 0" class="empty-state">
        Ваша корзина запросов пуста.
      </div>
      <div v-else class="cart-items">
        <PackageConfigurator 
          v-for="item in cartStore.items" 
          :key="item.id" 
          :item="item"
          @update-quantity="handleUpdateQuantity"
          @update-notes="handleUpdateNotes"
          @remove="handleRemove"
        />
      </div>
    </template>

    <template #footer>
      <div class="cart-footer">
        <div class="totals" v-if="cartStore.items.length > 0">
          <span class="label">Ориентировочный бюджет:</span>
          <span class="value">
            {{ cartStore.estimatedTotal.hasEstimates ? 'от ' : '' }}{{ cartStore.estimatedTotal.value }} {{ cartStore.cartCurrency || t('cp.packages.currency') }}
          </span>
          <div class="disclaimer" v-if="cartStore.estimatedTotal.hasEstimates">
            * Итоговая сумма зависит от точных требований и будет рассчитана в коммерческом предложении.
          </div>
        </div>
        
        <div class="actions" v-if="cartStore.items.length > 0">
          <button class="checkout-btn" @click="handleCheckout">
            Оформить запрос
          </button>
        </div>
      </div>
    </template>
  </AppModal>
</template>

<style scoped>
.cart-title {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #888;
}

.cart-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.totals {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  text-align: right;
}

.totals .label {
  font-size: 14px;
  color: #555;
  margin-right: 8px;
}

.totals .value {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.disclaimer {
  font-size: 11px;
  color: #888;
  margin-top: 8px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.checkout-btn {
  padding: 12px 24px;
  background: #00D9EA;
  border: none;
  border-radius: 4px;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s ease;
}

.checkout-btn:hover {
  opacity: 0.9;
}
</style>
