// CourseRecommend.jsx
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import SubTitle from '@/components/signup/SubTitle'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import styled from 'styled-components'

function Btn({ active, children, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      style={{
        height: '37px',
        padding: '10px 12px',
        borderRadius: 10,
        border: active ? 'none' : '1px solid #B3B3B3', // 선택 시 테두리 제거
        background: active ? '#F08E67' : '#fff',
        color: active ? '#fff' : '#000', // 선택 시 글자색
        fontSize: '14px',
        margin: '5px 10px 5px 0',
        cursor: 'pointer',
        whiteSpace: 'nowrap', // 한 버튼 내 줄바꿈 방지
        transition: 'background-color 0.2s, border-color 0.2s',
        outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

export default function CourseOption() {
  const { t } = useTranslation()
  const [markets, setMarkets] = useState([])
  const [options, setOptions] = useState([])
  const [sel, setSel] = useState({
    marketId: null,
    withOptionId: null,
    atmosphereOptionId: null,
  })
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  // 데이터 GET (시장 + 옵션)
  useEffect(() => {
    alert('로딩 중입니다!') // 연동 후 삭제

    axios
      .get(`${apiUrl}/courses/options`, {
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        setMarkets(res.data?.data?.market)
        setOptions(res.data?.data?.option)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  // 옵션 분리: With(1~7), Atmosphere(8~13)
  const withOptions = useMemo(() => options.filter((o) => o.id >= 1 && o.id <= 7), [options])
  const atmosphereOptions = useMemo(() => options.filter((o) => o.id >= 8 && o.id <= 13), [options])
  //  세 값이 모두 선택됐는지 여부
  const allSelected = Boolean(sel.marketId && sel.withOptionId && sel.atmosphereOptionId)

  // Generate 클릭 → Loading 페이지로 state 넘기기
  const handleGenerate = () => {
    const { marketId, withOptionId, atmosphereOptionId } = sel
    if (marketId && withOptionId && atmosphereOptionId) {
      navigate('/user/course/AI/loading', { state: sel })
    } else {
      alert(t('course.selectAll') || '옵션을 모두 선택해주세요!')
    }
  }

  return (
    <div>
      {/* Market */}
      <div style={{ padding: '22px 40px 0 22px', marginBottom: '8px' }}>
        <SubTitle text={t('course.selectMarket')} />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 40px',
          marginBottom: '40px',
        }}
      >
        {markets.map((m) => (
          <Btn
            key={m.id}
            active={sel.marketId === m.id}
            onClick={() => setSel((s) => ({ ...s, marketId: m.id }))}
          >
            {m.name}
          </Btn>
        ))}
      </div>

      {/* With (1~7) */}
      <div style={{ padding: '0 40px', marginBottom: '8px' }}>
        <SubTitle text={t('course.with')} />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 40px',
          marginBottom: '40px',
        }}
      >
        {withOptions.map((w) => (
          <Btn
            key={w.id}
            active={sel.withOptionId === w.id}
            onClick={() => setSel((s) => ({ ...s, withOptionId: w.id }))}
          >
            {w.name}
          </Btn>
        ))}
      </div>

      {/* Atmosphere (8~13) */}
      <div style={{ padding: '0 40px', marginBottom: '8px' }}>
        <SubTitle text={t('course.atmosphere')} />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 40px',
          marginBottom: '40px',
        }}
      >
        {atmosphereOptions.map((a) => (
          <Btn
            key={a.id}
            active={sel.atmosphereOptionId === a.id}
            onClick={() => setSel((s) => ({ ...s, atmosphereOptionId: a.id }))}
          >
            {a.name}
          </Btn>
        ))}
      </div>
      <ButtonWrapper>
        <LargeOrangeButton
          label={t('button.generate')}
          onBtnClick={handleGenerate}
          disabled={!allSelected}
        />
      </ButtonWrapper>
    </div>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
