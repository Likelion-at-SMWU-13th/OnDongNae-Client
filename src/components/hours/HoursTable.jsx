import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const MOCK_HOURS_RESPONSE = {
  code: 'OK',
  message: '영업시간 조회 성공',
  success: true,
  data: {
    storeName: '온동네 떡볶이',
    items: [
      { day: 'MON', open: '11:00', close: '23:00', closed: false },
      { day: 'TUE', open: '11:00', close: '23:00', closed: false },
      { day: 'WED', open: '09:00', close: '23:00', closed: false },
      { day: 'THU', open: '11:00', close: '23:00', closed: false },
      { day: 'FRI', open: '17:00', close: '23:00', closed: false },
      { day: 'SAT', open: '11:00', close: '23:00', closed: false },
      { day: 'SUN', open: null, close: null, closed: true },
    ],
  },
}

const DAY_KO = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
}

const TitleWrapper = styled.div`
  padding: 38px 30px 20px 30px;
  width: 390px;
  font-size: 25px;
  font-weight: 600;
`

const HourTableWrapper = styled.div`
  display: flex;
  padding: 0 0 27px 30px;
`

const HoursTable = () => {
  const [hoursData] = useState(MOCK_HOURS_RESPONSE.data)
  return (
    <div>
      <TitleWrapper>
        <span>{hoursData.storeName}</span>
        <span>의 영업시간이에요</span>
      </TitleWrapper>
      {hoursData.items.map((item, index) => (
        <HourTableWrapper key={index}>
          <span style={{ paddingRight: `30px` }}>{DAY_KO[item.day]}</span>
          <span>{item.closed ? '휴무' : `${item.open} - ${item.close}`}</span>
        </HourTableWrapper>
      ))}
    </div>
  )
}

export default HoursTable
