import { defineStore } from 'pinia';
import { useCalcStore} from '@/stores/calcStore';

export const useUiStore = defineStore('UiStore', {
    state: () => ({
        isGlobalLoading: false,
        isOpen: false, // status of Expand Menu
    }),
    getters:{
        getGlobalLoading(state) {
            const calcStore = useCalcStore();
            return state.isGlobalLoading || calcStore.getLoadingStatus; // Комбинируем состояния: если хоть где-то загрузка, возвращаем true
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
            const calcStore = useCalcStore();
            // Подписываемся на изменения isLoading в CalcStore
            watch(
                () => calcStore.isLoading,
                (newValue) => {
                    this.isGlobalLoading = newValue; // Обновляем состояние UiStore
                }
            );
        }
    }
});