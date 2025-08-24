// src/components/hours/HoursTable.jsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { authAxios } from '@/lib/authAxios'

export default function HoursTable() {
  const apiUrl = import.meta.env.VITE_API_URL
  const [hoursData, setHoursData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    authAxios
      .get(`${apiUrl}/me/business-hours`)
      .then((res) => {
        if (!mounted) return
        setHoursData(res?.data?.data ?? null)
      })
      .catch((err) => {
        if (!mounted) return
        const status = err?.response?.status
        const serverMsg = err?.response?.data?.message
        console.error('GET /me/business-hours ERROR:', status, err?.response?.data || err)
        setError(serverMsg || `불러오기 실패 (${status ?? '알 수 없음'})`)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [apiUrl])

  if (loading) return null
  if (error) return <div style={{ padding: '30px' }}>{error}</div>
  if (!hoursData || !Array.isArray(hoursData.items) || hoursData.items.length === 0) {
    return (
      <>
        <TitleWrapper>
          <span>{hoursData.storeName}</span>
          <span>의 영업시간이에요</span>
        </TitleWrapper>
        <div style={{ paddingLeft: '30px', fontSize: '18px', fontWeight: 400 }}>
          아직 설정된 영업시간이 없어요.
        </div>
      </>
    )
  }

  return (
    <div>
      <TitleWrapper>
        <span>{hoursData.storeName}</span>
        <span>의 영업시간이에요</span>
      </TitleWrapper>

      {(hoursData.items ?? []).map((item, idx) => (
        <HourTableWrapper key={idx}>
          <span>{DAY_KO[item.day] ?? item.day}</span>
          <span>{item.closed ? '휴무' : `${item.open} - ${item.close}`}</span>
        </HourTableWrapper>
      ))}
    </div>
  )
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
  font-size: 23px;
  font-weight: 600;
`

const HourTableWrapper = styled.div`
  display: flex;
  padding: 0 0 27px 30px;
  gap: 30px;
`
