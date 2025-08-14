import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom' //
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 77.43%;
  gap: 12.3%;
  margin: 0 auto;
`
function SmallButtonContainer({ handleSubmit, prevLabel = '이전', nextLabel = '다음' }) {
  const navigate = useNavigate()

  return (
    <ButtonContainer>
      <SmallGrayButton type='button' label={prevLabel} onBtnClick={() => navigate(-1)} />
      <SmallOrangeButton type='button' label={nextLabel} onBtnClick={handleSubmit} />
    </ButtonContainer>
  )
}

export default SmallButtonContainer
