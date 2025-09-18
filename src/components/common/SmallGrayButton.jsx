import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function SmallGrayButton({ type, label, onBtnClick }) {
  return (
    <Button type={type} onClick={onBtnClick}>
      {label}
    </Button>
  )
}

export default SmallGrayButton

const Button = styled.button`
  width: 127px;
  padding: 14.5px 0;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 10px;
  background-color: #d6d6d6;
  color: #ffffff;
  border: none;
  cursor: pointer;
`
