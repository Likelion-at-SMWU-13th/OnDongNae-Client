// src/components/hours/TimePickerModal.jsx
import React from 'react'
import styled from 'styled-components'

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
        <div style={{ fontWeight: 600, fontSize: '18px', padding: '8px 10px' }}>{title}</div>
        <Row>
          <Sel value={hour} onChange={(e) => handleHourChange(e.target.value)}>
            {hourOptions.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Sel>
          <Hours>시</Hours>
          <Sel value={minute} onChange={(e) => onChange({ ...value, minute: e.target.value })}>
            {minuteOptions.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Sel>
          <Mins>분</Mins>
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          <BackBtn onClick={onCancel}>취소</BackBtn>
          <TimeBtn onClick={onConfirm}>확인</TimeBtn>
        </Row>
      </Sheet>
    </Backdrop>
  )
}

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
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-top: 20px;
  justify-content: center;
`
const Sel = styled.select`
  padding: 8px 12px;
  font-size: 16px;
  border: solid 1px #f08e67;
  border-radius: 10px;
`
const TimeBtn = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  background-color: #f08e67;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  margin-right: 10px;
`
const BackBtn = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  color: #fff;
  background-color: #d6d6d6;
  font-weight: 600;
  margin-left: 10px;
`
const Mins = styled.p`
  font-size: 15px;
`
const Hours = styled.p`
  font-size: 15px;
`
