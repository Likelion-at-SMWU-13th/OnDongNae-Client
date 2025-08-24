import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import HoursTable from '@/components/hours/HoursTable'
import BottomNav from '@/components/common/BottomNav'

const HoursPage = () => {
  const navigator = useNavigate()

  return (
    <div>
      <Header title='영업 시간' showImg={false} />
      <HoursTable />
      <ButtonWrapper>
        <LargeOrangeButton label='영업시간 수정' onBtnClick={() => navigator('/hours/edit')} />
      </ButtonWrapper>
      <BottomNav />
    </div>
  )
}

export default HoursPage

const ButtonWrapper = styled.div`
  display: flex;
  margin: 71px auto 0 auto;
`
