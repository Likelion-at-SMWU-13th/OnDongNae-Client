import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Button = styled.button`
  width: 127px;
  padding: 14.5px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  background-color: #d6d6d6;
  color: #ffffff;
  border: none;
  cursor: pointer;
`

function SmallGrayButton({ type, label, onBtnClick }) {
  return (
    <Button type={type} onClick={onBtnClick}>
      {label}
    </Button>
  )
}

export default SmallGrayButton
