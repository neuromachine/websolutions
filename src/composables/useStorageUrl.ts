export const useStorageUrl = () => {
    const storageBase = import.meta.env.VITE_STORAGE_URL || '';

    // Убираем слеш в конце, если есть
    const base = storageBase.replace(/\/$/, '');

    const getStorageUrl = (path: string): string => {
        if (!path) return '';
        // Если путь уже начинается с http/https — возвращаем как есть
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return `${base}/storage/${path.replace(/^\//, '')}`;
    };

    return { getStorageUrl };
};