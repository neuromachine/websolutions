import { defineStore } from 'pinia';
import { useDataStore} from '@/stores/dataStore.js';

export const useUiStore = defineStore('UiStore', {
    state: () => ({
        isGlobalLoading: false,
        isOpen: false, // status of Expand Menu
    }),
    getters:{
        getGlobalLoading(state) {
            const dataStore = useDataStore();
            return state.isGlobalLoading || dataStore.getLoadingStatus; // Комбинируем состояния: если хоть где-то загрузка, возвращаем true
        }
    },
    actions: {
        setIsOpen(value) {
            this.isOpen = value
        },
        setGlobalLoading(value) {
            this.isGlobalLoading = value;
        },
        startGlobalLoading() {
            this.isGlobalLoading = true;
        },
        stopGlobalLoading() {
            this.isGlobalLoading = false;
        },
        setup() {
            const dataStore = useDataStore();
            // Подписываемся на изменения isLoading в dataStore
            watch(
                () => dataStore.isLoading,
                (newValue) => {
                    this.isGlobalLoading = newValue; // Обновляем состояние UiStore
                }
            );
        }
    }
});