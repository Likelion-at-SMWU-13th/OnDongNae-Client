import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import MenuSave from '@/components/menuManagement/MenuSave'
const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 92px;
`
const MenuExtractSave = () => {
  const navigate = useNavigate()
  const handleSave = () => navigate('/menu/allergens/loading')

  return (
    <div>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <DoubleTitle
        title='메뉴판이 저장되었어요'
        subtitle='메뉴판을 확인하고 하단의 버튼을 눌러주세요'
      />
      <MenuSave />
      <ButtonWapper>
        <LargeOrangeButton label='알레르기 정보 추출' onBtnClick={handleSave} />
      </ButtonWapper>
      <BottomNav />
    </div>
  )
}

export default MenuExtractSave
