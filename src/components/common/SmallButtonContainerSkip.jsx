import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom' //
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'
import SkipButton from '../signup/SkipButton'

function SmallButtonContainer({ handleSubmit }) {
  const navigate = useNavigate()

  return (
    <ButtonContainer>
      <RowAlign>
        <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />

        <SmallOrangeButton type='button' label='다음' onBtnClick={() => handleSubmit('next')} />
      </RowAlign>
      <SkipButton onClick={() => handleSubmit('skip')} />
    </ButtonContainer>
  )
}

export default SmallButtonContainer

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 77.43%;
  gap: 17px;
  margin: 0 auto;
`

const RowAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12.3%;
`
