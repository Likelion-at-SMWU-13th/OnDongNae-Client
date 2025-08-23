import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ALLERGEN_LIST = [
  ['알류(계란)', '아황산류'],
  ['우유', '호두'],
  ['메밀', '닭고기'],
  ['땅콩', '소고기'],
  ['대두', '오징어'],
  ['밀(글루텐)', '조개류'],
  ['고등어', '잣'],
  ['게', '생선'],
  ['새우', '참깨'],
  ['돼지고기', '유제품'],
  ['복숭아', '견과류'],
  ['토마토', '감귤류'],
]

export default function Allergens({ isOpen, onClose, selectedAllergens = [], onConfirm }) {
  // 한글 라벨로 관리
  const [selected, setSelected] = useState(new Set(selectedAllergens))

  // 모달이 열릴 때마다 최신 props로 동기화
  useEffect(() => {
    if (isOpen) setSelected(new Set(selectedAllergens))
  }, [isOpen, selectedAllergens])

  const toggle = (label) => {
    const next = new Set(selected)
    next.has(label) ? next.delete(label) : next.add(label)
    setSelected(next)
  }

  const handleConfirm = () => {
    onConfirm(Array.from(selected)) // 한글 배열 그대로 부모에 전달
    onClose()
  }

  const handleCancel = () => {
    setSelected(new Set(selectedAllergens)) // 원복
    onClose()
  }

  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>알레르기 성분</Title>
        <Grid>
          {ALLERGEN_LIST.map(([left, right]) => (
            <Row key={left}>
              {[left, right].map((label) => (
                <Item key={label}>
                  <Checkbox
                    type='checkbox'
                    id={`al-${label}`}
                    checked={selected.has(label)}
                    onChange={() => toggle(label)}
                  />
                  <Label htmlFor={`al-${label}`} $checked={selected.has(label)}>
                    {label}
                  </Label>
                </Item>
              ))}
            </Row>
          ))}
        </Grid>

        <Btns>
          <BtnGray onClick={handleCancel}>취소</BtnGray>
          <BtnOrange onClick={handleConfirm}>확인</BtnOrange>
        </Btns>
      </Modal>
    </Overlay>
  )
}
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`
const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`
const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 30px;
`
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #ff6b35;
  cursor: pointer;
`
const Label = styled.label`
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  color: ${(p) => (p.$checked ? '#ff6b35' : '#000')};
`
const Btns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`
const Button = styled.button`
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`
const BtnGray = styled(Button)`
  background: #e0e0e0;
  color: #555;
`
const BtnOrange = styled(Button)`
  background: #ff6b35;
  color: #fff;
`
