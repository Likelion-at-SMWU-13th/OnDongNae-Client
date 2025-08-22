import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import MenuItem from '@/components/signup/MenuItem'
import iconMenu from '@/assets/icon-bottomNav-menu-active.svg'
import iconClock from '@/assets/icon-bottomNav-clock-active.svg'
import iconStore from '@/assets/icon-bottomNav-storeInfo-active.svg'
import iconSetting from '@/assets/icon-bottomNav-myStore-active.svg'
import BottomNav from '@/components/common/BottomNav'

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 86%;
  justify-content: center;
  margin: 0 auto;
`

const StoreHomePage = () => {
  const navigate = useNavigate()
  return (
    <>
      {/* 상단 헤더 */}
      <Header img={backIcon} title={'GoruGoru'} showImg={true} />
      {/* 메뉴 -> 경로 수정 필요 */}
      <MenuList>
        <MenuItem img={iconMenu} text='메뉴 관리' onClick={() => navigate('/menu')} />
        <MenuItem img={iconClock} text='영업 시간' onClick={() => navigate('/hours')} />
        <MenuItem img={iconStore} text='가게 설명' onClick={() => navigate('/store/description')} />
        <MenuItem img={iconSetting} text='나의 가게' onClick={() => navigate('/menu')} />
      </MenuList>
      <BottomNav />
    </>
  )
}

export default StoreHomePage
