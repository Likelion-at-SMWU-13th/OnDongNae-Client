import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import icOverview from '@/assets/icon-overview.svg'
import icOverviewActive from '@/assets/icon-overview-active.svg'
import icMap from '@/assets/icon-map.svg'
import icMapActive from '@/assets/icon-map-active.svg'
import icCourse from '@/assets/icon-course.svg'
import icCourseActive from '@/assets/icon-course-active.svg'
import icRates from '@/assets/icon-rates.svg'
import icRatesActive from '@/assets/icon-rates-active.svg'

const NAVS = [
  {
    to: '/user/overview',
    label: 'bottomNav.overview',
    icon: icOverview,
    iconActive: icOverviewActive,
  },
  { to: '/user/map', label: 'bottomNav.map', icon: icMap, iconActive: icMapActive },
  { to: '/user/course', label: 'bottomNav.course', icon: icCourse, iconActive: icCourseActive },
  { to: '/user/rates', label: 'bottomNav.rates', icon: icRates, iconActive: icRatesActive },
]

const BottomNav = () => {
  const { t } = useTranslation()
  return (
    <Bar>
      <ItemContainer>
        {NAVS.map(({ to, label, icon, iconActive }) => (
          <Link key={to} to={to}>
            {(
              { isActive }, //링크가 활성화 상태인지 알려줌, 활성 상태일 때만 actice 클래스 줌
            ) => (
              <Item className={isActive ? 'active' : ''}>
                <img src={isActive ? iconActive : icon} alt='' aria-hidden />
                <span>{t(label)}</span>
              </Item>
            )}
          </Link>
        ))}
      </ItemContainer>
    </Bar>
  )
}

export default BottomNav

const Bar = styled.div`
  width: min(100vw, 440px);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 100;
  padding: 2dvh 35px 3dvh 35px;
  border-top: 1px solid #f2f2f5;
  background: #fff;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-align: center;
  font-size: 0.875rem;
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
const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
  -webkit-tap-highlight-color: transparent;
`
