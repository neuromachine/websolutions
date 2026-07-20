/**
 * Resolves responsive bootstrap grid classes based on item count.
 * @param {number} count Number of items in the grid
 * @returns {string} Bootstrap row-cols-* class string
 */
export function getCardGridClasses(count) {
  if (typeof count !== 'number' || count <= 0) {
    return 'row-cols-1'
  }

  if (count === 1) return 'row-cols-1 row-cols-lg-1'
  if (count === 2) return 'row-cols-1 row-cols-md-2 row-cols-lg-2'
  if (count === 3) return 'row-cols-1 row-cols-md-2 row-cols-lg-3'
  if (count === 4) return 'row-cols-1 row-cols-md-2 row-cols-lg-4'
  if (count === 5) return 'row-cols-1 row-cols-md-2 row-cols-lg-5 justify-content-center'
  if (count === 6) return 'row-cols-1 row-cols-md-2 row-cols-lg-3'
  
  return 'row-cols-1 row-cols-md-2 row-cols-lg-4'
}
