import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import circleCheckOff from '@/assets/icon-circle-check-off.svg'
import checkOff from '@/assets/icon-check-off.svg'
import circleCheckOn from '@/assets/icon-circle-check-on.svg'
import checkOn from '@/assets/icon-check-on.svg'

// 필수 항목 모두 선택되었는지 전달
function TermsAgreement({ onRequiredChange, onViewClick }) {
  const [agreements, setAgreements] = useState({
    all: false, // 모두 선택
    term1: false, // 필수
    term2: false, // 필수
    term3: false, // 필수
    term4: false,
    term5: false,
  })

  // 필수 항목 모두 체크되었는지 확인
  const requiredOK = agreements.term1 && agreements.term2 && agreements.term3

  useEffect(() => {
    onRequiredChange?.(requiredOK)
  }, [requiredOK, onRequiredChange])

  // 전체 동의 클릭 시, 모든 버튼 동일하게 세팅
  const toggleAll = () => {
    const next = !agreements.all
    setAgreements({
      all: next,
      term1: next,
      term2: next,
      term3: next,
      term4: next,
      term5: next,
    })
  }

  // 개별항목 클릭 시
  const toggleOne = (key) => {
    setAgreements((prev) => {
      const nextValue = !prev[key]
      const next = { ...prev, [key]: nextValue }
      const everyOn = next.term1 && next.term2 && next.term3 && next.term4 && next.term5
      next.all = everyOn // 전부 켜지면 all=true, 하나라도 꺼지면 all=false
      return next
    })
  }

  const handleView = (key) => {
    // 약관 팝업창 보여주기
    onViewClick?.(key)
  }

  return (
    <TermsContainer>
      {/* 전체 동의 */}
      <BigTermRow>
        <CheckImage
          src={agreements.all ? circleCheckOn : circleCheckOff}
          alt='전체 동의'
          onClick={toggleAll}
        />
        약관 전체 동의
      </BigTermRow>

      {/* 개별 항목들*/}
      <TermRow>
        <CheckImage
          src={agreements.term1 ? checkOn : checkOff}
          alt='[필수] 서비스명 이용약관 동의'
          onClick={() => toggleOne('term1')}
        />
        [필수] 서비스명 이용약관 동의
        <ViewLink onClick={() => handleView('term1')}>보기</ViewLink>
      </TermRow>

      <TermRow>
        <CheckImage
          src={agreements.term2 ? checkOn : checkOff}
          alt='[필수] 만 14세 이상 서비스 이용 동의'
          onClick={() => toggleOne('term2')}
        />
        [필수] 만 14세 이상 서비스 이용 동의
        <ViewLink onClick={() => handleView('term2')}>보기</ViewLink>
      </TermRow>

      <TermRow>
        <CheckImage
          src={agreements.term3 ? checkOn : checkOff}
          alt='[필수] 개인정보 수집 / 이용 동의'
          onClick={() => toggleOne('term3')}
        />
        [필수] 개인정보 수집 / 이용 동의
        <ViewLink onClick={() => handleView('term3')}>보기</ViewLink>
      </TermRow>

      <TermRow>
        <CheckImage
          src={agreements.term4 ? checkOn : checkOff}
          alt='[선택] 광고성 정보 수신 동의'
          onClick={() => toggleOne('term4')}
        />
        [선택] 광고성 정보 수신 동의
        <ViewLink onClick={() => handleView('term4')}>보기</ViewLink>
      </TermRow>

      <TermRow>
        <CheckImage
          src={agreements.term5 ? checkOn : checkOff}
          alt='[선택] 마케팅 정보 수신 동의'
          onClick={() => toggleOne('term5')}
        />
        [선택] 마케팅 정보 수신 동의
        <ViewLink onClick={() => handleView('term5')}>보기</ViewLink>
      </TermRow>
    </TermsContainer>
  )
}

export default TermsAgreement

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`
const BigTermRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  font-size: 1.25rem;
  font-weight: 400;
`
const TermRow = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding-left: 2px;
  font-size: 1.125rem;
  font-weight: 400;
`
const CheckImage = styled.img`
  cursor: pointer;
`
const ViewLink = styled.span`
  cursor: pointer;
  color: #b3b3b3;
  font-size: 1.125rem;
  text-decoration: underline;
`
