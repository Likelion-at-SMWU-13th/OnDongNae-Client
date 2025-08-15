import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import clockIcon from '@/assets/icon-small-clock.svg'
import downIcon from '@/assets/icon-down-arrow.svg'

const Section = styled.section`
  padding: 20px 25px 15px 25px;
  flex: display;
  flex-direction: column;
  gap: 11px;
`

const Name = styled.h2`
  color: #000;
  font-size: 22px;
  font-weight: 700;
`

const KorName = styled.span`
  margin-left: 5px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
`

const TimeInfo = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`

const Img = styled.img``

const OpenInfo = styled.div`
  padding-left: 5px;
  color: #f08e67;
  font-feature-settings: 'dlig' on;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`

const CloseInfo = styled.span`
  color: #000;
  font-feature-settings: 'dlig' on;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`
const ArrowButton = styled.button`
  margin-left: 3px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;

  img {
    transition: transform 0.2s ease;
  }
  // 이미지 회전 효과
  &[data-expanded='true'] img {
    transform: rotate(180deg);
  }
`

const Card = styled.div`
  padding: 10px 93px 20px 23px;
`

const Day = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 22px;
`

const DayText = styled.span`
  color: #000;
`

const ClosedText = styled.span`
  color: #999;
`

const TimeText = styled.span`
  color: #000;
`
const ShortIntro = styled.p`
  color: #0d141c;
  font-feature-settings: 'dlig' on;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 10px;
`
const dayMap = {
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
  SUN: 'Sunday',
}

export default function HeaderSection({ header }) {
  const { t } = useTranslation()

  const [expanded, setExpanded] = useState(false) // 시간정보 기본 닫힘

  const statusText = useMemo(() => {
    const isOpen = header?.status?.open // 오늘 오픈 여부
    const closeAt = header?.status?.todayCloseTime // 종료 시간
    const openAt = header?.status?.todayOpenTime // 시작 시간

    if (header?.status?.todayClosed) return '· Closed today'
    if (isOpen && closeAt) return `· Closes ${closeAt}`
    if (!isOpen && openAt) return `· Opens ${openAt}`
    return ''
  }, [header])

  return (
    <Section>
      <Name>
        {header?.name} <KorName>{header?.nameKo}</KorName>
      </Name>
      <TimeInfo>
        <Img src={clockIcon} />
        <OpenInfo>{header?.status?.isOpen ? 'Open' : 'Closed'}</OpenInfo>
        <CloseInfo>{statusText}</CloseInfo>

        <ArrowButton type='button' data-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          <img src={downIcon} alt='' />
        </ArrowButton>
      </TimeInfo>

      {/* 펼침 영역: 주간 영업시간 */}
      {expanded && (
        <Card>
          {(header?.weeklyHours || []).map((row, idx) => {
            const dayKey = `day.${(row?.day || '').toUpperCase()}`
            const dayLabel = t(dayKey, { defaultValue: row?.day || '' }) // 번역 없으면 코드 그대로 표시

            return (
              <Day key={idx}>
                <DayText>{dayLabel}</DayText>
                {row.closed ? (
                  <ClosedText>Closed</ClosedText>
                ) : (
                  <TimeText>
                    {row.open} ~ {row.close}
                  </TimeText>
                )}
              </Day>
            )
          })}
        </Card>
      )}
      {header?.shortIntro && <ShortIntro>{header.shortIntro}</ShortIntro>}
    </Section>
  )
}
