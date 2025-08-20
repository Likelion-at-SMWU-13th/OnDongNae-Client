import styled from 'styled-components'
import Header from '@/components/common/Header'
import backIcon from '@/assets/button-back.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Spinner from '@/assets/icon-spinner.svg'
import SubTitle from '@/components/signup/SubTitle'
import CustomerBottomNav from '@/components/common/CustomerBottomNav'
import axios from 'axios'

// {
//     "code": "OK",
//     "message": "요청이 성공했습니다.",
//     "success": true,
//     "data": {
//         "id": 12,
//         "title": "在首尔龙山区与朋友一起探索当地美食",
//         "description": "这个课程由在首尔龙山区可以与朋友一起享受的当地美食店组成。我们选择了一些适合和喜欢韩餐的朋友一起访问的气氛好的店铺。每家店都有独特的个性和口味，使与亲密朋友的时光更加特别。",
//         "recommendedCourseStores": [
//             {
//                 "name": "翁伊家小章鱼",
//                 "longDescription": "位于首尔龙山区的‘翁家章鱼’是一家专门提供韩餐的餐厅，以铁板烧章鱼而闻名。这里以其令人上瘾的味道受到许多顾客的喜爱，并且作为当地的美食店在社区居民中口碑极佳。如果您想享受辛辣又鲜美的章鱼，欢迎光临‘翁家章鱼’！",
//                 "shortDescription": "鱻禧家章鱼小丸子：令人上瘾的铁板章鱼小丸子美食店",
//                 "order": 1,
//                 "imageUrl": "https://gorugoru-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png"
//             },
//             {
//                 "name": "一张饼干煎饼",
//                 "longDescription": "位于首尔龙山区的汉江饼屋是一家餐厅/咖啡馆，特别专注于韩餐。店里使用美味新鲜的食材提供各种菜单。老板推荐的人气菜单包括蒸梭鱼和鸡炖汤，不仅有传统的饼饼，还有各种韩式料理可以体验。这里的氛围非常适合与朋友一起享用美食，度过悠闲的时光。",
//                 "shortDescription": "「韩江扁食 - 用新鲜材料制作的美食店」",
//                 "order": 2,
//                 "imageUrl": "https://gorugoru-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png"
//             },
//             {
//                 "name": "哦！",
//                 "longDescription": "“Oit”是一家位于首尔龙山区新兴路的餐厅兼咖啡馆，拥有对咖啡的强烈自信。这家咖啡馆以其时尚的现代氛围而自豪，也正是许多常客光顾的原因。不仅咖啡品质上乘，顾客至上的服务也是它的一大优点，非常适合在舒适的环境中与朋友闲聊或独自享受时光。请与各种茶饮一同享受美好的对话，忘却一天的疲惫。",
//                 "shortDescription": "位于首尔龙山区的现代咖啡馆‘欧伊特’因其美味的咖啡和舒适的氛围而受到常客的喜爱。",
//                 "order": 3,
//                 "imageUrl": "https://gorugoru-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png"
//             }
//         ]
//     }
// }

const CourseLoading = () => {
  const { t } = useTranslation()
  const { state } = useLocation()
  const apiUrl = import.meta.env.VITE_API_URL
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  console.log(state) // 연동 후 삭제
  // { marketId: 5, withOptionId: 2, atmosphereOptionId: 9 }

  useEffect(() => {
    axios
      .post(`${apiUrl}/courses/recommend`, state, {
        headers: { 'Accept-Language': lang },
      })
      .then((res) => {
        navigate('/user/course/result', { state: res.data.data })
      })
      .catch((err) => {
        console.error(err)
        navigate('/user/course/AI/fail')
      })
  }, [])

  return (
    <div>
      <Header img={backIcon} title={t('bottomNav.course')} showImg={false} />
      <ContentWrapper>
        <SpinnerIcon src={Spinner} alt='로딩중' />
        <SubTitle text={t('course.loading')} />
      </ContentWrapper>
      <CustomerBottomNav />
    </div>
  )
}
export default CourseLoading

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SpinnerIcon = styled.img`
  margin: 164px 0 40px 0;
  width: 119px;
`
