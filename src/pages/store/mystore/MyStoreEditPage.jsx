import React, { useEffect, useState } from 'react'
import { authAxios } from '@/lib/authAxios'
import * as S from '@/styles/mystore/MyStoreEditPage.styles'

import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import PhoneField from '@/components/signup/PhoneField'
import PasswordField from '@/components/signup/PasswordField'
import TextField from '@/components/signup/TextField'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import BottomNav from '@/components/common/BottomNav'

const MyInfoEditPage = () => {
  const [phoneNum, setPhoneNum] = useState('')
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')
  const [storeName, setStoreName] = useState('')
  const [address, setAddress] = useState('')
  const [storePhoneNum, setStorePhoneNum] = useState('')

  const handleSubmit = () => {
    console.log('저장')
  }
  return (
    <>
      <Header img={backIcon} title={'정보 수정'} showImg />
      <S.Main>
        <S.Scroll className='scrollable'>
          <S.FieldContainer>
            <PhoneField
              label='휴대폰 번호'
              placeholder='010-0000-0000'
              value={phoneNum}
              onChange={setPhoneNum}
              required
            />
            <PasswordField value1={pw1} value2={pw2} onChange1={setPw1} onChange2={setPw2} />
            <TextField
              label='가게명'
              placeholder='김멋사'
              value={storeName}
              onChange={setStoreName}
            />
            <TextField
              label='가게 주소'
              placeholder='김멋사'
              value={address}
              onChange={setAddress}
            />
            <PhoneField
              label='가게 전화번호'
              placeholder='02-0000-0000'
              value={storePhoneNum}
              onChange={setStorePhoneNum}
              required
            />
          </S.FieldContainer>
          <S.ButtonContainer>
            <SmallButtonContainer handleSubmit={handleSubmit} prevLabel='취소' nextLabel='저장' />
          </S.ButtonContainer>
        </S.Scroll>
      </S.Main>
      <BottomNav />
    </>
  )
}

export default MyInfoEditPage
