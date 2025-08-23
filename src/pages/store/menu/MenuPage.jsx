// src/pages/menu/MenuPage.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as C from '@/styles/common/CustomerBottomNav.styles'
import authAxios from '@/lib/authAxios'
import Header from '@/components/common/Header'
import Title from '@/components/common/Title'
import RegisterOptions from '@/components/menuManagement/RegisterOptions'
import RegisteredMenu from '@/components/menuManagement/RegisteredMenu'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'
import BottomNav from '@/components/common/BottomNav'

function MenuPage() {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleEdit = () => {
    navigate('/menu/correct', { state: { menus } })
  }

  useEffect(() => {
    const onFocus = () => fetchMenus() // 메뉴 수정 후 재렌더링
    window.addEventListener('focus', onFocus)
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''

    authAxios
      .get(`${apiUrl}/me/menus`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const list = Array.isArray(res?.data?.data) ? res.data.data : []
        setMenus(list)
      })
      .catch((err) => {
        const status = err?.response?.status
        if (status === 401) setError('토큰이 유효하지 않습니다. 다시 로그인해 주세요.')
        else if (status === 404) setError('가게 또는 사용자를 찾을 수 없어요.')
        else setError('메뉴를 불러오지 못했어요.')
      })
      .finally(() => setLoading(false))
    return () => window.removeEventListener('focus', onFocus)
  }, [fetchMenus])

  return (
    <div className='scrollable'>
      <Header title={'메뉴 관리'} showImg={false} />
      <C.Main>
        <C.Scroll>
          <RegisterMenuSection>
            <Title text={'메뉴판을 등록해주세요'} />
            <RegisterOptions
              onUploadClick={() => navigate('/menu/upload')}
              onManualClick={() => navigate('/menu/manual')}
            />
          </RegisterMenuSection>
          <MenuList>
            <Title text={'등록된 메뉴'} />
            {loading && <LoadingComment>불러오는 중…</LoadingComment>}
            {error && <LoadingComment>{error}</LoadingComment>}
            {!loading && !error && menus.length === 0 && (
              <LoadingComment>등록된 메뉴가 없어요.</LoadingComment>
            )}

            {!loading &&
              !error &&
              menus.map((m) => (
                <RegisteredMenu
                  key={m.menuId}
                  nameKo={m.nameKo}
                  priceKrw={m.priceKrw}
                  allergies={m.allergies ?? []}
                />
              ))}
          </MenuList>
          <ButtonWrapper>
            {!loading && !error && menus.length > 0 && (
              <LargeOrangeButton label='메뉴 수정' onBtnClick={handleEdit} />
            )}{' '}
          </ButtonWrapper>
        </C.Scroll>
      </C.Main>
      <BottomNav />
    </div>
  )
}

export default MenuPage
const RegisterMenuSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 38px 30px 50px 30px;
  gap: 17px;
`
const MenuList = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 0px 30px;
  gap: 35px;
`

const LoadingComment = styled.div`
  text-align: center;
  padding-bottom: 30px;
`

const ButtonWrapper = styled.div`
  margin-bottom: 40px;
`
