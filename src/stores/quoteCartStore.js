import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useQuoteCartStore = defineStore('quoteCart', () => {
  const items = ref([]);
  const isCartOpen = ref(false);

  const addItem = (calcPackage) => {
    // Check if the exact package already exists to just increment quantity
    const existing = items.value.find(i => i.packageKey === calcPackage.key);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.value.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        packageKey: calcPackage.key,
        title: calcPackage.title,
        description: calcPackage.description,
        quantity: 1,
        basePrice: calcPackage.basePrice,
        isPriceEstimated: calcPackage.isPriceEstimated,
        currency: calcPackage.currency,
        timeline: calcPackage.timeline,
        timelineUnit: calcPackage.timelineUnit,
        options: calcPackage.options, // read-only features
        notes: '' // User specific notes
      });
    }
    isCartOpen.value = true;
  };

  const removeItem = (id) => {
    items.value = items.value.filter(i => i.id !== id);
  };

  const updateQuantity = (id, newQuantity) => {
    const item = items.value.find(i => i.id === id);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
    }
  };

  const updateNotes = (id, newNotes) => {
    const item = items.value.find(i => i.id === id);
    if (item) {
      item.notes = newNotes;
    }
  };

  const toggleCart = (state) => {
    isCartOpen.value = state !== undefined ? state : !isCartOpen.value;
  };

  const clearCart = () => {
    items.value = [];
  };

  const estimatedTotal = computed(() => {
    let total = 0;
    let hasEstimates = false;

    items.value.forEach(item => {
      total += (item.basePrice * item.quantity);
      if (item.isPriceEstimated || item.basePrice === 0) {
        hasEstimates = true;
      }
    });

    return {
      value: total,
      hasEstimates
    };
  });

  // Assume currency matches across items for MVP
  const cartCurrency = computed(() => {
    if (items.value.length > 0) {
      return items.value[0].currency;
    }
    return null;
  });

  return { 
    items, 
    isCartOpen, 
    addItem, 
    removeItem, 
    updateQuantity,
    updateNotes,
    toggleCart, 
    clearCart,
    estimatedTotal,
    cartCurrency
  };
});
