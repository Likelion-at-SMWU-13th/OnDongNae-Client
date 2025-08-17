import React from 'react'
import styled from 'styled-components'
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
  return <Content></Content>
}

export default CourseContent
const Content = styled.div`
  width: 330px;
  height: 143px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fdd8ca;
`
