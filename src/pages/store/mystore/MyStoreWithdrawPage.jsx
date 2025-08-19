import React, { useEffect, useState } from 'react'
import { authAxios } from '@/lib/authAxios'
import * as S from '@/styles/mystore/MyStoreWithdrawPage.styles'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import TextBox from '@/components/mystore/TextBox'

const MyStoreWithdrawPage = () => {
  const handleClick = () => {
    console.log('팝업 띄우기')
  }

  return (
    <>
      <Header img={backIcon} title={'탈퇴하기'} showImg />
      <S.Main>
        <S.Scroll className='scrollable'>
          <S.Text>GoruGoru (이하 고루고루)를 탈퇴하면,</S.Text>
          <S.BoxContainer>
            <TextBox
              title='1. 회원 정보 삭제'
              context='탈퇴 시 회원님의 개인 정보, 로그인 정보, 이용 기록, 작성하신 리뷰 및 콘텐츠 등이 모두 삭제되며 복구가 불가능합니다.'
            />
            <TextBox
              title='2. 서비스 이용 불가'
              context='탈퇴 완료 즉시 해당 계정으로 서비스 이용 및 로그인은 불가능합니다.'
            />
            <TextBox
              title='3. 데이터 백업 권장'
              context='탈퇴 전 필요한 정보는 미리 저장하거나 백업하시길 바랍니다.'
            />
          </S.BoxContainer>
          <S.Button type='button' onClick={handleClick}>
            탈퇴하기
          </S.Button>
        </S.Scroll>
      </S.Main>
      <BottomNav />
    </>
  )
}

export default MyStoreWithdrawPage
