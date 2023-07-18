import categories from './categories'

export const LEISURE_COLOR = '#fde68a'
export const WORK_COLOR = '#bfdbfe'
export const FITNESS_COLOR = '#bbf7d0'

export function colorOfCategory(category) {
  if (category === categories.FITNESS) return FITNESS_COLOR
  else if (category === categories.WORK) return WORK_COLOR
  else if (category === categories.LEISURE) return LEISURE_COLOR
  else return '#0000'
}
