<template>
<view class="bottom">
    <view :class="[{'nav-tab-active':home===0},'bottom-item']" @click="toIndex(0)">
      <u-icon :name="home===0?'/static/tabbar/home_art.png':'/static/tabbar/home.png'" size="25"></u-icon>
      <text>{{$t('app.name')}}</text>
    </view>
    <view :class="[{'nav-tab-active':home===1},'bottom-item']" @click="toIndex(1)">
      <u-icon :name="home===1?'/static/tabbar/center_art.png':'/static/tabbar/center.png'" size="25"></u-icon>
      <text>分类</text>
    </view>
    <view :class="[{'nav-tab-active':home===4},'xm_tg','bottom-item']">
      <view @click="toIndex(4)">
        <view class="bottom-add">
          <u-icon :name="home === 4?'/static/tabbar/tougao_art.png':'/static/tabbar/tougao.png'" size="25" class="icontg" ></u-icon>
        </view>
      </view>
    </view>
    <view :class="[{'nav-tab-active':home===2},'bottom-item']" @click="toIndex(2)">
      <u-icon :name="home===2?'/static/tabbar/find_art.png':'/static/tabbar/find.png'" size="25"></u-icon>
      <text>榜单</text>
    </view>
    <view :class="[{'nav-tab-active':home===3},'bottom-item']" @click="toIndex(3)">
      <u-icon :name="home===3?'/static/tabbar/user_art.png':'/static/tabbar/user.png'" size="25"></u-icon>
      <text>我的</text>
    </view>
  </view>
</template>
<script setup>
  const props = defineProps({
    home:{
      type:Number
    }
  })
  const emits = defineEmits(['toIndex'])
  
  const toIndex = (index)=>{
    emits('toIndex',index)
  }
</script>

<style lang="scss" scoped>
.bottom {
	border-top:1px solid #eee;
	padding:8px 0;
	background:#fff;
	position:fixed;
	bottom:0;
	width:100%;
	height:70px;
	z-index:999999;
  display: flex;
  &-item{
    width:20%;
    text-align:center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text{
      overflow:hidden;
      font-size:12px;
      height:16px;
      line-height:16px;
      color:#888
    }
  }
  &-add{
    width: 60px;
    height: 40px;
    border-radius: 10px;
    padding:0;
    background-color: $u-primary;
    display: flex;
    justify-content: center;
  }
}
</style>