// src/pages/menu/MenuCorrectPage.jsx
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import BottomNav from '@/components/common/BottomNav'
import Title from '@/components/signup/Title'
import { useNavigate } from 'react-router-dom'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import MenuCorrect from '@/components/menuManagement/MenuCorrect'
// import axios from 'axios'

// ✅ 디자인만 먼저 보기: 목데이터 스위치
const USE_MOCK = true

// ✅ 목데이터 (서버 응답 형태와 유사)
const MOCK = [
  { menuId: 1, nameKo: '김치찌개', priceKrw: 8000 },
  { menuId: 2, nameKo: '계란말이', priceKrw: 7000 },
]

// ❌ 지금은 안 씀 (연동 시에만 켜기)
// const API = import.meta.env.VITE_API_URL

// ✅ 로컬 행 식별용 ID (신규행 구분)
const makeLocalId = () => `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const MenuCorrectPage = () => {
  const navigate = useNavigate()

  // (참고) 기존 코드 유지 — 지금은 미사용. 디자인만 확인할 땐 working을 사용해 렌더링
  const [items, setItems] = useState([])

  const [loading, setLoading] = useState(false) // GET 로딩
  const [error, setError] = useState(null) // GET 에러

  // 서버 원본 + 작업본
  const [original, setOriginal] = useState([]) // [{menuId,nameKo,priceKrw}]
  const [working, setWorking] = useState([]) // [{localId,menuId|null,nameKo,priceKrw,isEditing}]

  // ✅ 최초 조회 (목데이터로 화면 채우기)
  useEffect(() => {
    if (USE_MOCK) {
      // 기존 코드 유지 (필요시 확인용)
      setItems(MOCK)

      // 디자인 확인용으로 original/working 초기화
      setOriginal(MOCK)
      setWorking(
        MOCK.map((m) => ({
          localId: makeLocalId(),
          menuId: m.menuId ?? null,
          nameKo: m.nameKo ?? '',
          priceKrw: Number(m.priceKrw ?? 0),
          isEditing: false,
        })),
      )
      return
    }

    // ❌ 연동은 나중에 — 필요 시 주석 해제
    // ;(async () => {
    //   setLoading(true)
    //   setError(null)
    //   try {
    //     const res = await axios.get(`${API}/me/menus`)
    //     const list = Array.isArray(res.data?.data) ? res.data.data : []
    //     setOriginal(list)
    //     setWorking(
    //       list.map((m) => ({
    //         localId: makeLocalId(),
    //         menuId: m.menuId ?? null,
    //         nameKo: m.nameKo ?? '',
    //         priceKrw: Number(m.priceKrw ?? 0),
    //         isEditing: false,
    //       })),
    //     )
    //   } catch (e) {
    //     console.error(e)
    //     setError('메뉴를 불러오지 못했습니다.')
    //   } finally {
    //     setLoading(false)
    //   }
    // })()
  }, [])

  // ✅ “메뉴 추가” (MenuCorrect에서 호출)
  const handleAdd = () => {
    setWorking((prev) => [
      ...prev,
      { localId: makeLocalId(), menuId: null, nameKo: '', priceKrw: 0, isEditing: true },
    ])
  }

  // ✅ 개별 행 수정(인라인)
  const handlePatch = (localId, patch) => {
    setWorking((prev) => prev.map((row) => (row.localId === localId ? { ...row, ...patch } : row)))
  }

  // ✅ 행 삭제
  const handleDelete = (localId) => {
    setWorking((prev) => prev.filter((row) => row.localId !== localId))
  }

  // 변경 여부(선택 기능)
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

  // ✅ “적용(저장)” — 지금은 네비게이션만, 추후 연동 시 axios.put 활성화
  const handleSubmit = async () => {
    const body = {
      items: working.map(({ menuId, nameKo, priceKrw }) => ({
        menuId: menuId ?? null,
        nameKo: (nameKo ?? '').trim(),
        priceKrw: Number(priceKrw ?? 0),
      })),
    }

    try {
      if (USE_MOCK) {
        console.log('PUT /me/menus payload (mock):', body)
        navigate('/menu/extract/save') // ✅ 디자인 확인용 화면 전환
        return
      }

      // ❌ 연동은 나중에 — 필요 시 주석 해제
      // await axios.put(`${API}/me/menus`, body, { headers: {/* Authorization 등 필요 시 */} })
      // navigate('/menu/extract/save')
    } catch (e) {
      console.error(e)
      alert('저장에 실패했습니다.')
    }
  }

  if (loading) return <div>불러오는 중…</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <div className='scrollable'>
        <Header img={backIcon} title='메뉴 관리' showImg />
        <Main>
          <Scroll>
            <TitleContainer>
              <Title text='메뉴를 수정해주세요' />
            </TitleContainer>
            {/* ✅ 디자인 확인: working을 내려서 보여줌 */}
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
              // disabled={!isDirty} // 변경 없을 때 비활성화하려면 주석 해제
            />
          </Scroll>
        </Main>
        <BottomNav />
      </div>
    </>
  )
}

export default MenuCorrectPage

const TitleContainer = styled.div`
  padding: 38px 0 0 30px;
`
export const Main = styled.main`
  height: calc(100dvh - 160px); /* 화면 높이 채우기 */
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간을 차지 */
  min-height: 0; /* 내부에 overflow가 먹히게 하는 핵심 */
  /* overflow-y는 전역 .scrollable에서 적용됨 */
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 80px);
`
