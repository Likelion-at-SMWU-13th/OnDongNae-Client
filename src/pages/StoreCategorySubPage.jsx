// src/pages/signup/SelectSubcategoryPage.jsx
import styled from 'styled-components'
import * as S from '@/styles/signup/StoreCategoryPage.styles'
import React, { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// 공용 UI 컴포넌트
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SelectButton from '@/components/signup/SelectButton'
import SmallOrangeButton from '@/components/common/SmallOrangeButton'
import SmallGrayButton from '@/components/common/SmallGrayButton'

// 레이아웃 컴포넌트
const Main = styled.main`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  min-height: 0;
`
const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`

const SelectSubcategoryPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const major = state?.major

  const [selectedId, setSelectedId] = useState(null) // 소분류 선택값 저장

  // 대분류별 소분류 목록 매핑
  const minorOptions = useMemo(() => {
    const map = {
      1: [
        // 농수산물 / 식품
        { id: 1, name: '청과' },
        { id: 2, name: '수산물' },
        { id: 3, name: '정육/축산' },
        { id: 4, name: '곡물' },
        { id: 5, name: '반찬' },
        { id: 6, name: '떡/제과' },
      ],
      2: [
        // 음식점 / 카페
        { id: 1, name: '한식' },
        { id: 2, name: '분식' },
        { id: 3, name: '회 · 해산물' },
        { id: 4, name: '세계 음식' },
        { id: 5, name: '퓨전음식' },
        { id: 6, name: '카페 · 차' },
      ],
      3: [
        // 주점 / 술집
        { id: 1, name: '전통주점' },
        { id: 2, name: '맥주집 · 호프' },
        { id: 3, name: '바' },
        { id: 4, name: '이자카야' },
      ],
      4: [
        // 잡화 / 생활용품
        { id: 1, name: '의류 · 신발' },
        { id: 2, name: '생활 잡화' },
        { id: 3, name: '가정용품' },
      ],
      5: [
        // 기념품 / 전통공예 / 한복 / 특산품
        { id: 1, name: '기념품점' },
        { id: 2, name: '한복 · 전통의류' },
        { id: 3, name: '공예품' },
        { id: 4, name: '소품점' },
      ],
      6: [], // 서비스 / 기타 -> 여기는 이 페이지로 넘어오지 않음
    }
    return map[major?.id] || []
  }, [major?.id])

  // 다음 버튼 클릭 시
  const handleNext = (e) => {
    e.preventDefault()

    // 대분류 정보 없으면 첫 단계로
    if (!major) {
      alert('업종 선택 정보가 없습니다. 처음부터 다시 진행해주세요.')
      navigate('/signup/store-category')
      return
    }

    // 선택값 없으면 경고
    if (!selectedId) {
      alert('세부 업종을 선택해주세요.')
      return
    }

    const minor = minorOptions.find((m) => m.id === selectedId)

    // 다음 페이지로 이동
    navigate('/signup/store-image', { state: { major, minor } })
  }

  return (
    <>
      {/* 상단 헤더 */}
      <Header img={backIcon} title={'회원가입'} showImg={false} />

      <Main>
        <Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />

          <S.Container>
            <S.TextContainer>
              {/* 페이지 타이틀 */}
              <Title text={'가게의 세부 업종을 골라주세요'} />

              {/* 선택 폼 영역 */}
              <S.FormContainer onSubmit={handleNext}>
                {/* 소분류 리스트 */}
                <SelectButton options={minorOptions} value={selectedId} onChange={setSelectedId} />

                {/* 하단 버튼 */}
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

export default SelectSubcategoryPage
