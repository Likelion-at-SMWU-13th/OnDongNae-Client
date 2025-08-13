import styled from 'styled-components'
import * as S from '@/styles/signup/StoreCategoryPage.styles'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
  const [selectedId, setSelectedId] = useState(null) // 선택한 대분류 id

  // 대분류 카테고리
  const categories = [
    { id: 1, name: '농수산물 / 식품' },
    { id: 2, name: '음식점 / 카페' },
    { id: 3, name: '주점 / 술집' },
    { id: 4, name: '잡화 / 생활용품' },
    { id: 5, name: '기념품 / 전통공예 / 한복 / 특산품' },
    { id: 6, name: '서비스 / 기타' }, // 여기 선택하면 소분류 페이지로 안 넘어가게
  ]

  // 다음 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedId) {
      alert('업종을 선택해주세요.')
      return
    }

    const major = categories.find((c) => c.id === selectedId)
    const nextState = { ...state, mainCategory: major.id }

    // 기타 선택 시, 소분류 페이지 뜨지 않음
    if (selectedId === 6) {
      navigate('/signup/store-image', { state: nextState })
    } else {
      navigate('/signup/store-category-sub', { state: { ...nextState, major } })
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
              <SelectButton options={categories} value={selectedId} onChange={setSelectedId} />

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
