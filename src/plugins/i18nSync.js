import { watch } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { i18n } from '@/i18n'

export function setupI18nSync(pinia) {

    const uiStore = useUiStore(pinia)

    watch(
        () => uiStore.currentLocale,
        (locale) => {
            console.log("\u{1F232} i18n plugin watcher: ",locale);
            i18n.global.locale.value = locale
        },
        { immediate: true }
    )

}