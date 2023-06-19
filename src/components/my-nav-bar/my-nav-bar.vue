<template>
	<view class="cum-header" :style="[{height:customBar + 'px'}]">
		<view class="cum-header-bar" :style="style" :class="[bgColor]">
			<view class="cum-header-action" @click="backPage" v-if="isBack">
        <view class="cum-header-action-icon">
          <u-icon name="arrow-left" :color="[bgColor?'#fff':'#000']" size="20"></u-icon>
        </view>
        <slot name="backText"></slot>
			</view>
			<view class="title">
				<slot name="title"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  
  const props = defineProps({
		bgColor: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: false
		}
	})
  
  const customBar = ref(0)
  const statusBar = ref(0)
  
  const style = computed(()=>{
    let style = `height:${customBar.value}px;padding-top:${statusBar.value}px;`;
    return style
  })
  
  onLoad(()=>{
    uni.getSystemInfo({
    	success: function(e) {
        statusBar.value = e.statusBarHeight
    		let capsule = uni.getMenuButtonBoundingClientRect();
    		if (capsule) {
    			customBar.value = capsule.bottom + capsule.top - e.statusBarHeight;
    		}
    	}
    })
  })
  
  const backPage = ()=>{
		if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
			let url = '/' + __wxConfig.pages[0]
			return uni.redirectTo({url})
		}
		uni.navigateBack({
			delta: 1
		});
	}
</script>

<style lang="scss" scoped>
.cum-header {
	display: block;
	position: fixed;
  top: 0;
  width: 100%;
  z-index: 1024;
  &-bar{
    position: relative;
    min-height: 0px;
    box-shadow: 0rpx 0rpx 0rpx;
    z-index: 9999;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
    .title{
      position: absolute;
      left: 50%;
      transform: translate(-50%,0%);
      width: calc(100% - 440rpx);
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
    }
  }
  &-action{
    display: flex;
    align-items: center;
    &-icon{
      margin-left:20rpx;
      margin-right:10rpx;
    }
  }
}
.bg-gradual-red {
	background-image: linear-gradient(45deg, #f43f3b, #ec008c);
	color: #ffffff;
}

.bg-gradual-orange {
	background-image: linear-gradient(45deg, #ff9700, #ed1c24);
	color: #ffffff;
}

.bg-gradual-green {
	background-image: linear-gradient(45deg, #39b54a, #8dc63f);
	color: #ffffff;
}

.bg-gradual-purple {
	background-image: linear-gradient(45deg, #663399, #5e00ff);
	color: #ffffff;
}

.bg-gradual-pink {
	background-image: linear-gradient(45deg, #ec008c, #6739b6);
	color: #ffffff;
}

.bg-gradual-blue {
	background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
	color: #ffffff;
}
</style>
