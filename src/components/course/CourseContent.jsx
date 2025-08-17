import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const MOCK_CONTENT = [
  {
    code: 'OK',
    message: '요청이 성공했습니다.',
    success: true,
    data: [
      {
        id: 2,
        courseTitle: 'A meeting with friends enjoying local flavors',
        courseDescription: 'Precious time with friends exploring local eateries',
        storeNames: ['Oh!', 'Egg and Flower', "Eong-i's jjukkumi"],
      },
      {
        id: 3,
        courseTitle: '"Exploring Hidden Restaurants in Haebangchon and Yongsan"',
        courseDescription:
          '"Enjoy a special time with your friends at local restaurants in Haebangchon and Yongsan."',
        storeNames: ['Oh!', "Eong-i's jjukkumi", 'GIL BAR DAK'],
      },
      {
        id: 9,
        courseTitle: 'Taste exploration of Yongsan with friends',
        courseDescription: 'A special time exploring the taste and beauty of Yongsan with friends!',
        storeNames: ["Eong-i's jjukkumi", 'Egg and Flower', 'GIL BAR DAK'],
      },
    ],
  },
]

const CourseContent = () => {
  const navigate = useNavigate()
  const [courses] = useState(MOCK_CONTENT[0].data)

  return (
    <ContentWrapper>
      {courses.map((course) => (
        <Card key={course.id} onClick={() => navigate(`/user/map/store/${course.id}`)}>
          <MetaInfo>
            <Author>{course.courseTitle}</Author>
            <Time>{course.courseDescription}</Time>
          </MetaInfo>
          <CommentTxt>{course.storeNames.join(', ')}</CommentTxt>
        </Card>
      ))}
    </ContentWrapper>
  )
}

export default CourseContent

// 전체 리스트 컨테이너
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 카드 간격 */
`

// 코스별 개별 카드
const Card = styled.div`
  width: 330px;
  min-height: 143px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fdd8ca; /* 주황색 */
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f8c4b6;
  }
`

const MetaInfo = styled.div`
  margin-bottom: 5px;
`

const Author = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #1a0f0f;
`

const Time = styled.div`
  font-size: 12px;
  color: #6c6c6c;
`

const CommentTxt = styled.div`
  font-size: 14px;
  color: #1a0f0f;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
  font-weight: 500;
  &:hover {
    color: #f08e67;
    text-decoration: underline;
  }
`
