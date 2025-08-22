import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  display: inline-flex;
  width: 100%;
  height: 246px;
  padding: 20px;
  align-items: center;
  flex-shrink: 0;

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

    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`

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
