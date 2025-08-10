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
  width: 304px;
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

function PhoneField({ value = '', onChange = (v) => {} }) {
  // 3-4-4로 하이픈
  const formatPhone = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 11) // 숫자만, 최대 11자리
    if (d.length <= 3) return d
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`
  }

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value)
    onChange(formatted) // 부모 setter 호출
  }
  return (
    <Container>
      <Text>휴대폰 번호</Text>
      <Input
        type='tel'
        inputMode='numeric' // 모바일 숫자 키패드
        placeholder='010-0000-0000'
        value={value}
        onChange={handleChange}
        maxLength={13} // 13자리
        required
      />
    </Container>
  )
}

export default PhoneField
