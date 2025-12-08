import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  locale: 'vi',

  // translations
  messages: {
    en: {
      hello: 'Hi there. Welcome to ',
    },
    vi: {
      hello: 'Chào bạn. Chào mừng đến với ',
    },
  },
})

export default i18n
