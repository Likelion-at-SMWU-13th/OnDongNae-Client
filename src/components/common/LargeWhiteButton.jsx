import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 82.56%;
  padding: 10.28px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.7);
  border: 2px solid #f08e67;
  cursor: pointer;
  margin: 0 auto;
`

function LargeWhiteButton({ label }) {
  return <Button>{label}</Button>
}

export default LargeWhiteButton
