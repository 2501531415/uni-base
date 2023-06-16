import {defineStore} from 'pinia'
import {store} from '@/store'
import {i18n} from '@/utils/locale.js'

export const useLocaleStore = defineStore('locale',{
  state:()=>{
    return {
      locale:uni.getStorageSync('locale') || uni.getLocale() ||'zh-Hans'
    }
  },
  actions:{
    changeLocale(locale){
      const localeList = []
      const modules = import.meta.glob('../../locale/*.json')
      for(const key in modules){
        const moduleName = key.replace(/^\..\/\..\/(.*)\.\w+$/, '$1');
        localeList.push(moduleName.split('/')[1])
      }
      if(localeList.includes(locale)){
        this.locale = locale
        // 切换语言
        i18n.global.locale = locale
      }
    }
  }
})

// setup外部js使用
export function useLocaleStoreWithout(){
  return useLocaleStore(store)
}