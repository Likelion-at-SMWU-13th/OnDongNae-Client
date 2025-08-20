import React from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import CourseOption from '@/components/course/CourseOption'
const CourseAI = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [selected, setSelected] = useState({
    marketId: null,
    withOptionId: null,
    atmosphereOptionId: null,
  })

  const handleGenerate = () => {
    // 버튼 3개가 다 선택된 경우에만 이동
    const { marketId, withOptionId, atmosphereOptionId } = selected
    if (marketId && withOptionId && atmosphereOptionId) {
      navigate('/user/course/loading', { state: selected })
    } else {
      alert('옵션을 모두 선택해주세요!')
    }
  }

  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <CourseOption />
      <CustomerBottomNav />
    </div>
  )
}

export default CourseAI
