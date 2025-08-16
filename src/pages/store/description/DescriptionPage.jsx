import React from 'react'
import * as S from '@/styles/description/StoreDescriptionPage.styles'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import ShortDescription from '@/components/description/ShortDescription'
import LongDescription from '@/components/description/LongDescription'
import BottomNav from '@/components/common/BottomNav'

const StoreDescriptionPage = () => {
  const navigate = useNavigate()
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
    axios
      .get('http://127.0.0.1:8000/me/store/description', {
        params: { ver: 'both' },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShortDesc(res.data?.data?.shortDescription ?? '')
        setLongDesc(res.data?.data?.longDescription ?? '')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Header img={backIcon} title={'가게 설명'} showImg={true} />
      <S.Main>
        <S.Scroll className='scrollable'>
          <DoubleTitle
            title={'작성하신 키워드로 \n AI가 소개글을 만들었어요.'}
            subtitle={'수정하고 싶다면 ‘수정하기’ 버튼을 눌러주세요.'}
          />
          <S.Container>
            {/* 한 줄 소개 */}
            <ShortDescription text={shortDesc} />
            {/* 세부 설명 */}
            <LongDescription text={longDesc} />
          </S.Container>
        </S.Scroll>
      </S.Main>
      <BottomNav />
    </>
  )
}

export default StoreDescriptionPage
