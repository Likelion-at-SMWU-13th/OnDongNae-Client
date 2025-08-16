import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import spinnerIcon from '@/assets/icon-spinner.svg'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`

const Img = styled.img`
  width: 119px;
  height: 119px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`

const Text = styled.p`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`
const SignupLoadingPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (!state) {
      console.log('회원가입을 처음부터 다시 진행해주세요.')
      navigate('/signup/userinfo')
      return
    }

    const {
      userId,
      storeName,
      address,
      marketName,
      phoneNum,
      mainCategory,
      subCategory,
      strength,
      recommendation,
      image,
    } = state

    if (
      !userId ||
      !storeName ||
      !marketName ||
      !phoneNum ||
      !mainCategory ||
      typeof subCategory === 'undefined'
    ) {
      console.log('필수값이 누락되었습니다. 회원가입을 처음부터 다시 진행해주세요.')
      navigate('/signup/userinfo')
      return
    }

    // FormData 생성
    const form = new FormData()

    // 필수값
    form.append('userId', userId)
    form.append('storeName', storeName)
    form.append('marketName', marketName)
    form.append('phoneNum', phoneNum)
    form.append('mainCategory', mainCategory)
    form.append('subCategory', subCategory)

    // 선택값
    if (address) form.append('address', address)
    if (strength) form.append('strength', strength)
    if (recommendation) form.append('recommendation', recommendation)
    if (Array.isArray(image) && image.length > 0) {
      image.forEach((file) => form.append('image', file, file.name))
    }

    // post 요청
    axios
      .post('http://127.0.0.1:8000/auth/signup/store', form)
      .then((res) => {
        navigate('/signup/complete', {
          replace: true, // 회원가입 완료 후, 다시 이 페이지로 돌아오지 못하게
        })
      })
      .catch((err) => {
        console.log(err)
        console.log('가게 등록 중 오류가 발생했습니다. 다시 시도해주세요.')
        navigate('/signup/userinfo')
      })
  }, [navigate, state])

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={true} />
      <Container>
        <Img src={spinnerIcon} alt='로딩중' />
        <Text>
          회원가입 진행 중… <br />
          잠시만 기다려 주세요!
        </Text>
      </Container>
    </>
  )
}

export default SignupLoadingPage
