<template>
  <foot-bar @toIndex="toIndex" :home="1"></foot-bar>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import footBar from '@/components/footBar/footBar.vue'
  onLoad(()=>{
    uni.hideTabBar()
  })
  
  const toIndex = (index)=>{
  	if (index == 0) {
  		uni.switchTab({
  			url: '/pages/index/index'
  		})
  	} else if (index == 1) {
  		uni.switchTab({
  			url: '/pages/ucenter/ucenter'
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