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
  background-color: ${({ $bgcolor = '#f08e67' }) => $bgcolor};
  color: #ffffff;
  border: none;
  cursor: pointer;
  margin: 0 auto;
`

function SmallButton({ label, onBtnClick, bgcolor }) {
  return (
    <Button $bgcolor={bgcolor} onClick={onBtnClick}>
      {label}
    </Button>
  )
}

export default SmallButton
