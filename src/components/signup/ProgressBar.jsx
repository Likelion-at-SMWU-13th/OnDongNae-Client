import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { WholeBar, BackBar, FillBar, Logo } from '../../styles/signup/ProgressBar.styles.js'

function ProgressBar({ currentStep = 1, totalSteps = 6, logoImg }) {
  const total = Math.max(1, totalSteps)
  const clamp = (n) => Math.min(Math.max(1, n), total)
  const step = clamp(currentStep)

  // 바 퍼센트 표시
  const toPercent = total > 1 ? ((step - 1) / (total - 1)) * 100 : 100

  // 이전 페이지에서 넘겨준 prevStep 사용 (애니메이션 사용))
  const { state } = useLocation()
  const prevStep = clamp(state?.prevStep ?? step)
  const fromPercent = total > 1 ? ((prevStep - 1) / (total - 1)) * 100 : 100

  const [animPercent, setAnimPercent] = useState(fromPercent)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimPercent(toPercent))
    return () => cancelAnimationFrame(id)
  }, [toPercent])

  return (
    <WholeBar role='progressbar' aria-valuemin={1} aria-valuemax={total} aria-valuenow={step}>
      <BackBar>
        <FillBar style={{ width: `${animPercent}%` }} />
      </BackBar>

      {logoImg && (
        <Logo src={logoImg} alt='로고' style={{ left: `calc(${animPercent}% - 14px)` }} />
      )}
    </WholeBar>
  )
}

export default ProgressBar
