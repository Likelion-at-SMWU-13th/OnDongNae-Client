import React, { useState } from 'react'
import styled from 'styled-components'

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

function PhoneField({
  label = '',
  placeholder,
  value = '',
  onChange = (v) => {},
  required = false,
}) {
  // 포맷 규칙:
  // 02로 시작하면: 02-(3 or 4)-(4)
  // 그 외 기본(모바일 등): 3-4-4
  const formatPhone = (v) => {
    const dRaw = v.replace(/\D/g, '') // 숫자만
    // 02로 시작하는 번호 처리
    if (dRaw.startsWith('02')) {
      const rest = dRaw.slice(2, 10) // 지역번호 뒤 최대 8자리
      if (rest.length === 0) return '02' // '02'만 입력 중
      if (rest.length <= 3) return `02-${rest}`
      if (rest.length <= 7) {
        // 02-<1~3>-<마지막 4>
        return `02-${rest.slice(0, rest.length - 4)}-${rest.slice(-4)}`
      }
      // rest가 8자리 이상이면 4-4로 고정
      return `02-${rest.slice(0, 4)}-${rest.slice(4, 8)}`
    }

    // 3-4-4
    const d = dRaw.slice(0, 11) // 최대 11자리
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
        maxLength={13} // 13자리
        required={required}
      />
    </Container>
  )
}

export default PhoneField
