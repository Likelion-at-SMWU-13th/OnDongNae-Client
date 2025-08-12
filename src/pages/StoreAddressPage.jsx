import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
//import PageContainer from '@/components/common/PageContainer'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import InputField from '@/components/signup/InputField'

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
  margin: 50px 44px 0 30px;
  gap: 30px;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  margin-top: 311px;
  margin-left: 14px;
`
const StoreAddressPage = () => {
  const [address, setAddress] = useState('')

  const navigate = useNavigate()

  const handleNext = () => {
    // 연동

    // 다음 페이지로 이동
    navigate('')
  }
  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false}></Header>
      <ProgressBar currentStep={4} totalSteps={6} logoImg={smallDragon} />
      <Container>
        <TextContainer>
          <Title text={'가게 주소를 입력해주세요.'}></Title>
          <FormContainer>
            <InputField
              placeholder='서울특별시 용산구 멋사로 08-03'
              value={address}
              onChange={setAddress}
            ></InputField>
            <ButtonContainer>
              <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
              <SmallOrangeButton type='submit' label='다음' onBtnClick={handleNext} />
            </ButtonContainer>
          </FormContainer>
        </TextContainer>
      </Container>
    </>
  )
}

export default StoreAddressPage
