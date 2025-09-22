// CourseRecommend.jsx
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import authAxios from '@/lib/authAxios'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import LoadingSpinner from '@/components/common/Loading'

function Btn({ active, children, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      style={{
        height: '37px',
        padding: '10px 12px',
        borderRadius: '30px',
        border: active ? '1px solid #F08E67' : '1px solid #B3B3B3', // 선택 시 테두리 제거
        background: active ? '#F08E67' : '#fff',
        color: active ? '#fff' : '#000',
        fontSize: '14px',
        margin: '5px 10px 5px 0',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.2s, border-color 0.2s',
        outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

export default function CourseOption() {
  const { t, i18n } = useTranslation()
  const [markets, setMarkets] = useState([])
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sel, setSel] = useState({
    marketId: null,
    withOptionId: null,
    atmosphereOptionId: null,
  })
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  // 데이터 GET (시장 + 옵션)
  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0]
    setLoading(true)
    setError(null)
    authAxios
      .get(`${apiUrl}/courses/options`, {
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        setMarkets(Array.isArray(res.data?.data?.market) ? res.data.data.market : [])
        setOptions(Array.isArray(res.data?.data?.option) ? res.data.data.option : [])
      })
      .catch((err) => {
        setError(t('course.fail') || '불러오는 데에 실패했습니다')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <LoadingSpinner text={t('course.connect')} />
  if (error) return <Empty>{error}</Empty>
  if (!markets.length && !options.length) return <Empty>{t('course.fail')}</Empty>

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
      alert(t('course.option') || '옵션을 모두 선택해주세요!')
    }
  }

  return (
    <div>
      {/* Market */}
      <div>
        <SubtitleText>{t('course.selectMarket')}</SubtitleText>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 40px',
          marginBottom: '20px',
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
      <div>
        <SubtitleText>{t('course.with')}</SubtitleText>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 40px',
          marginBottom: '20px',
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
      <div>
        <SubtitleText>{t('course.atmosphere')}</SubtitleText>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 40px',
          marginBottom: '100px',
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
  margin-bottom: 40px;
`
const SubtitleText = styled.p`
  display: flex;
  text-align: left;
  padding: 20px 0 5px 39px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.408px;
`
const Empty = styled.p`
  padding: 24px 16px;
  color: #777;
  font-size: 14px;
  text-align: center;
`
