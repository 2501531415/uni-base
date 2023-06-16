<template>
  <view class="content">
    <u-button type="primary" text="中文" @click="go"></u-button>
    <text class="text">{{$t('app.name')}}</text>
  </view>
  <loading ref="loadingRef"/>
  <foot-bar @toIndex="toIndex" :home="0"></foot-bar>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import {ref,unref,onMounted,nextTick} from 'vue'
  import footBar from '@/components/footBar/footBar.vue'
  
  const loadingRef = ref(null) 
   
  onLoad(()=>{
    uni.hideTabBar()
  })
  
  onMounted(()=>{
    loadingRef.value.done()
    setTimeout(()=>{
      loadingRef.value.stop()
    },3000)
  })
  
  const go = ()=>{
    
  }
  const toIndex = (index)=>{
  	if (index == 0) {
  		uni.switchTab({
  			url: '/pages/index/index'
  		})
  	} else if (index == 1) {
  		uni.switchTab({
  			url: '/pages/map/map'
  		})
  	} else if (index == 2) {
  		uni.switchTab({
  			url: '/pages/list/list'
  		})
  	} else if (index == 3) {
  		uni.switchTab({
  			url: '/pages/user/user'
  		})
  	}
  }
</script>

<style lang="scss" scoped>
.content{
  padding: 20rpx;
}
.text{
  color: #000;
}

@media(prefers-color-scheme:dark){
  .text{
    color: #fff;
  }
}
</style>
