// src/components/hours/TimePickerModal.jsx
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Picker from 'react-mobile-picker'

const SCROLL_MS = 200

export default function TimePickerModal({
  title = '시간 선택',
  value, // { hour: '00'~'24', minute: '00'~'59' } (24시는 '00'만)
  onChange, // (next: {hour, minute}) => void
  onCancel, // () => void
  onConfirm, // () => void
  accentColor = '#F08E67',
  backdropDark = 'rgba(0,0,0,0.45)',
  minuteStep = 5,
}) {
  const safe = useMemo(() => normalize(value), [value?.hour, value?.minute])

  // 내부 선택 상태는 Picker의 요구 형태({ hour, minute }) 그대로 사용
  const [pickerValue, setPickerValue] = useState({
    hour: safe.hour,
    minute: safe.minute,
  })

  // 외부 value 변경 → 내부 동기화
  useEffect(() => {
    setPickerValue({ hour: safe.hour, minute: safe.minute })
  }, [safe.hour, safe.minute])

  // 옵션 생성
  const hourOptions = useMemo(() => Array.from({ length: 25 }, (_, i) => pad2(i)), [])
  const minuteOptions = useMemo(
    () => (pickerValue.hour === '24' ? ['00'] : Array.from({ length: 60 }, (_, i) => pad2(i))),
    [pickerValue.hour],
  )

  // Picker 변경 처리
  const handlePickerChange = (next, changedColumn) => {
    // next: { hour, minute }
    let { hour, minute } = next
    if (changedColumn === 'hour' && hour === '24') {
      minute = '00' // 24시는 분 고정
    }
    const normalized = normalize({ hour, minute })
    setPickerValue(normalized)
    onChange?.(normalized) // 즉시 상위에 반영(기존 연동 유지)
  }

  const handleConfirm = () => {
    onChange?.(normalize(pickerValue))
    onConfirm?.()
  }

  return (
    <Backdrop $bg={backdropDark} onClick={onCancel}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeadBtn $muted onClick={onCancel}>
            취소
          </HeadBtn>
          <Title>{title}</Title>
          <HeadBtn $accent={accentColor} onClick={handleConfirm}>
            확인
          </HeadBtn>
        </Header>

        <Body>
          <PickerWrap $accent={accentColor}>
            <Picker
              value={pickerValue}
              onChange={handlePickerChange}
              wheelMode='normal' // 기본 휠 모드 (라이브러리 기본값)
              height={180} // 전체 픽커 높이
              itemHeight={36} // 항목 높이
              className='timepicker'
              scrollDuration={SCROLL_MS}
            >
              <Picker.Column name='hour'>
                {hourOptions.map((h) => (
                  <Picker.Item key={h} value={h}>
                    {h}
                  </Picker.Item>
                ))}
              </Picker.Column>

              {/* 가운데 콜론 */}
              <Colon>:</Colon>

              <Picker.Column name='minute'>
                {minuteOptions.map((m) => (
                  <Picker.Item key={m} value={m}>
                    {m}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </PickerWrap>

          {/* 선택 라인 하이라이트 */}
          <CenterBar $accent={accentColor} />
        </Body>
      </Sheet>
    </Backdrop>
  )
}

/* ---------- utils ---------- */
const pad2 = (v) => String(v).padStart(2, '0')
function normalize(v = {}) {
  const h = pad2(v.hour ?? '00')
  const m = pad2(v.minute ?? '00')
  return h === '24' ? { hour: '24', minute: '00' } : { hour: h, minute: m }
}

/* ---------- styled ---------- */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  z-index: 1000;
`
const Sheet = styled.div`
  width: 320px;
  border-radius: 14px;
  overflow: hidden;
  background: #262626;
  color: #000000;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.5);
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  background: #ffffff;
`
const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  opacity: 0.9;
`
const HeadBtn = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: ${({ $muted, $accent }) => ($muted ? '#b3b3b3' : $accent || '#F08E67')};
`
const Body = styled.div`
  position: relative;
  padding: 16px 14px 18px;
  background: #ffffff;
`
const PickerWrap = styled.div`
  position: relative;
  .timepicker {
    margin: 0 auto;
    width: 100%;
  }

  /* 라이브러리 기본 클래스 커스터마이즈(버전별 클래스가 다를 수 있어 최소 오버라이드) */
  .timepicker .rmc-picker-column-item {
    font-size: 20px;
    color: #cfcfcf;
  }
  .timepicker .rmc-picker-column-item--selected {
    color: ${({ $accent }) => $accent};
    font-weight: 800;
  }
`
const Colon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 20px;
  font-weight: 700;
  opacity: 0.7;
`
const CenterBar = styled.div`
  position: absolute;
  left: 14px;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 77, 0, 0.2);
  outline: 2px solid ${({ $accent }) => $accent};
  outline-offset: -2px;
  pointer-events: none;
`
