import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import icMenu from '@/assets/icon-bottomNav-menu.svg'
import icMenuActive from '@/assets/icon-bottomNav-menu-active.svg'
import icTime from '@/assets/icon-bottomNav-clock.svg'
import icTimeActive from '@/assets/icon-bottomNav-clock-active.svg'
import icAbout from '@/assets/icon-bottomNav-storeInfo.svg'
import icAboutActive from '@/assets/icon-bottomNav-storeInfo-active.svg'
import icMy from '@/assets/icon-bottomNav-myStore.svg'
import icMyActive from '@/assets/icon-bottomNav-myStore-active.svg'

const NAVS = [
  { to: '/menu', label: '메뉴관리', icon: icMenu, iconActive: icMenuActive },
  { to: '/hours', label: '영업시간', icon: icTime, iconActive: icTimeActive },
  { to: '/about', label: '가게설명', icon: icAbout, iconActive: icAboutActive },
  { to: '/mypage', label: '나의가게', icon: icMy, iconActive: icMyActive },
]

const Bar = styled.section`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 100;
  display: inline-flex;
  gap: 48px;
  padding: 17px 25px 26px 25px;
  border-top: 1px solid #f2f2f5;
  background: #fff;
`
const Item = styled.div`
  height: 56px;
  width: 49px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #b1b1b1;
  user-select: none;
  img {
    display: block;
  }

  &.active {
    color: #f08e67;
  }
`
/* 2) 링크 기본 스타일 제거(파란색 밑줄) */
const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
  -webkit-tap-highlight-color: transparent;
`

const BottomNav = () => {
  return (
    <Bar>
      {NAVS.map(({ to, label, icon, iconActive }) => (
        <Link key={to} to={to} end>
          {({ isActive }) => (
            <Item className={isActive ? 'active' : ''}>
              <img src={isActive ? iconActive : icon} alt='' aria-hidden />
              <span>{label}</span>
            </Item>
          )}
        </Link>
      ))}
    </Bar>
  )
}

export default BottomNav
