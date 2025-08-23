import React, { useMemo, useState } from 'react'
import { hhmmToPicker, pickerToHhmm } from '@/utils/pageedittime'
import { useNavigate } from 'react-router-dom'
import { authAxios } from '@/lib/authAxios'
import Header from '@/components/common/Header'
import DoubleTitle from '@/components/common/DoubleTitle'
import backIcon from '@/assets/button-back.svg'
import styled from 'styled-components'
import HoursEditRow, { CellBtn } from '@/components/hours/HoursEditRow'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import TimePickerModal from '@/components/hours/TimePickerModal'
import BottomNav from '@/components/common/BottomNav'

const DAY_KO = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
}
const ORDER = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Title = styled.div`
  padding: 20px 30px 8px;
  font-size: 18px;
  font-weight: 800;
`
const Sub = styled.div`
  padding: 0 30px 12px;
  color: #666;
`

const Btn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 0;
  font-weight: 700;
`

const Content = styled.div`
  flex: 1; /* Header+DoubleTitle+BottomNav 제외하고 남은 영역 */
  overflow-y: auto; /* 세로 스크롤 */
  padding-bottom: 95px; /* BottomNav 높이만큼 여백 */
`

const HoursEditPage = () => {
  // 1) 요일별 상태
  const [items, setItems] = useState(() =>
    ORDER.map((day) => ({ day, open: null, close: null, closed: false })),
  )

  // 2) 상단 공통 시간 (ALL)
  const [commonOpen, setCommonOpen] = useState('  :  ')
  const [commonClose, setCommonClose] = useState('  :  ')

  const applyAll = () => {
    setItems((prev) =>
      prev.map((it) => (it.closed ? it : { ...it, open: commonOpen, close: commonClose })),
    )
  }

  // 3) 모달 — 상단/하단 공용 (day: 'ALL' 또는 'MON'..)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerField, setPickerField] = useState(null) // { day: 'ALL'|'MON'.., field: 'open'|'close' }
  const [pickerValue, setPickerValue] = useState(hhmmToPicker('09:00'))

  const openPicker = (day, field, hhmm) => {
    setPickerField({ day, field })
    setPickerValue(hhmmToPicker(hhmm))
    setPickerOpen(true)
  }

  const confirmPicker = () => {
    const hhmm = pickerToHhmm(pickerValue)

    // 상단 ALL 인가?
    if (pickerField.day === 'ALL') {
      if (pickerField.field === 'open') setCommonOpen(hhmm)
      if (pickerField.field === 'close') setCommonClose(hhmm)
      setPickerOpen(false)
      return
    }

    // 요일별
    setItems((prev) =>
      prev.map((it) => (it.day === pickerField.day ? { ...it, [pickerField.field]: hhmm } : it)),
    )
    setPickerOpen(false)
  }

  const toggleClosed = (day, checked) => {
    setItems((prev) =>
      prev.map((it) =>
        it.day === day
          ? checked
            ? { ...it, closed: true, open: null, close: null }
            : { ...it, closed: false }
          : it,
      ),
    )
  }

  // 4) 저장 payload
  const payload = useMemo(
    () => ({
      items: items.map(({ day, open, close, closed }) => ({
        day,
        open: closed ? null : open,
        close: closed ? null : close,
        closed,
      })),
    }),
    [items],
  )
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  // 5) 저장 버튼
  const handleSubmit = () => {
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
    console.log('PUT payload', payload)

    authAxios
      .put(`${apiUrl}/me/business-hours`, payload)
      .then((res) => {
        navigate('/hours')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const LargeOrangeButtonWarpper = styled.div`
    display: flex;
    margin: 0 auto 45px auto;
  `
  const SmallButtonContainerWrapper = styled.div`
    margin: 60px 0 40px 0;
  `
  return (
    <PageWrap>
      <Content>
        <Header img={backIcon} title='영업 시간' showImg />
        <DoubleTitle
          title='영업시간을 수정해주세요'
          subtitle={
            <>
              영업일이 모두 같다면,
              <br />
              시간을 고른 후 '모두 적용'을 눌러주세요.
            </>
          }
        />
        {/* 상단 공통 시간 — CellBtn 재사용 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '27px 21px 30px 30px',
          }}
        >
          <div
            style={{
              paddingBottom: '15px',
            }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '18px',
                paddingRight: '15px',
              }}
            >
              시작 시간
            </span>
            <CellBtn onClick={() => openPicker('ALL', 'open', commonOpen)}>
              {commonOpen ?? '--:--'}
            </CellBtn>
            <span></span>
          </div>
          <div>
            <span
              style={{
                fontWeight: 600,
                fontSize: '18px',
                paddingRight: '15px',
              }}
            >
              마감 시간
            </span>
            <CellBtn onClick={() => openPicker('ALL', 'close', commonClose)}>
              {commonClose ?? '--:--'}
            </CellBtn>
          </div>
        </div>
        <LargeOrangeButtonWarpper>
          <LargeOrangeButton label='모두 적용' onBtnClick={applyAll}></LargeOrangeButton>
        </LargeOrangeButtonWarpper>
        <div
          style={{
            fontWeight: 600,
            fontSize: '18px',
            padding: '0 0 0 111px',
          }}
        >
          <span
            style={{
              paddingRight: '39px',
            }}
          >
            시작 시간
          </span>
          <span
            style={{
              paddingRight: '30px',
            }}
          >
            마감 시간
          </span>
          <span>휴무일</span>
        </div>
        {/* 요일별 */}
        {items.map((it) => (
          <HoursEditRow
            key={it.day}
            label={DAY_KO[it.day]}
            item={it}
            onOpenClick={() => openPicker(it.day, 'open', it.open)}
            onCloseClick={() => openPicker(it.day, 'close', it.close)}
            onClosedToggle={(checked) => toggleClosed(it.day, checked)}
          />
        ))}
        <SmallButtonContainerWrapper>
          <SmallButtonContainer
            handleSubmit={handleSubmit}
            prevLabel='취소'
            nextLabel='저장'
          />{' '}
        </SmallButtonContainerWrapper>

        {/* 공용 모달 */}
        {pickerOpen && (
          <TimePickerModal
            title='시간 선택'
            value={pickerValue}
            onChange={setPickerValue}
            onCancel={() => setPickerOpen(false)}
            onConfirm={confirmPicker}
          />
        )}
      </Content>
      <BottomNav />
    </PageWrap>
  )
}
export default HoursEditPage
