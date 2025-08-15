// src/components/hours/TimePickerModal.jsx
import React from 'react'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`
const Sheet = styled.div`
  width: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const Row = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`
const Sel = styled.select`
  padding: 8px 12px;
  font-size: 16px;
`

export default function TimePickerModal({
  title = '시간 선택',
  value, // { hour, minute }
  onChange, // (next) => void
  onCancel, // () => void
  onConfirm, // () => void
}) {
  const { hour, minute } = value

  // 00..24 (24시는 분을 00만 허용)
  const hourOptions = Array.from({ length: 25 }, (_, i) => String(i).padStart(2, '0'))
  const minuteOptions =
    hour === '24' ? ['00'] : Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  const handleHourChange = (h) => {
    if (h === '24' && minute !== '00') {
      onChange({ ...value, hour: h, minute: '00' })
    } else {
      onChange({ ...value, hour: h })
    }
  }

  return (
    <Backdrop onClick={onCancel}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <Row>
          <Sel value={hour} onChange={(e) => handleHourChange(e.target.value)}>
            {hourOptions.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Sel>
          <Sel value={minute} onChange={(e) => onChange({ ...value, minute: e.target.value })}>
            {minuteOptions.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Sel>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <button onClick={onCancel}>취소</button>
          <button onClick={onConfirm}>확인</button>
        </Row>
      </Sheet>
    </Backdrop>
  )
}
