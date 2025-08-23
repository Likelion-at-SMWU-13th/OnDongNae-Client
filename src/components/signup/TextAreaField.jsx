import React from 'react'
import styled from 'styled-components'

function TextAreaField({ placeholder = '', value, onChange }) {
  return (
    <TextArea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      required
    />
  )
}

export default TextAreaField

const TextArea = styled.textarea`
  width: 100%;
  height: 246px;
  padding: 20px;
  color: black;
  border-radius: 10px;
  border: 1px solid #e4e4e4;
  background: #fff;
  font-size: 18px;
  line-height: 1.4;
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    color: #7c7c7c;
    font-size: 18px;
    font-weight: 400;
  }
`
