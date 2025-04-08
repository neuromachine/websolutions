import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({
        isOpen: false // Начальное состояние — меню закрыто
    }),
    actions: {
        setIsOpen(value) {
            this.isOpen = value; // Метод для изменения состояния
        }
    }
});