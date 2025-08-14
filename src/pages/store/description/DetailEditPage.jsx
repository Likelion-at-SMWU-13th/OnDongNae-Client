import React from 'react'
import * as S from '@/styles/description/EditPage.styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import Buttons from '@/components/description/Buttons'

const DetailEditPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const [comment, setComment] = useState('')

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  // 랜더링 시, getDetail 함수 내 axios get 으로 내용 가져오기
  // setComment로 textarea 영역 채우기
  useEffect(() => {}, [])

  // patch로 수정된 내용 보내기
  // 페이지 이동
  const handleSubmit = () => {
    navigate('/store/description')
  }

  return (
    <>
      <Header img={backIcon} title={'가게 설명'} showImg={true} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <DoubleTitle
            title={'상세 소개글을 수정해주세요.'}
            subtitle={"수정 후 '저장하기' 버튼을 눌러주세요."}
          />
          <S.Container>
            <S.TextArea value={comment} onChange={handleChange}></S.TextArea>
          </S.Container>
          <Buttons handleSubmit={handleSubmit}></Buttons>
        </S.Scroll>
      </S.Main>
      <BottomNav />
    </>
  )
}

export default DetailEditPage
