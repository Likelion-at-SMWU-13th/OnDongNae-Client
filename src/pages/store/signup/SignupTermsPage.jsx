import * as S from '@/styles/signup/SignupTermsPage.styles'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TermsAgreement from '@/components/signup/TermsAgreement'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const SignupTerms = () => {
  const navigate = useNavigate()
  const [requiredOK, setRequiredOK] = useState(false) // 필수 약관 동의 완료 여부

  const handleSubmit = () => {
    if (!requiredOK) {
      alert('필수 약관에 모두 동의해 주세요.')
      return
    }
    // TODO: 다음 페이지 이동
    navigate('/signup/select-market')
  }

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={3} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가입을 위한 약관에 동의해주세요.'} />
            </S.TextContainer>
            <S.FormContainer>
              {/* 필수 동의 항목 체크 */}
              <TermsAgreement onRequiredChange={setRequiredOK} />
            </S.FormContainer>

            <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default SignupTerms
