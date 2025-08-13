import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import InputTitle from '@/components/description/InputTitle'
import Button from '@/components/description/Button'

const DetailDescription = () => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate('/store/description/detail-edit')
  }
  // useEffect로 마운트 시, getDetail 함수 내 axios get으로 데이터 받아오기
  return (
    <>
      <Container>
        <InputTitle text={'상세 설명'} />
        <Comment>
          온동네 가게는 떡볶이가 유명한 곳이에요.쫄깃한 떡볶이와 함께 순대, 어묵꼬치를 함께 즐길 수
          있습니다.특히 떡볶이에 순대를 찍어 먹으면 더 맛있다고 많은 손님들이 추천해요.친절한
          서비스와 훈훈한 분위기 속에서 한국 길거리 분식의 진수를 맛보실 수 있습니다.
        </Comment>
        <ButtonContainer>
          <Button type='button' label='수정' onBtnClick={handleSubmit} />
        </ButtonContainer>
      </Container>
    </>
  )
}

export default DetailDescription

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Comment = styled.div`
  border-radius: 10px;
  border: 2px solid #f08e67;
  background: #fff;
  padding: 17px 19px 17px 15px;
  color: #000;
  font-feature-settings: 'dlig' on;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 116.667% */
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
