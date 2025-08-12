import styled from 'styled-components'
import * as S from '@/styles/signup/StoreCategoryPage.styles'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SelectButton from '@/components/signup/SelectButton'
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'

// 메인 레이아웃 컨테이너
const Main = styled.main`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  min-height: 0;
`

// 스크롤 영역
const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`

const StoreCategoryMainPage = () => {
  const navigate = useNavigate()
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
  const handleNext = (e) => {
    e.preventDefault()
    if (!selectedId) {
      alert('업종을 선택해주세요.')
      return
    }

    const major = categories.find((c) => c.id === selectedId)

    // 가게 이미지 등록 페이지로 이동
    if (selectedId === 6) {
      navigate('/signup/store-image', { state: { major, minor: null } })
      return
    }

    // 그 외는 소분류 선택 페이지로 이동
    navigate('/signup/store-category-sub', { state: { major } })
  }

  return (
    <>
      {/* 상단 헤더 */}
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      {/* 스크롤 영역 */}
      <Main>
        <Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />

          <S.Container>
            <S.TextContainer>
              {/* 페이지 타이틀 */}
              <Title text={'가게의 업종을 골라주세요'} />

              {/* 선택 폼 영역 */}
              <S.FormContainer onSubmit={handleNext}>
                {/* SelectButton: options 리스트, 선택값, 변경 핸들러 전달 */}
                <SelectButton options={categories} value={selectedId} onChange={setSelectedId} />

                {/* 하단 버튼: 이전 / 다음 */}
                <S.ButtonContainer>
                  <SmallGrayButton type='button' label='이전' onBtnClick={() => navigate(-1)} />
                  <SmallOrangeButton type='submit' label='다음' />
                </S.ButtonContainer>
              </S.FormContainer>
            </S.TextContainer>
          </S.Container>
        </Scroll>
      </Main>
    </>
  )
}

export default StoreCategoryMainPage
