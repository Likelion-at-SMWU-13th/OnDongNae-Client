import React from 'react'
import * as S from '@/styles/description/StoreDescriptionPage.styles'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import ShortDescription from '@/components/description/ShortDescription'
import DetailDesription from '@/components/description/DetailDescription'
import BottomNav from '@/components/common/BottomNav'

const StoreDescriptionPage = () => {
  const navigate = useNavigate()

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
            <ShortDescription />
            {/* 세부 설명 */}
            <DetailDesription />
          </S.Container>
        </S.Scroll>
      </S.Main>
      <BottomNav />
    </>
  )
}

export default StoreDescriptionPage
