import React from 'react'
import styled from 'styled-components'
import RegisterOptionCard from '@/components/menuManagement/RegisterOptionCard'

const RegisterOptions = ({ onUploadClick, onManualClick }) => {
  return (
    <RegisterOptionCardSection>
      <RegisterOptionCard
        title='메뉴판 사진 올리기'
        desc='가게 메뉴판이 잘 보이게 사진을 올려주세요'
        onClick={onUploadClick}
      />
      <RegisterOptionCard
        title='직접 입력하기'
        desc='사진 대신 직접 내용을 입력해주세요'
        onClick={onManualClick}
      />
    </RegisterOptionCardSection>
  )
}

export default RegisterOptions

const RegisterOptionCardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
