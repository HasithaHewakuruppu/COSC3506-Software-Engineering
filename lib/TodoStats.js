// The purpose of this class is to calculate statistics from a list of todo objects.
import { asHours } from '../utils/durations'

export default class TodoStats {
  constructor(todos) {
    this.stats = TodoStats.parseTodoArray(todos)
  }

  static parseTodoArray(todos) {
    let stats = {}
    for (let todo of todos) {
      let {
        duration,
        label: { category, name },
      } = todo
      duration = asHours(duration)
      if (!(category in stats)) {
        stats = { ...stats, [category]: { [name]: duration } }
      } else if (!(name in stats[category])) {
        stats[category] = { ...stats[category], [name]: duration }
      } else {
        stats[category][name] += duration
      }
    }
    return stats
  }

  getDurationsByCategory() {
    return this.stats
  }

  getDurationsByUpperCategory() {
    let durationsByCategory = {}
    for (let category of Object.keys(this.stats)) {
      durationsByCategory[category] = Object.values(
        this.stats[category]
      ).reduce((a, b) => a + b, 0)
    }
    return durationsByCategory
  }
}
