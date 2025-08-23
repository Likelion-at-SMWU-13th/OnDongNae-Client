import React from 'react'
import styled from 'styled-components'

function SmallOrangeButton({ type, label, onBtnClick }) {
  return (
    <Button type={type} onClick={onBtnClick}>
      {label}
    </Button>
  )
}

export default SmallOrangeButton

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
