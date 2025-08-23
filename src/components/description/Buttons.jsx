import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'

function Buttons({ handleSubmit }) {
  const navigate = useNavigate()

  return (
    <ButtonContainer>
      <SmallGrayButton type='button' label='취소' onBtnClick={() => navigate(-1)} />
      <SmallOrangeButton type='button' label='저장' onBtnClick={handleSubmit} />
    </ButtonContainer>
  )
}

export default Buttons

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
`
