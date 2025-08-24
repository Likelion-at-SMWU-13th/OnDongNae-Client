import React, { useState } from 'react'
import * as S from '@/styles/signup/SignupTermsPage.styles'
import * as C from '@/styles/common/SignupScroll.styles'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TermsModal from '@/components/common/TermsModal' // 1. Modal 컴포넌트 import
import TermsAgreement from '@/components/signup/TermsAgreement'
import { termsContent } from '@/components/signup/TermsContent'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const SignupTerms = () => {
  const navigate = useNavigate()
  const [requiredOK, setRequiredOK] = useState(false) // 필수 약관 동의 완료 여부

  // 모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({ title: '', content: '' })

  const openModal = (termKey) => {
    setModalData(termsContent[termKey]) // 약관 데이터에서 해당 키의 내용을 가져와 설정
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    if (!requiredOK) {
      alert('필수 약관에 모두 동의해 주세요.')
      return
    }
    navigate('/signup/select-market', { state: { prevStep: 3 } })
  }

  return (
    <>
      <Header title={'회원가입'} showImg={false} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <ProgressBar currentStep={2} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가입을 위한 약관에 동의해주세요.'} />
            </S.TextContainer>
            <S.FormContainer>
              {/* 필수 동의 항목 체크 */}
              <TermsAgreement onRequiredChange={setRequiredOK} onViewClick={openModal} />
            </S.FormContainer>

            <SmallButtonContainer handleSubmit={handleSubmit} />
          </S.Container>
        </C.Scroll>
      </C.Main>
      <TermsModal isOpen={isModalOpen} onClose={closeModal} title={modalData.title}>
        {modalData.content}
      </TermsModal>
    </>
  )
}

export default SignupTerms
