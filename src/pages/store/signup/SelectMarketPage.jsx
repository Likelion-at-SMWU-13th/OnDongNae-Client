import React, { useState } from 'react'
import * as S from '@/styles/signup/SelectMarketPage.styles'
import * as C from '@/styles/common/SignupScroll.styles'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'
import Title from '@/components/signup/Title'
import SelectButton from '@/components/signup/SelectButton'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'

const SelectMarketPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState(null)

  const markets = [
    { id: 1, name: '용산용문시장' },
    { id: 2, name: '이태원시장' },
    { id: 3, name: '후암재래시장' },
    { id: 4, name: '만리시장' },
    { id: 5, name: '해방촌 신흥시장' },
  ]

  // 다음 클릭 시
  const handleSubmit = () => {
    if (!id) {
      alert('시장을 선택해주세요.')
      return
    }
    const marketName = (markets.find((m) => m.id === id)?.name ?? '').replace(/\s+/g, '')
    sessionStorage.setItem('marketName', marketName)
    navigate('/signup/store-name')
  }

  return (
    <>
      <Header img={backIcon} title={'회원가입'} showImg={false} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <ProgressBar currentStep={3} totalSteps={6} logoImg={smallDragon} />
          <S.Container>
            <S.TextContainer>
              <Title text={'가게가 위치한 시장을 선택해주세요'} />
            </S.TextContainer>
            <S.ButtonContainer>
              <SelectButton options={markets} value={id} onChange={setId} />
            </S.ButtonContainer>

            <SmallButtonContainer handleSubmit={handleSubmit}></SmallButtonContainer>
          </S.Container>
        </C.Scroll>
      </C.Main>
    </>
  )
}

export default SelectMarketPage
