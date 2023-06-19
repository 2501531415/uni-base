<template>
  <view class="login-wrap">
    <canvas canvas-id="star_canvas" class="mycanvas"
      :style="'width:' + screenWidth + 'px;height:' + screenHeight + 'px;'"></canvas>

    <view class="login">

      <view class="login__wrapper">
        <!-- 登录/注册切换 -->
        <view class="login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
          <view class="login__mode__item tn-flex-1" :class="[{'login__mode__item--active': currentModeIndex === 0}]"
            @tap.stop="modeSwitch(0)">
            登录
          </view>
          <view class="login__mode__item tn-flex-1" :class="[{'login__mode__item--active': currentModeIndex === 1}]"
            @tap.stop="modeSwitch(1)">
            注册
          </view>

          <!-- 滑块-->
          <view class="login__mode__slider tn-cool-bg-color-15--reverse" :style="[modeSliderStyle]"></view>
        </view>

        <!-- 输入框内容-->
        <view class="login__info tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
          <!-- 登录 -->
          <template v-if="currentModeIndex === 0">
            <view
              class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <u-icon name="phone" color="#fff" size="20"></u-icon>
              </view>
              <view class="login__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入登录手机号码" />
              </view>
            </view>

            <view
              class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <u-icon name="lock" color="#fff" size="20"></u-icon>
              </view>
              <view class="login__info__item__input__content">
                <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码" />
              </view>
              <view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
                <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
              </view>
            </view>
          </template>
          <!-- 注册 -->
          <template v-if="currentModeIndex === 1">
            <view
              class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-phone"></view>
              </view>
              <view class="login__info__item__input__content">
                <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入注册手机号码" />
              </view>
            </view>

            <view
              class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-code"></view>
              </view>
              <view class="login__info__item__input__content login__info__item__input__content--verify-code">
                <input placeholder-class="input-placeholder" placeholder="请输入验证码" />
              </view>
              <view class="login__info__item__input__right-verify-code" @tap.stop="getCode">
                <button backgroundColor="#01BEFF" fontColor="#FFFFFF" size="sm" padding="5rpx 10rpx" width="100%"
                  shape="round">{{ tips }}</button>
              </view>
            </view>

            <view
              class="login__info__item__input tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
              <view class="login__info__item__input__left-icon">
                <view class="tn-icon-lock"></view>
              </view>
              <view class="login__info__item__input__content">
                <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码" />
              </view>
              <view class="login__info__item__input__right-icon" @click="showPassword = !showPassword">
                <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
              </view>
            </view>
          </template>

          <view class="login__info__item__button tn-cool-bg-color-7--reverse" hover-class="tn-hover"
            :hover-stay-time="150">{{ currentModeIndex === 0 ? '登录' : '注册'}}</view>

          <view v-if="currentModeIndex === 0" class="login__info__item__tips">忘记密码?</view>
        </view>

        <!-- 其他登录方式 -->
        <view class="login__way tn-flex tn-flex-col-center tn-flex-row-center">
          <view class="tn-padding-sm tn-margin-xs">
            <view
              class="login__way__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-green tn-color-white">
              <view class="tn-icon-wechat-fill"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad,
    onUnload
  } from '@dcloudio/uni-app'
  import {
    ref,
    reactive,
    watch
  } from 'vue'

  const Point = class {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.r = 1 + Math.random() * 2
      this.sx = Math.random() * 2 - 1
      this.sy = Math.random() * 2 - 1
    }

    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = '#fff'
      ctx.fill()
    }

    move(w, h) {
      this.x += this.sx
      this.y += this.sy
      if (this.x > w || this.x < 0) this.sx = -this.sx
      if (this.y > h || this.y < 0) this.sy = -this.sy
    }

    drawLine(ctx, p) {
      const dx = this.x - p.x
      const dy = this.y - p.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 100) {
        var alpha = (100 - d) / 300 * 1
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(p.x, p.y)
        ctx.closePath()
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'
        ctx.strokeWidth = 1
        ctx.stroke()
      }
    }
  }

  const sysinfo = uni.getSystemInfoSync()
  const screenWidth = sysinfo.screenWidth
  const screenHeight = sysinfo.screenHeight
  const w = 400
  const h = 1000

  const ctx = ref(null)
  const timer = ref(null)
  const currentModeIndex = ref(0)
  const showPassword = ref('获取验证码')
  const tips = ref(false)
  const canvas = reactive({
    points: []
  })
  const style = reactive({
    left: 0
  })

  watch(currentModeIndex, (value) => {
    const sliderWidth = uni.upx2px(476 / 2)
    style.left = `${sliderWidth * value}px`
  })

  onLoad(() => {
    for (let i = 0; i < 80; i++) {
      canvas.points.push(new Point(Math.random() * w, Math.random() * h))
    }
    ctx.value = uni.createCanvasContext('star_canvas')
    gameloop() //进行
  })
  
  onUnload(() => {
    clearTimeout(timer.value)
  })
  
  /**粒子进行*/
  const gameloop = () => {
    timer.vlaue = setTimeout(gameloop, 100);
    // console.log('gameloop')
    paint();
  }
  /**清空画布*/
  const paint = () => {
    ctx.value.clearRect(0, 0, w, h)
    for (let i = 0; i < canvas.points.length; i++) {
      canvas.points[i].move(w, h)
      canvas.points[i].draw(ctx.value)
      for (let j = i + 1; j < canvas.points.length; j++) {
        canvas.points[i].drawLine(ctx.value, canvas.points[j])
      }
    }
    ctx.value.draw();
  }
  // 切换模式
  const modeSwitch = (index) => {
    currentModeIndex.value = index
    showPassword.value = false
  }
