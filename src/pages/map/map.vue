<template>
  <view class="map">
    <map :longitude="map.longitude" :latitude="map.latitude" :markers="map.markers" :scale="14" class="map-size" :enable-traffic="true" @tap="mapTap">
    </map>
  </view>
  <foot-bar @toIndex="toIndex" :home="1"></foot-bar>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { reactive} from 'vue'
  import footBar from '@/components/footBar/footBar.vue'
  
  const map = reactive({
    longitude:"",
    latitude:"",
    markers:[]
  })
  onLoad(()=>{
    uni.hideTabBar()
    getLocation()
  })
  
  const getLocation = ()=>{
    uni.getLocation({
    	type: 'gcj02',
    	success: function (res) {
        const {longitude,latitude} = res
        map.longitude = longitude
        map.latitude = latitude
        const marker = {
          id:0,
          longitude:longitude,
          latitude:latitude,
          iconPath: '/static/common/avatar.png',
          width: 48,
          height: 48,
          label:{
            borderRadius:8,
            borderWidth:4,
            borderColor:'#fff',
            width:52,
            height:52,
            anchorX:-24,
            anchorY:-52,
          }
          
        }
        const marker2 = {
          id:1,
          longitude:longitude,
          latitude:latitude,
          iconPath: '/static/common/position.png',
          width: 80,
          height: 80,
        }
        map.markers.push(marker)
        map.markers.push(marker2)
    	}
    });
  }
  
  
  
  const mapTap = (e)=>{
    console.log(e)
  }
  
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

<style lang="scss" scoped>
.map{
  &-size{
    width: 100%;
    height: calc(100vh - 87px);
  }
}
  
</style>