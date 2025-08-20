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
  const [memberPhone, setMemberPhone] = useState('')
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')
  const [storeNameKo, setStoreNameKo] = useState('')
  const [storeAddressKo, setStoreAddressKo] = useState('')
  const [storePhone, setStorePhone] = useState('')

  const apiUrl = import.meta.env.VITE_API_URL

  const getInfo = () => {
    authAxios
      .get(`${apiUrl}/me/profile`)
      .then((res) => {
        setMemberPhone(res.data.data.memberPhone)
        setStoreNameKo(res.data.data.storeNameKo)
        setStoreAddressKo(res.data.data.storeAddressKo)
        setStorePhone(res.data.data.storePhone)
      })
      .catch((err) => console.log(err))
  }
  // 처음 렌더링 시, 기존 저장되어 잇던 정보 가져오기
  useEffect(() => {
    getInfo()
  }, [])

  // 저장 버튼 누르면 patch로 바뀐 값 전달
  const handleSubmit = async () => {
    try {
      const body = {
        memberPhone,
        storeNameKo,
        storeAddressKo,
        storePhone,
      }
      if (pw1 && pw2) {
        if (pw1 !== pw2) {
          alert('비밀번호가 일치하지 않습니다.')
          return
        }
        body.newPassword = pw1
        body.confirmPassword = pw2
      }

      const res = await authAxios.patch(`${apiUrl}/me/profile`, body)

      console.log('수정 성공')
      alert('정보가 성공적으로 수정되었습니다.')
    } catch (err) {
      console.error('수정 실패', err)
      alert('정보 수정에 실패했습니다.')
    }
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
              value={memberPhone}
              onChange={setMemberPhone}
              required
            />
            <PasswordField value1={pw1} value2={pw2} onChange1={setPw1} onChange2={setPw2} />
            <TextField
              label='가게명'
              placeholder='온동네'
              value={storeNameKo}
              onChange={setStoreNameKo}
            />
            <TextField
              label='가게 주소'
              placeholder='서울특별시 용산구 멋사로 08-03'
              value={storeAddressKo}
              onChange={setStoreAddressKo}
            />
            <PhoneField
              label='가게 전화번호'
              placeholder='02-0000-0000'
              value={storePhone}
              onChange={setStorePhone}
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
