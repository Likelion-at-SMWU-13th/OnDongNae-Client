import styled from 'styled-components'
import * as S from '@/styles/signup/StoreCategoryPage.styles'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SelectButton from '@/components/signup/SelectButton'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const StoreCategoryMainPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  // 대분류 카테고리
  // [{id, name}]
  const [categories, setCategories] = useState([])
  const [id, setId] = useState(null) // 선택한 대분류 id

  // 대분류 카테고리 세팅하기
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/auth/signup/store/main-category')
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // 다음 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!id) {
      alert('업종을 선택해주세요.')
      return
    }
    // 서비스 기타 페이지는 소분류 빈 문자열 값으로 주기
    if (id == 6) {
      navigate('/signup/store-image', {
        state: { ...state, mainCategory: String(id), subCategory: '' },
      })
    } else {
      navigate('/signup/store-category-sub', { state: { ...state, mainCategory: String(id) } })
    }
  }

  return (
    <>
      {/* 상단 헤더 */}
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      {/* 스크롤 영역 */}
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />

          <S.Container>
            <S.TextContainer>
              {/* 페이지 타이틀 */}
              <Title text={'가게의 업종을 골라주세요.'} />
            </S.TextContainer>
            {/* 선택 폼 영역 */}
            <S.ButtonContainer>
              {/* SelectButton: options 리스트, 선택값, 변경 핸들러 전달 */}
              <SelectButton options={categories} value={id} onChange={setId} />

              {/* 하단 버튼: 이전 / 다음 */}
            </S.ButtonContainer>

            <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreCategoryMainPage
