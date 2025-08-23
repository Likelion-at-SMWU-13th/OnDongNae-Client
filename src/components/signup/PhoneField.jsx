import React from 'react'
import styled from 'styled-components'

function PhoneField({
  label = '',
  placeholder,
  value = '',
  onChange = (v) => {},
  required = false,
}) {
  const formatPhone = (v) => {
    const dRaw = v.replace(/\D/g, '') // 숫자만

    if (!dRaw) return ''

    // 1. 02로 시작
    if (dRaw.startsWith('02')) {
      // 02 + 최대 8자리 (총 10자리까지)
      const rest = dRaw.slice(2, 10)
      if (rest.length === 0) return '02'
      if (rest.length <= 3) return `02-${rest}`
      if (rest.length <= 7) {
        return `02-${rest.slice(0, rest.length - 4)}-${rest.slice(-4)}`
      }
      return `02-${rest.slice(0, 4)}-${rest.slice(4, 8)}`
    }

    // 2. 050으로 시작할 때(0507)
    if (dRaw.startsWith('050')) {
      const d = dRaw.slice(0, 12)
      if (d.length <= 4) return d
      if (d.length <= 8) return `${d.slice(0, 4)}-${d.slice(4)}`
      return `${d.slice(0, 4)}-${d.slice(4, 8)}-${d.slice(8, 12)}`
    }

    // 3. 01 로 시작할 때
    if (/^01[016789]/.test(dRaw)) {
      const d = dRaw.slice(0, 11)
      if (d.length <= 3) return d
      if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`
      return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`
    }

    // 4. 그 외 지역번호 일 때
    if (/^0[2-9]\d/.test(dRaw)) {
      const d = dRaw.slice(0, 11) // 10 or 11자리
      if (d.length <= 3) return d
      if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`
      if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 10)}` // 3-3-4
      return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}` // 3-4-4
    }

    // 5. 기타 -> 3-4-4 포맷
    const d = dRaw.slice(0, 11)
    if (d.length <= 3) return d
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`
  }

  const handleChange = (e) => {
    onChange(formatPhone(e.target.value))
  }

  return (
    <Container>
      {label && <Text>{label}</Text>}
      <Input
        type='tel'
        inputMode='numeric' // 모바일 숫자 키패드
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={14} // 최대 14자리
        required={required}
      />
    </Container>
  )
}

export default PhoneField

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Text = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Input = styled.input`
  width: 100%;
  height: 49px;
  color: black;
  border-radius: 10px;
  border: 2px solid #b3b3b3;
  background: #fff;
  padding: 14px 0 14px 20px;
  font-size: 18px;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }
`
