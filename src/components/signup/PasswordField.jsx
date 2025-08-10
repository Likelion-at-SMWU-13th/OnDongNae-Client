import React, { useState } from 'react'
import styled from 'styled-components'

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Text = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`

// 비밀번호 / 확인 입력창을 감싸는 박스
const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 304px;
  border: 2px solid #b3b3b3;
  border-radius: 10px;
  overflow: hidden;
`

// 입력창 스타일
const Input = styled.input`
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 13.5px 20px;
  border: none;
  outline: none;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }

  &:not(:last-child) {
    border-bottom: 2px solid #b3b3b3;
  }
`

// 에러 문구
const ErrorMessage = styled.p`
  font-size: 14px;
  color: #ff5a5a;
  margin: 2px 0 0 10px;
  min-height: 18px; /* 항상 공간 확보 */
  visibility: hidden;
`

// visible 클래스일 때만 보이기
const VisibleErrorMessage = styled(ErrorMessage)`
  visibility: visible;
`

function PasswordField() {
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')

  const showError = confirm.length > 0 && pw !== confirm

  return (
    <Container>
      <Text>비밀번호</Text>
      <PasswordContainer data-error={showError}>
        <Input
          type='password'
          placeholder='숫자/특수문자 혼합, 4자'
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <Input
          type='password'
          placeholder='비밀번호를 한 번 더 입력해주세요.'
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </PasswordContainer>
      {showError ? (
        <VisibleErrorMessage>비밀번호가 일치하지 않습니다.</VisibleErrorMessage>
      ) : (
        <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
      )}{' '}
    </Container>
  )
}

export default PasswordField
