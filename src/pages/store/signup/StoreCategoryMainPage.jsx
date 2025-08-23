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

const StoreCategoryMainPage = () => {
  const navigate = useNavigate()
  // 대분류 카테고리
  // [{id, name}]
  const [categories, setCategories] = useState([])
  const [id, setId] = useState(null) // 선택한 대분류 id
  const apiUrl = import.meta.env.VITE_API_URL

  // 대분류 카테고리 세팅하기
  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/signup/store/main-category`)
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

    // 세션 스토리지에 저장
    sessionStorage.setItem('mainCategory', String(id))
    // 서비스 기타 페이지는 소분류 빈 문자열 값으로 주기
    if (id == 6) {
      sessionStorage.setItem('subCategory', JSON.stringify([24])) // 소분류 빈 문자열 저장
      navigate('/signup/store-image')
    } else {
      navigate('/signup/store-category-sub')
    }
  }

  return (
    <>
      <Header title={'회원가입'} showImg={false} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <ProgressBar currentStep={5} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게의 업종을 골라주세요.'} />
            </S.TextContainer>
            <S.ButtonContainer>
              <SelectButton options={categories} value={id} onChange={setId} />
            </S.ButtonContainer>
            <SmallButtonContainer handleSubmit={handleSubmit} />
          </S.Container>
        </S.Scroll>
      </S.Main>
    </>
  )
}

export default StoreCategoryMainPage
