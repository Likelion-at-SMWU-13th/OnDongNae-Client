import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Button = styled.button`
  width: 80px;

  display: flex;
  padding: 13px 25px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  border-radius: 10px;
  background: #feb99d;
  color: #ffffff;
  border: none;
  cursor: pointer;
`

function SmallOrangeButton({ type, label, onBtnClick = undefined }) {
  return (
    <Button type={type} onClick={onBtnClick ? onBtnClick : undefined}>
      {label}
    </Button>
  )
}

export default SmallOrangeButton
