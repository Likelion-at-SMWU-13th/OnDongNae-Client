'use client'

import { useMemo, useState } from 'react'
import styled from 'styled-components'
import SmallButtonContainer from '@/components/common/SmallButtonContainer'
import Allergens from './Allergens'
import { authAxios } from '@/lib/authAxios'
/** 한글 ↔ 영문 canonical 매핑 (백엔드 표 기준) */
const KO_TO_EN = {
  '알류(계란)': 'Eggs',
  우유: 'Milk',
  메밀: 'Buckwheat',
  땅콩: 'Peanuts',
  대두: 'Soy',
  '밀(글루텐)': 'Wheat (Gluten)',
  고등어: 'Mackerel',
  게: 'Crab',
  새우: 'Shrimp',
  돼지고기: 'Pork',
  복숭아: 'Peach',
  토마토: 'Tomato',
  아황산류: 'Sulfites',
  호두: 'Walnuts',
  닭고기: 'Chicken',
  소고기: 'Beef',
  오징어: 'Squid',
  조개류: 'Shellfish',
  잣: 'Pine Nuts',
  생선: 'Fish',
  참깨: 'Sesame',
  유제품: 'Dairy',
  견과류: 'Tree Nuts',
  갑각류: 'Crustaceans',
}
const EN_TO_KO = Object.fromEntries(Object.entries(KO_TO_EN).map(([k, v]) => [v, k]))

export default function AllergensEdit({ initialResults = [], onSaved }) {
  const apiUrl = import.meta.env.VITE_API_URL

  // 초기값 정리: allergiesKo가 없고 allergiesCanonical만 있으면 한글로 역매핑해서 채움
  const normalizedInitial = useMemo(
    () =>
      (initialResults || []).map((m) => {
        const ko =
          Array.isArray(m.allergiesKo) && m.allergiesKo.length
            ? m.allergiesKo
            : Array.isArray(m.allergiesCanonical)
              ? m.allergiesCanonical.map((en) => EN_TO_KO[en]).filter(Boolean)
              : []
        const en = Array.isArray(m.allergiesCanonical)
          ? m.allergiesCanonical
          : ko.map((k) => KO_TO_EN[k]).filter(Boolean)
        return { ...m, allergiesKo: ko, allergiesCanonical: en }
      }),
    [initialResults],
  )

  const [menus, setMenus] = useState(normalizedInitial)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentMenuIndex, setCurrentMenuIndex] = useState(null)

  const handleEditClick = (idx) => {
    setCurrentMenuIndex(idx)
    setModalOpen(true)
  }

  // 모달 확인 → 한글/영문 동시 업데이트
  const handleAllergenConfirm = (selectedKo) => {
    if (currentMenuIndex === null) return
    const selectedEn = selectedKo.map((k) => KO_TO_EN[k]).filter(Boolean)

    setMenus((prev) =>
      prev.map((m, i) =>
        i === currentMenuIndex
          ? { ...m, allergiesKo: selectedKo, allergiesCanonical: selectedEn }
          : m,
      ),
    )
    setModalOpen(false)
    setCurrentMenuIndex(null)
  }

  // 저장: 영문 canonical로 전송
  const handleSave = async () => {
    const menuAllergies = menus.reduce((acc, m) => {
      acc[String(m.menuId)] = Array.isArray(m.allergiesCanonical) ? m.allergiesCanonical : []
      return acc
    }, {})

    if (!Object.keys(menuAllergies).length) {
      alert('보낼 데이터가 없어요.')
      return
    }

    const token = localStorage.getItem('accessToken') || ''
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      const res = await authAxios.post(
        `${apiUrl}/me/menus/allergens/apply`,
        { menuAllergies },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      console.log('save OK:', res.data)
      onSaved?.()
    } catch (err) {
      console.error('save ERR:', err?.response?.status, err?.response?.data)
      alert('저장 실패!')
    }
  }

  return (
    <div>
      {menus.map((m, idx) => {
        const allergyText = (m.allergiesKo ?? []).join(', ')
        return (
          <Row key={m.menuId}>
            <MenuAllergens>
              <NameKo>{m.nameKo}</NameKo>
              <AllergiesDisplay>{allergyText || '알레르기 성분 없음'}</AllergiesDisplay>
            </MenuAllergens>

            <SmallLightOrangeButton type='button' onClick={() => handleEditClick(idx)}>
              수정
            </SmallLightOrangeButton>
          </Row>
        )
      })}

      <Allergens
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        /* 현재 메뉴의 '한글' 배열을 그대로 넘김 → 모달에서 즉시 체크 표시 */
        selectedAllergens={
          currentMenuIndex !== null ? (menus[currentMenuIndex]?.allergiesKo ?? []) : []
        }
        onConfirm={handleAllergenConfirm}
      />

      <ButtonWapper>
        <SmallButtonContainer handleSubmit={handleSave} />
      </ButtonWapper>
    </div>
  )
}

/* ===== styles ===== */
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  align-items: start;
  column-gap: 12px;
  padding: 40px 30px 0 30px;
`
const MenuAllergens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
const NameKo = styled.div`
  color: #000;
  font-size: 19px;
  font-weight: 500;
  line-height: 1.3;
`
const AllergiesDisplay = styled.div`
  color: #7c7c7c;
  font-size: 18px;
  font-weight: 400;
  padding: 2px 0;
  min-height: 22px;
`
const SmallLightOrangeButton = styled.button`
  border-radius: 10px;
  background: #feb99d;
  border: none;
  width: 80px;
  height: 39px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`
const ButtonWapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 60px;
`
