import React from 'react'
import styled from 'styled-components'

function TextField({ placeholder = '', value, onChange }) {
  return (
    <Input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      required
    />
  )
}

export default TextField

const Input = styled.input`
  width: 100%;
  height: 49px;
  color: black;
  border-radius: 10px;
  border: 2px solid #b3b3b3;
  background: #fff;
  padding: 14px 20px;
  font-size: 18px;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }
`
