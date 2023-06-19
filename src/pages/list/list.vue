<template>
  <my-tabbar @toIndex="toIndex" :home="2"></my-tabbar>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
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