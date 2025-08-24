import React, { useState } from 'react'
import * as S from '@/styles/signup/SignupUserInfoPage.styles'
import * as C from '@/styles/common/SignupScroll.styles'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import TextField from '@/components/signup/TextField'
import PhoneField from '@/components/signup/PhoneField'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const Signup = () => {
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    if (!name) {
      alert('이름을 입력해 주세요.')
      return
    }
    if (!phoneNum) {
      alert('휴대폰 번호를 입력해 주세요.')
      return
    }
    e.preventDefault()
    // 다음 페이지에 name, phoneNum 전달
    navigate('/signup/accountinfo', { state: { name, phoneNum } })
  }

  return (
    <>
      <Header title={'회원가입'} showImg={true} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <ProgressBar currentStep={1} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가입을 위한 정보를 입력해주세요.'} />
            </S.TextContainer>
            <S.InputContainer>
              <TextField label='이름' placeholder='김멋사' value={name} onChange={setName} />
              <PhoneField
                label='휴대폰 번호'
                placeholder='010-0000-0000'
                value={phoneNum}
                onChange={setPhoneNum}
                required
              />
            </S.InputContainer>
            <SmallButtonContainer handleSubmit={handleSubmit} />
          </S.Container>
        </C.Scroll>
      </C.Main>
    </>
  )
}

export default Signup
