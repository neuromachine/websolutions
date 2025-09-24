// src/stores/formStore.js
import { defineStore } from 'pinia'
import { useUiStore } from '@/stores/uiStore'
import formService from '@/services/formService'

export const useFormStore = defineStore('formStore', {
    state: () => ({
        forms: {}, // { [formKey]: { status: 'idle'|'loading'|'success'|'error', response, errors } }
    }),
    actions: {
        async submitForm(formKey, data, meta = {}) {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()

            this.forms[formKey] = { status: 'loading', response: null, errors: null }

            try {
                const res = await formService.sendForm({ formKey, data, meta })
                this.forms[formKey] = { status: 'success', response: res, errors: null }
                uiStore.stopGlobalLoading()
                return res
            } catch (err) {
                // err can be { type: 'validation', errors: {...} } or other
                this.forms[formKey] = { status: 'error', response: err.raw || err, errors: err.type === 'validation' ? err.errors : null }
                uiStore.stopGlobalLoading()

                // если это validation — пробрасываем дальше чтобы DynamicForm мог вызвать setErrors
                if (err.type === 'validation') {
                    throw err
                }
                // для остальных ошибок — бросаем общую ошибку, которую DynamicForm обработает как global
                throw err
            }
        },
    },
})
