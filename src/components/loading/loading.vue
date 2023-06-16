<template>
  <view class="load-progress" :class="loadProgress!=0?'show':'hide'" :style="[{top:customBar+'px'}]">
    <view class="load-progress-bar"
      :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  
  const props = defineProps({
    isCustom:{
      type:Boolean,
      default:false
    }
  })

  const customBar = ref(0)
  const status = ref(false) // 进度条状态
  const loadProgress = ref(0)

  onLoad(()=>{
    uni.getSystemInfo({
    	success: function(e) {
    		let capsule = uni.getMenuButtonBoundingClientRect();
    		if (capsule && props.isCustom) {
    			customBar.value = capsule.bottom + capsule.top - e.statusBarHeight;
    		}
    	}
    })
  })
  
  const done = ()=>{
    if(status.value)return;
    loadProgress.value += 3;
    if (loadProgress.value < 100) {
      setTimeout(() => {
        done();
      }, 100)
    }
  }
  
  const stop = ()=>{
    loadProgress.value = 0
    status.value = true
  }
  
  defineExpose({
    done,stop
  })
</script>

<style lang="scss" scoped>
  .load-progress {
    pointer-events: none;
    top: 0;
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 2000;
    &.hide {
      display: none;
    }
    &-bar {
      position: relative;
      width: 100%;
      height: 6rpx;
      overflow: hidden;
      background-color: $u-primary;
      transition: all 200ms ease 0s;
    }
  }
</style>
