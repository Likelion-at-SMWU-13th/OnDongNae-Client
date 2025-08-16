// 시장/카테고리/가게 정보 임시 데이터
// 연동 후 삭제 필요

/*영어 버전*/
// Temporary data for markets/categories/stores
// TODO: Remove after API integration

const dummyData = {
  code: 'OK',
  message: 'Request succeeded.',
  success: true,
  data: {
    marketOptions: [
      { name: 'Yongsan Yongmun Market', id: 1 },
      { name: 'Itaewon Market', id: 2 },
      { name: 'Huam Traditional Market', id: 3 },
      { name: 'Malli Market', id: 4 },
      { name: 'Haebangchon Sinheung Market', id: 5 },
    ],
    categoryOptions: [
      {
        mainCategoryId: 1,
        mainCategoryName: 'Agricultural & Food Products',
        subCategories: [
          { name: 'Fruits & Vegetables', id: 1 },
          { name: 'Seafood', id: 2 },
          { name: 'Meat & Livestock', id: 3 },
          { name: 'Grains', id: 4 },
          { name: 'Side Dishes (Banchan)', id: 5 },
          { name: 'Rice Cakes & Bakery', id: 6 },
        ],
      },
      {
        mainCategoryId: 2,
        mainCategoryName: 'Restaurants & Cafés',
        subCategories: [
          { name: 'Korean Cuisine', id: 7 },
          { name: 'Korean Street Food', id: 8 },
          { name: 'Sashimi & Seafood', id: 9 },
          { name: 'International Cuisine', id: 10 },
          { name: 'Fusion', id: 11 },
          { name: 'Cafés & Tea', id: 12 },
        ],
      },
      {
        mainCategoryId: 3,
        mainCategoryName: 'Pubs & Bars',
        subCategories: [
          { name: 'Korean Tavern', id: 13 },
          { name: 'Beer Hall', id: 14 },
          { name: 'Bar', id: 15 },
          { name: 'Izakaya', id: 16 },
        ],
      },
      {
        mainCategoryId: 4,
        mainCategoryName: 'General Goods & Household',
        subCategories: [
          { name: 'Clothing & Shoes', id: 17 },
          { name: 'General Goods', id: 18 },
          { name: 'Home Goods', id: 19 },
        ],
      },
      {
        mainCategoryId: 5,
        mainCategoryName: 'Souvenirs · Traditional Crafts · Hanbok · Local Specialties',
        subCategories: [
          { name: 'Souvenir Shop', id: 20 },
          { name: 'Hanbok & Traditional Wear', id: 21 },
          { name: 'Handicrafts', id: 22 },
          { name: 'Accessory Shop', id: 23 },
        ],
      },
      {
        mainCategoryId: 6,
        mainCategoryName: 'Services & Others',
        subCategories: [],
      },
    ],
    randomStores: [
      {
        id: 18,
        name: 'Egg & Flower',
        isOpen: false,
        subCategories: ['International Cuisine'],
        address: '35, Sinheung-ro 26-gil, Yongsan-gu, Seoul',
        phone: '0507-1328-7681',
        //image: 'https://gorugoru-bucket/main.png',
      },
      {
        id: 5,
        name: 'Seoul Guk-tang 2',
        isOpen: false,
        subCategories: ['Meat & Livestock', 'Fruits & Vegetables'],
        address: '100, Cheongpa-ro 47-gil, Yongsan-gu, Seoul',
        phone: '010-0000-0000',
        //image: 'https://gorugoru-bucket/main.png',
      },
      {
        id: 12,
        name: 'Egg and Flower',
        isOpen: false,
        subCategories: ['Meat & Livestock', 'Fruits & Vegetables'],
        address: '35, Sinheung-ro 26-gil, Yongsan-gu, Seoul',
        phone: '0507-1328-7681',
        //image: 'https://gorugoru-bucket/main.png',
      },
    ],
  },
}

export default dummyData

/*중국어 버전
const dummyData = {
  code: 'OK',
  message: '요청이 성공했습니다.',
  success: true,
  data: {
    marketOptions: [
      { name: '龙山龙门市场', id: 1 },
      { name: '梨泰院市场', id: 2 },
      { name: '厚岩传统市场', id: 3 },
      { name: '万里市场', id: 4 },
      { name: '解放村新兴市场', id: 5 },
    ],
    categoryOptions: [
      {
        mainCategoryId: 1,
        mainCategoryName: '农水产品・食品',
        subCategories: [
          { name: '果蔬', id: 1 },
          { name: '水产・海鲜', id: 2 },
          { name: '肉类・畜产', id: 3 },
          { name: '谷物', id: 4 },
          { name: '配菜', id: 5 },
          { name: '年糕・烘焙点心', id: 6 },
        ],
      },
      {
        mainCategoryId: 2,
        mainCategoryName: '餐厅・咖啡馆',
        subCategories: [
          { name: '韩国料理', id: 7 },
          { name: '韩国小吃', id: 8 },
          { name: '生鱼片・海鲜', id: 9 },
          { name: '各国料理', id: 10 },
          { name: '融合料理', id: 11 },
          { name: '咖啡馆・茶饮', id: 12 },
        ],
      },
      {
        mainCategoryId: 3,
        mainCategoryName: '酒馆・酒吧',
        subCategories: [
          { name: '韩式传统酒馆', id: 13 },
          { name: '啤酒馆', id: 14 },
          { name: '酒吧', id: 15 },
          { name: '居酒屋', id: 16 },
        ],
      },
      {
        mainCategoryId: 4,
        mainCategoryName: '杂货・生活用品',
        subCategories: [
          { name: '服装・鞋类', id: 17 },
          { name: '生活杂货', id: 18 },
          { name: '家居用品', id: 19 },
        ],
      },
      {
        mainCategoryId: 5,
        mainCategoryName: '纪念品・传统工艺・韩服・特产',
        subCategories: [
          { name: '纪念品店', id: 20 },
          { name: '韩服・传统服饰', id: 21 },
          { name: '工艺品', id: 22 },
          { name: '小物店', id: 23 },
        ],
      },
      {
        mainCategoryId: 6,
        mainCategoryName: '服务・其他',
        subCategories: [],
      },
    ],
    randomStores: [
      {
        id: 18,
        name: '蛋与花',
        isOpen: false,
        subCategories: ['各国料理'],
        address: '首尔 龙山区 新兴路26街 35号',
        phone: '0507-1328-7681',
        image: 'https://gorugoru-bucket/main.png',
      },
      {
        id: 5,
        name: '首尔国汤2',
        isOpen: false,
        subCategories: ['肉类・畜产', '果蔬'],
        address: '首尔特别市龙山区清坡路47街100',
        phone: '010-0000-0000',
        image: 'https://gorugoru-bucket/main.png',
      },
      {
        id: 12,
        name: '蛋和花',
        isOpen: false,
        subCategories: ['肉类・畜产', '果蔬'],
        address: '首尔龙山区新兴路26街35号',
        phone: '0507-1328-7681',
        image: 'https://gorugoru-bucket/main.png',
      },
    ],
  },
}

export default dummyData */
