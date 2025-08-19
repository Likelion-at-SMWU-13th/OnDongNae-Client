// src/pages/menu/MenuCorrectPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Title from '@/components/signup/Title'
import { useLocation, useNavigate } from 'react-router-dom'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import MenuCorrect from '@/components/menuManagement/MenuCorrect'

const makeLocalId = () => `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const MenuCorrectPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const menus = location.state?.menus ?? [] // MenuPage에서 넘어온 state

  // 서버 원본 + 작업본
  const [original, setOriginal] = useState([])
  const [working, setWorking] = useState([])

  useEffect(() => {
    setOriginal(menus)
    setWorking(
      menus.map((m) => ({
        localId: makeLocalId(),
        menuId: m.menuId ?? null,
        nameKo: m.nameKo ?? '',
        priceKrw: Number(m.priceKrw ?? 0),
        isEditing: false,
      })),
    )
  }, [menus])

  const handleAdd = () => {
    setWorking((prev) => [
      ...prev,
      { localId: makeLocalId(), menuId: null, nameKo: '', priceKrw: 0, isEditing: true },
    ])
  }

  const handlePatch = (localId, patch) => {
    setWorking((prev) => prev.map((row) => (row.localId === localId ? { ...row, ...patch } : row)))
  }

  const handleDelete = (localId) => {
    setWorking((prev) => prev.filter((row) => row.localId !== localId))
  }

  const isDirty = useMemo(() => {
    const a = original.map((x) => ({
      menuId: x.menuId ?? null,
      nameKo: x.nameKo ?? '',
      priceKrw: Number(x.priceKrw ?? 0),
    }))
    const b = working.map((x) => ({
      menuId: x.menuId ?? null,
      nameKo: x.nameKo ?? '',
      priceKrw: Number(x.priceKrw ?? 0),
    }))
    return JSON.stringify(a) !== JSON.stringify(b)
  }, [original, working])

  const handleSubmit = () => {
    const body = {
      items: working.map(({ menuId, nameKo, priceKrw }) => ({
        menuId: menuId ?? null,
        nameKo: (nameKo ?? '').trim(),
        priceKrw: Number(priceKrw ?? 0),
      })),
    }
    console.log('PUT payload:', body)
    navigate('/menu/extract/save')
  }

  return (
    <div className='scrollable'>
      <Header img={backIcon} title='메뉴 관리' showImg />
      <Main>
        <Scroll>
          <TitleContainer>
            <Title text='메뉴를 수정해주세요' />
          </TitleContainer>
          <MenuCorrect
            items={working}
            onPatch={handlePatch}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
          <SmallButtonContainer
            prevLabel='취소'
            nextLabel='적용'
            handleSubmit={handleSubmit}
            // disabled={!isDirty}
          />
        </Scroll>
      </Main>
      <BottomNav />
    </div>
  )
}

export default MenuCorrectPage

const TitleContainer = styled.div`
  padding: 38px 0 0 30px;
`
export const Main = styled.main`
  height: calc(100dvh - 160px);
  display: flex;
  flex-direction: column;
  min-height: 0;
`
export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
