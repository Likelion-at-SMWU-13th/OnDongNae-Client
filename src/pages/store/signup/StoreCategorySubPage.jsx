import React, { useEffect, useState } from 'react'
import * as S from '@/styles/signup/StoreCategoryPage.styles'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/common/Header'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SelectButton from '@/components/signup/SelectButton'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const SelectSubcategoryPage = () => {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  // 대분류 카테고리 값 받기
  const mainCategory = Number(sessionStorage.getItem('mainCategory') || '')
  // 소분류 카테고리
  // [{id, name}]
  const [categories, setCategories] = useState([])
  const [id, setId] = useState([])
  useEffect(() => {
    if (!mainCategory) {
      alert('대분류 정보가 없습니다.')
      return
    }
    axios
      .get(`${apiUrl}/auth/signup/store/sub-category`, {
        params: { mainCategory }, //sub-category?mainCategory=2
      })
      .then((res) => {
        setCategories(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [mainCategory])

  // 다음 버튼 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault()

    // 선택값 없으면 경고
    if (!id.length) {
      alert('세부 업종을 선택해주세요.')
      return
    }
    // 마지막에 세션 스토리지에서 꺼낼 때 주의
    sessionStorage.setItem('subCategory', JSON.stringify(id))
    navigate('/signup/store-image', { state: { prevStep: 5 } })
  }

  return (
    <>
      {/* 상단 헤더 */}
      <Header title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게의 세부 업종을 골라주세요.'} />
            </S.TextContainer>
            <S.ButtonContainer>
              <SelectButton options={categories} multiple value={id} onChange={setId} />
            </S.ButtonContainer>
            <SmallButtonContainer handleSubmit={handleSubmit} />
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default SelectSubcategoryPage
