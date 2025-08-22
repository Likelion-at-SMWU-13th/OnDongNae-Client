// src/utils/time.js

// "HH:MM" → { hour:"HH", minute:"MM" }
export function hhmmToPicker(hhmm) {
  if (!hhmm) return { hour: '00', minute: '00' }
  const [h, m] = hhmm.split(':').map(Number)
  return {
    hour: String(h).padStart(2, '0'),
    minute: String(m).padStart(2, '0'),
  }
}

// { hour:"HH", minute:"MM" } → "HH:MM"
// (24:00 허용. 그 외에는 00~23:59)
export function pickerToHhmm({ hour, minute }) {
  const h = String(Number(hour)).padStart(2, '0')
  const m = String(Number(minute)).padStart(2, '0')
  return `${h}:${m}`
}
