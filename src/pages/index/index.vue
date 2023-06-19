<template>
  <view class="home">
    <image src="../../static/home/top.png" class="home-image"></image>
    <view class="home-box1">
      <view class="home-box1-item" v-for="(item,index) in card.list" :key="index">
        <image src="./../static/home/top.png" mode=""></image>
        <view class="home-box1-item-title">
          <text>{{item.title}}</text>
        </view>
        <view class="home-box1-item-desc">
          <text>{{item.desc}}</text>
        </view>
      </view>
    </view>
    <view class="home-box2">
      <view class="home-box2-item" v-for="(item,index) in card2.list" :key="index">
        <image src="./../static/home/top.png" mode=""></image>
        <view class="home-box2-item-title">
          <text>{{item.title}}</text>
        </view>
      </view>
    </view>
  </view>
  <my-loading ref="loadingRef"/>
  <my-tabbar @toIndex="toIndex" :home="0"></my-tabbar>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import {ref,onMounted,reactive} from 'vue'
  
  const loadingRef = ref(null)
  
  const card = reactive({
    list:[
      {link:'',title:'测试',desc:'我是描述',icon:''},
      {link:'',title:'测试',desc:'我是描述',icon:''}
    ]
  })
  const card2 = reactive({
     list:[
       {link:'',title:'测试',icon:''},
       {link:'',title:'测试',icon:''},
       {link:'',title:'测试',icon:''},
       {link:'',title:'测试',icon:''}
     ]
   })
  onLoad(()=>{
    uni.hideTabBar()
  })
  
  onMounted(()=>{
    loadingRef.value.done()
    setTimeout(()=>{
      loadingRef.value.stop()
    },3000)
  })
  
  const menuClick = (name)=>{
    uni.navigateTo({
      url: `${name}`
    })
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
.home{
  &-image{
    width: 100%;
    height: 500rpx!important;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
  }
  &-box1{
    display: flex;
    padding: 20rpx 40rpx;
    &-item{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      border-radius: 10rpx;
      padding: 20rpx 0rpx;
      background-color: #fff;
      box-shadow: 6rpx 6rpx 8rpx rgba(0, 0, 0, 0.1);
      &:nth-child(2n){
        margin-left: 20rpx;
      }
      &:nth-child(2n + 1){
        margin-right: 20rpx;
      }
      image{
        width:100rpx;
        height: 100rpx;
        border-radius: 10rpx;
      }
      &-title{
        font-size: 32rpx;
        font-weight: bold;
        padding: 20rpx 0rpx;
      }
      &-desc{
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  &-box2{
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 40rpx;
    &-item{
      width: calc(50% - 60rpx);
      display: flex;
      align-items: center;
      border-radius: 10rpx;
      padding: 20rpx;
      margin-bottom: 40rpx;
      background-color: #fff;
      box-shadow: 6rpx 6rpx 8rpx rgba(0, 0, 0, 0.1);
      &:nth-child(2n){
        margin-left: 20rpx;
      }
      &:nth-child(2n + 1){
        margin-right: 20rpx;
      }
      image{
        width:58rpx;
        height: 58rpx;
        border-radius: 10rpx;
      }
      &-title{
        font-size: 28rpx;
        margin-left: 20rpx;
      }
    }
  }
}

@media(prefers-color-scheme:dark){
  .text{
    color: #fff;
  }
}
</style>
