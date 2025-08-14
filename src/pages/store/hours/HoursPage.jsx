import React from 'react'
import Header from '@/components/common/Header'
import Title from '@/components/common/Title'
import backIcon from '@/assets/button-back.svg'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import BottomNav from '@/components/common/BottomNav'
import HoursTable from '@/components/hours/HoursTable'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
const HoursPage = () => {
  const navigator = useNavigate()
  return (
    <div>
      <Header img={backIcon} title='영업 시간' showImg={true} />
      <Title text='온동네 가게의 영업시간이에요' />
      <HoursTable />
      <LargeOrangeButton label='영업시간 수정' onBtnClick={() => navigator('/hours/edit')} />
      <BottomNav />
    </div>
  )
}

export default HoursPage
