import React from 'react'
import { WholeBar, BackBar, FillBar, Logo } from '../../styles/signup/ProgressBar.styles.js'

function ProgressBar({ currentStep = 1, totalSteps = 6, logoImg }) {
  const total = Math.max(1, totalSteps)
  const step = Math.min(Math.max(1, currentStep), total)

  // 6단계라면 1→0%, 2→20%, …, 6→100%
  const percent = total > 1 ? ((step - 1) / (total - 1)) * 100 : 100

  return (
    // 바 역할임을 컴포넌트에 부여
    <WholeBar role='progressbar' aria-valuemin={1} aria-valuemax={total} aria-valuenow={step}>
      <BackBar>
        <FillBar style={{ width: `${percent}%` }} />
      </BackBar>

      {/* 마스코트: 진행 위치에 맞춰 좌표만 계산 */}
      {logoImg && (
        <Logo
          src={logoImg}
          alt='로고'
          // 로고 가로 28px이므로 14px 만큼 보정
          style={{ left: `calc(${percent}% - 14px)` }}
        />
      )}
    </WholeBar>
  )
}

export default ProgressBar
