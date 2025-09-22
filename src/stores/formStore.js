import { defineStore } from 'pinia'
import { useUiStore } from '@/stores/uiStore'
import formService from '@/services/formService'

export const useFormStore = defineStore('formStore', {
    state: () => ({
        forms: {},
    }),
    actions: {
        async submitForm(formKey, data) {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()

            this.forms[formKey] = { status: 'loading', response: null }
            try {
                const response = await formService.sendForm({
                    formKey,
                    data,
                    meta: { ip: '127.0.0.1' },
                })
                this.forms[formKey] = { status: 'success', response }
            } catch (err) {
                this.forms[formKey] = { status: 'error', response: err }
            } finally {
                uiStore.stopGlobalLoading()
            }
        },
    },
})
