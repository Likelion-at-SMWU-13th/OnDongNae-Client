import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

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
    // 3초 후 다음 페이지로 이동
    const timer = setTimeout(() => {
      // replace: 뒤로 가기 클릭시 로딩 페이지로 돌아오지 않도록 히스토리를 교체
      // state: 이전 단계에서 받아둔 값을 다음 페이지로 전달
      navigate('/signup/complete', { replace: true, state })
    }, 3000)

    return () => clearTimeout(timer)
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
