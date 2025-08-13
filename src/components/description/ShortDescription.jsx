import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import InputTitle from '@/components/description/InputTitle'
import Button from '@/components/description/Button'

const DetailDescription = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/store/description/summary-edit')
  }
  // 1. useEffect로 마운트 시, getDetail 함수 내 axios get으로 데이터 받아오기

  return (
    <Container>
      <InputTitle text={'한 줄 소개'} />
      {/* 받아온 글 넣기 */}
      <Comment>신선한 재료로 만든 옛날 떡볶이와 순대가 맛있는 분식집</Comment>
      <ButtonContainer>
        <Button type='button' label='수정' onBtnClick={handleSubmit} />
      </ButtonContainer>
    </Container>
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
  word-break: break-all; /* 어절이 유지되지 않고 끊어져서 줄바꿈 됨 */
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
