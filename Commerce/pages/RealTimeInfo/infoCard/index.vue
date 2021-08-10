<template>
  <div class="hm-news-card">
    <div class="container">
      <div class="box" @click="onClick">
        <img v-if='options.imag' class="img" :src="options.imag" />
        <span class="title">{{ options.title }}</span>
        <span class="summary">{{ options.simpleContent }}</span>
        <div class="row_2" />
        <div class="ft">
          <span class="comments">{{ formatMsgTime(options.createTime) }}</span>
          <span class="comments">{{ options.view }} 浏览</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmNewsCard',
  props: {
    options: {
      type: Object,
    }
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      uni.navigateTo({
        url: 'DetailedInfo/DetailedInfo?infoId='+this.options.id
      });
    },
	formatMsgTime(timespan) {
		var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
		var year = dateTime.getFullYear()
		var month = dateTime.getMonth() + 1
		var day = dateTime.getDate()
		// var hour = dateTime.getHours()
		// var minute = dateTime.getMinutes()
		// var second = dateTime.getSeconds()
		var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
		var now = new Date() // 获取本机当前的时间
		var nowNew = now.getTime() // 将本机的时间转换为毫秒
		var milliseconds = 0
		var timeSpanStr
		milliseconds = nowNew - millisecond
		if (milliseconds <= 1000 * 60 * 1) {
		// 小于一分钟展示为刚刚
		timeSpanStr = '刚刚'
		} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
		// 大于一分钟小于一小时展示为分钟
		timeSpanStr = Math.round(milliseconds / (1000 * 60)) + ' 分钟前'
		} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
		// 大于一小时小于一天展示为小时
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' 小时前'
		} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
		// 大于一天小于十五天展示位天
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + ' 天前'
		} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
		timeSpanStr = month + '-' + day
		} else {
		timeSpanStr = year + '-' + month + '-' + day
		}
		return timeSpanStr
		},
  }
};
</script>
<style>
@import './index.response.css';
</style>