</script>

<style lang="scss" scoped>
  .login-wrap {
    background: linear-gradient(90deg, #892FE8, #3D7EFF);
    min-height: 100vh
  }

  .mycanvas {
    position: absolute;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    color: #fff;
  }



  .login {
    position: relative;
    height: 100%;
    z-index: 1;

    /* 内容 start */
    &__wrapper {
      padding-top: 400rpx;
      width: 100%;
    }

    /* 切换 start */
    &__mode {
      position: relative;
      margin: 0 auto;
      width: 476rpx;
      height: 77rpx;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(6rpx);
      -webkit-backdrop-filter: blur(6rpx);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      border-radius: 39rpx;

      &__item {
        height: 77rpx;
        width: 100%;
        line-height: 77rpx;
        text-align: center;
        font-size: 31rpx;
        color: #FFFFFF;
        letter-spacing: 1em;
        text-indent: 1em;
        z-index: 2;
        transition: all 0.4s;

        &--active {
          font-weight: bold;
          color: #FFFFFF;
        }
      }

      &__slider {
        position: absolute;
        height: inherit;
        width: calc(476rpx / 2);
        border-radius: inherit;
        box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
    &__info {
      margin: 0 50rpx;
      margin-top: 105rpx;
      padding: 30rpx 51rpx;
      padding-bottom: 0;
      border-radius: 20rpx;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(6rpx);
      -webkit-backdrop-filter: blur(6rpx);
      border: 2rpx solid rgba(255, 255, 255, 0.1);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);

      &__item {

        &__input {
          display: flex;
          align-items: center;
          margin-top: 59rpx;
          width: 100%;
          height: 77rpx;
          border: 1rpx solid #FFFFFF;
          border-radius: 39rpx;

          &__left-icon {
            width: 10%;
            font-size: 44rpx;
            margin-left: 20rpx;
            color: #FFFFFF;
          }

          &__content {
            width: 80%;
            padding-left: 10rpx;

            &--verify-code {
              width: 56%;
            }

            input {
              font-size: 24rpx;
              color: #FFFFFF;
              // letter-spacing: 0.1em;
            }
          }

          &__right-icon {
            width: 10%;
            font-size: 44rpx;
            margin-right: 20rpx;
            color: #FFFFFF;
          }

          &__right-verify-code {
            width: 34%;
            margin-right: 20rpx;
          }
        }

        &__button {
          margin-top: 75rpx;
          margin-bottom: 39rpx;
          width: 100%;
          height: 77rpx;
          text-align: center;
          font-size: 31rpx;
          font-weight: bold;
          line-height: 77rpx;
          letter-spacing: 1em;
          text-indent: 1em;
          border-radius: 100rpx;
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.2);
          // border: 2rpx solid #FFFFFF;
        }

        &__tips {
          margin: 30rpx 0;
          color: #FFFFFF;
        }
      }
    }
    &__way {
      margin: 0 auto;
      margin-top: 110rpx;
    }
  }
  ::v-deep {
    .input-placeholder{
      font-size: 24rpx;
      color: #E6E6E6;
    }
  }
</style>
