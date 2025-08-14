import React from 'react'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import BottomNav from '@/components/common/BottomNav'
import HoursTable from '@/components/hours/HoursTable'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
const HoursPage = () => {
  const navigator = useNavigate()

  const ButtonWrapper = styled.div`
    display: flex;
    margin: 71px auto 0 auto;
  `
  return (
    <div>
      <Header img={backIcon} title='영업 시간' showImg={true} />

      <HoursTable />
      <ButtonWrapper>
        <LargeOrangeButton label='영업시간 수정' onBtnClick={() => navigator('/hours/edit')} />
      </ButtonWrapper>
      <BottomNav />
    </div>
  )
}

export default HoursPage
