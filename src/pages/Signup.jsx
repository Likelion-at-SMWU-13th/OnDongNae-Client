import PageContainer from '@/components/common/PageContainer'
import React from 'react'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import ProgressBar from '@/components/signup/ProgressBar'
import smallDragon from '@/assets/logo-smalldragon.svg'

const Signup = () => {
  return (
    <PageContainer>
      <Header img={backIcon} title={'회원가입'} showImg={true}></Header>
      <ProgressBar currentStep={2} totalSteps={6} logoImg={smallDragon} />
    </PageContainer>
  )
}

export default Signup
