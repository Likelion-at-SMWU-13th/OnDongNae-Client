// src/pages/menu/MenuPage.jsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import Title from '@/components/common/Title'
import RegisterOptions from '@/components/menuManagement/RegisterOptions'
import BottomNav from '@/components/common/BottomNav'
import RegisteredMenu from '@/components/menuManagement/RegisteredMenu'
import { authAxios } from '@/lib/authAxios'
import LargeOrangeButton from '@/components/common/LargeOrangeButton'

export const Main = styled.main`
  height: calc(100dvh - 155px);
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
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || ''

    if (!token) {
      setError('로그인이 필요합니다.')
      setLoading(false)
      return
    }

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
  }, [apiUrl])

  return (
    <div className='scrollable'>
      <Header img={backIcon} title={'메뉴 관리'} showImg={true} />
      <Main>
        <Scroll>
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
          {!loading && !error && menus.length > 0 && (
            <LargeOrangeButton label='메뉴 수정' onBtnClick={handleEdit} />
          )}{' '}
        </Scroll>
      </Main>
      <BottomNav />
    </div>
  )
}

export default MenuPage
