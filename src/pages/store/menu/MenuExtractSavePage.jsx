import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import MenuSave from '@/components/menuManagement/MenuSave'
import axios from 'axios'
export const Main = styled.main`
  height: calc(100dvh - 155px);
  display: flex;
  flex-direction: column;
  min-height: 0;
`
export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 92px;
  padding-bottom: 30px;
`
const MenuExtractSave = () => {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''

  const handleSave = () => {
    axios
      .post(
        `${apiUrl}/me/menus/allergens/extract`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        const AllergensData = res.data
        console.log(res.data) // 연동 확인 후 삭제
        navigate('/menu/allergens/loading', { state: { AllergensData } })
      })
      .catch((err) => {
        console.error(err)
        navigate('/menu/allergens/fail')
        alert('저장 실패!')
      })
  }
  return (
    <div className='scrollable'>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <Main>
        <Scroll>
          <DoubleTitle
            title='메뉴판이 저장되었어요'
            subtitle='메뉴판을 확인하고 하단의 버튼을 눌러주세요'
          />
          <MenuSave />
          <ButtonWapper>
            <LargeOrangeButton label='알레르기 정보 추출' onBtnClick={handleSave} />
          </ButtonWapper>
        </Scroll>
      </Main>
      <BottomNav />
    </div>
  )
}

export default MenuExtractSave
