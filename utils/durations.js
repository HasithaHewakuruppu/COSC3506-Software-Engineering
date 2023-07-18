// For converting database millisecond durations into desired time format

export function asHours(duration) {
  return duration / 3600000
}
