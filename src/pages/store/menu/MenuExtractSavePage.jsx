import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import authAxios from '@/lib/authAxios'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import MenuSave from '@/components/menuManagement/MenuSave'

const MenuExtractSave = () => {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
  const { state } = useLocation()
  const menus = state?.menus ?? []
  const allergesApply = Boolean(state?.canExtractAllergy)

  const handleSave = () => {
    authAxios
      .post(
        `${apiUrl}/me/menus/allergens/extract`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        const AllergensData = res.data
        navigate('/menu/allergens/loading', { state: { AllergensData } })
      })
      .catch((err) => {
        console.error(err)
        navigate('/menu/allergens/fail')
      })
  }
  const handleTab = () => {
    navigate('/menu')
  }
  return (
    <>
      <Header title={'메뉴 관리'} showImg={true} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <DoubleTitle
            title='메뉴판이 저장되었어요'
            subtitle='메뉴판을 확인하고 하단의 버튼을 눌러주세요'
          />
          <MenuSave menus={menus} />
          <ButtonWrapper>
            {!allergesApply && (
              <LargeOrangeButton label='메뉴관리로 돌아가기' onBtnClick={handleTab} />
            )}
            {allergesApply && (
              <LargeOrangeButton label='알레르기 정보 추출' onBtnClick={handleSave} />
            )}
          </ButtonWrapper>
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </>
  )
}

export default MenuExtractSave
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 92px;
  padding-bottom: 30px;
`
