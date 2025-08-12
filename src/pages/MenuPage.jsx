import React, { useState } from 'react'
import styled from 'styled-components'
// import PageContainer from '@/components/common/PageContainer'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'

function MenuPage() {
  return (
    <>
      <Header img={backIcon} title={'메뉴 이름 등록'} showImg={true}></Header>
    </>
  )
}

export default MenuPage
