// src/pages/menu/MenuCorrectPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import authAxios from '@/lib/authAxios'
import Header from '@/components/common/Header'
import Title from '@/components/signup/Title'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import MenuCorrect from '@/components/menuManagement/MenuCorrect'
import BottomNav from '@/components/common/BottomNav'

const makeLocalId = () => `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const MenuCorrectPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const menus = location.state?.menus ?? [] // MenuPage에서 넘어온 state

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
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''
    const apiUrl = import.meta.env.VITE_API_URL
    const body = {
      items: working.map(({ menuId, nameKo, priceKrw }) => ({
        menuId: menuId ?? null,
        nameKo: (nameKo ?? '').trim(),
        priceKrw: Number(priceKrw ?? 0),
      })),
    }
    authAxios
      .put(`${apiUrl}/me/menus`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        navigate('/menu')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Header title='메뉴 관리' showImg={true} />
      <C.Main>
        <C.Scroll className='scrollable'>
          <TitleContainer>
            <Title text='메뉴를 수정해주세요' />
          </TitleContainer>
          <MenuCorrect
            items={working}
            onPatch={handlePatch}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
          <ButtonWrapper>
            <SmallButtonContainer prevLabel='취소' nextLabel='적용' handleSubmit={handleSubmit} />
          </ButtonWrapper>
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </>
  )
}

export default MenuCorrectPage

const TitleContainer = styled.div`
  padding: 38px 0 0 30px;
`
const ButtonWrapper = styled.div`
  margin-bottom: 40px;
`
