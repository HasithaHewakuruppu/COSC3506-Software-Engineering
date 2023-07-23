import categories from './categories'

export const LEISURE_COLOR = '#51b896'
export const WORK_COLOR = '#e47755'
export const FITNESS_COLOR = '#a6bb3b'

export function colorOfCategory(category) {
  if (category === categories.FITNESS) return FITNESS_COLOR
  else if (category === categories.WORK) return WORK_COLOR
  else if (category === categories.LEISURE) return LEISURE_COLOR
  else return '#0000'
}
