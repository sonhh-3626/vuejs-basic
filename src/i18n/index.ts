import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  locale: 'vi',

  // translations
  messages: {
    en: {
      hello: 'Hi there. Welcome to ',
      slogan: 'Stop looking for an item — find it.',
      haveNoProduct:'No products found',
    },
    vi: {
      hello: 'Chào bạn. Chào mừng đến với ',
      slogan: 'Đừng tìm kiếm một món đồ — hãy tìm thấy nó.',
      haveNoProduct:'Không tìm thấy sản phẩm nào',
    },
  },
})

export default i18n
