import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function SmallLightOrangeButton({ type, label, onBtnClick = undefined }) {
  return (
    <Button type={type} onClick={onBtnClick ? onBtnClick : undefined}>
      {label}
    </Button>
  )
}

export default SmallLightOrangeButton

const Button = styled.button`
  width: 127px;
  padding: 14.5px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  background-color: #feb99d;
  color: #ffffff;
  border: none;
  cursor: pointer;
`
