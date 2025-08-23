import React from 'react'
import styled from 'styled-components'
import deleteButton from '@/assets/button-delete-picture.svg'

const DeletePopup = ({ onClose, onSubmit }) => {
  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>
          <CloseImg src={deleteButton} alt='닫기 버튼' />
        </CloseButton>
        <Message>탈퇴하시겠습니까?</Message>

        <ButtonGroup>
          {/* 취소 버튼 */}
          <CancelButton onClick={onClose}>취소</CancelButton>

          {/* 탈퇴 버튼 */}
          <DeleteButton onClick={onSubmit}>탈퇴</DeleteButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  )
}

export default DeletePopup

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const Modal = styled.div`
  position: relative;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  width: 88%;
  height: 256px;
  text-align: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  background: none;
  border: none;
`
const CloseImg = styled.img`
  width: 30px;
  height: 30px;
`
const Message = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 77px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 33px;
`

const Button = styled.button`
  border-radius: 10px;
  border: none;
  display: flex;
  padding: 14.5px 47.5px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`
const CancelButton = styled(Button)`
  background: #d6d6d6;
`

const DeleteButton = styled(Button)`
  background: #f08e67;
`
