import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  locale: 'vi',

  // translations
  messages: {
    en: {
      hello: 'Hi there. Welcome to ',
      slogan: 'Stop looking for an item — find it.',
<<<<<<< HEAD
      haveNoProduct:'No products found',
=======
      haveNoProduct:'Sorry, we can\'t find any matches to your query!',
      tryResetFilters: 'Please try another query.',
>>>>>>> e155209 (Basic UI - Search with router and pinia)
    },
    vi: {
      hello: 'Chào bạn. Chào mừng đến với ',
      slogan: 'Đừng tìm kiếm một món đồ — hãy tìm thấy nó.',
<<<<<<< HEAD
      haveNoProduct:'Không tìm thấy sản phẩm nào',
=======
      haveNoProduct:'Xin lỗi, chúng tôi không thể tìm thấy bất kỳ kết quả nào cho truy vấn của bạn!',
      tryResetFilters: 'Hãy thử đặt lại các bộ lọc bạn đã áp dụng.',
>>>>>>> e155209 (Basic UI - Search with router and pinia)
    },
  },
})

export default i18n
