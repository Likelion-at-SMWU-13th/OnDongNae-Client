import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import MenuItem from '@/components/mystore/MenuItem'
import iconView from '@/assets/icon-eyes-look-left.svg'
import iconPencil from '@/assets/icon-pencil.svg'
import iconExit from '@/assets/icon-exit.svg'
import BottomNav from '@/components/common/BottomNav'

const MyStorePage = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* 상단 헤더 */}
      <Header img={backIcon} title={'나의 가게'} showImg={false} />
      <MenuList>
        <MenuItem
          img={iconView}
          text='가게 보기'
          smallText='손님이 보는 가게 화면을 확인해요.'
          onClick={() => navigate('/menu')}
        />
        <MenuItem
          img={iconPencil}
          text='정보 수정'
          smallText='나의 정보를 확인하고 수정해요.'
          onClick={() => navigate('/hours')}
        />
        <MenuItem
          img={iconExit}
          text='탈퇴하기'
          smallText='서비스 이용을 원하지 않아요'
          onClick={() => navigate('/store/description')}
        />
      </MenuList>

      <BottomNav />
    </>
  )
}

export default MyStorePage

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  justify-content: center;
  margin: 0 auto;
`
