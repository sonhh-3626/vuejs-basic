import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  locale: 'vi',

  // translations
  messages: {
    en: {
      hello: 'Hi there. Welcome to ',
      slogan: 'Stop looking for an item — find it.',
      haveNoProduct:'Sorry, we can\'t find any matches to your query!',
      tryResetFilters: 'Please try another query.',
      clearFilter: 'Clear filter',
    },
    vi: {
      hello: 'Chào bạn. Chào mừng đến với ',
      slogan: 'Đừng tìm kiếm một món đồ — hãy tìm thấy nó.',
      haveNoProduct:'Xin lỗi, chúng tôi không thể tìm thấy bất kỳ kết quả nào cho truy vấn của bạn!',
      tryResetFilters: 'Hãy thử đặt lại các bộ lọc bạn đã áp dụng.',
      clearFilter: 'Xóa bộ lọc',
    },
  },
})

export default i18n
