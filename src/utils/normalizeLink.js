export function normalizeLink(rawLink, knownScopes) {
    // убираем ведущий /
    let path = rawLink.replace(/^\//, '')
    // убираем scope-префикс если он там есть
    for (const scope of knownScopes) {
        if (path.startsWith(scope + '/')) {
            path = path.slice(scope.length + 1)
            break
        }
        if (path === scope) {
            path = ''
            break
        }
    }
    return '/' + path  // возвращаем чистый путь: /portfolio, /services, /
}