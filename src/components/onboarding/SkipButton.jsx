import React from 'react'
import styled from 'styled-components'

const SkipButton = ({ onSkip }) => {
  return (
    <>
      <Button onClick={onSkip}>Skip</Button>
    </>
  )
}

export default SkipButton

const Button = styled.button`
  display: inline;
  width: auto; /* 넓이 자동 */
  height: auto;
  color: #fa6432;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 35px;
  border: none;
  background: none;
  text-align: right;
`
