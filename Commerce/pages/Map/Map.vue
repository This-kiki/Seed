<template>
	<view>
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers" :scale ="scale"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "商会地址",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				latitude: 23.293258753246587,
				longitude: 116.6903593331881,
				covers: [{
					id:0,
					latitude: 23.293258753246587,
					longitude: 116.6903593331881,
					title: "汕头市濠江区珠浦社区康乐活动中心",
					iconPath: '../../static/icon/location.png',
				}],
				scale: 18
			};
		},
	}
</script>

<style lang="scss">

</style>
