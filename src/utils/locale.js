import { createI18n } from 'vue-i18n'
import {useLocaleStoreWithout} from '@/store/modules/locale.js'
import en from '@/locale/en.json'
import zhHans from '@/locale/zh-Hans.json'

const messages = {
	en,
	'zh-Hans': zhHans
}

const store = useLocaleStoreWithout()

let i18nConfig = {
  locale: store.locale,// 获取已设置的语言
  messages
}

export const i18n = createI18n(i18nConfig)

export default function setupI18n(app){
  app.use(i18n)
}