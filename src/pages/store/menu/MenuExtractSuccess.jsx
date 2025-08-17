import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import DoubleTitle from '@/components/common/DoubleTitle'
import BottomNav from '@/components/common/BottomNav'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import MenuEdit from '@/components/menuManagement/MenuEdit'
const handleSave = () => {}
const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const MenuExtractSuccess = () => {
  return (
    <div>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <DoubleTitle
        title='메뉴 추출이 끝났어요'
        subtitle='수정 버튼을 누르면 내용을 바꿀 수 있어요.'
      />
      <ButtonWapper>
        <MenuEdit />
        <LargeOrangeButton label='저장' onBtnClick={handleSave} />
      </ButtonWapper>
      <BottomNav />
    </div>
  )
}

export default MenuExtractSuccess
