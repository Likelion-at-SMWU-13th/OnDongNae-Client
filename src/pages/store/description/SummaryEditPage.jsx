import React from 'react'
import * as S from '@/styles/description/EditPage.styles'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import Buttons from '@/components/description/Buttons'
import authAxios from '@/lib/authAxios'

const SummaryEditPage = () => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  // 랜더링 시, axios get 으로 내용 가져오기
  useEffect(() => {
    authAxios
      .get(`${apiUrl}/me/store/description`, {
        params: { ver: 'short' },
      })
      .then((res) => {
        setComment(res.data.data ?? '')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // patch로 수정된 내용 보내기
  // 페이지 이동
  const handleSubmit = () => {
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
    const value = (comment || '').trim()
    if (!value) {
      alert('한 줄 소개를 입력해주세요.')
      return
    }

    authAxios
      .patch(`${apiUrl}/me/store/description`, (comment || '').trim(), {
        params: { ver: 'short' },
        headers: { 'Content-Type': 'text/plain' },
      })
      .then(() => {
        alert('수정이 완료되었습니다.')
        navigate('/store/description')
      })
      .catch((err) => {
        console.error('[SummaryEdit] failed:', err)
        alert('한 줄 소개 수정에 실패했습니다.')
      })
  }

  return (
    <>
      <Header img={backIcon} title={'가게 설명'} showImg={true} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <DoubleTitle
            title={'한 줄 소개글을 수정해주세요.'}
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

export default SummaryEditPage
