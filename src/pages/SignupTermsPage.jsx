import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '@/components/common/PageContainer'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TermsAgreement from '@/components/signup/TermsAgreement'
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/smallGrayButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 109px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 19px 0 30px;
  gap: 60px;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 65px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  margin-left: 14px;
`

const SignupTerms = () => {
  const navigate = useNavigate()
  const [requiredOK, setRequiredOK] = useState(false) // 필수 약관 동의 완료 여부

  const handleNext = () => {
    if (!requiredOK) {
      alert('필수 약관에 모두 동의해 주세요.')
      return
    }
    // TODO: 다음 페이지 이동
    navigate('/signup/select-market')
  }

  return (
    <PageContainer>
      <Header img={backIcon} title={'회원가입'} showImg={false}></Header>
      <ProgressBar currentStep={3} totalSteps={6} logoImg={smallDragon} />
      <Container>
        <TextContainer>
          <Title text={'가입을 위한 약관에 동의해주세요'}></Title>
          <FormContainer>
            {/* 필수 동의 항목 체크 */}
            <TermsAgreement onRequiredChange={setRequiredOK}></TermsAgreement>
            <ButtonContainer>
              <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
              <SmallOrangeButton type='submit' label='다음' onBtnClick={handleNext} />
            </ButtonContainer>
          </FormContainer>
        </TextContainer>
      </Container>
    </PageContainer>
  )
}

export default SignupTerms
