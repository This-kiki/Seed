<template>
	<view>
		<view class="search">
			<view class="search-bar">
				<!-- 搜索你感兴趣的~~ -->
				<input focus="true" style="width: 90%;" type="text" v-model="content" placeholder="搜索你感兴趣的~~" />
				<span class="iconfont" @click="init">&#xe775;</span>
			</view>
		</view>
		<view style="">
			<loading ref="loadRefresh" :isRefresh="false" :currentPage="current.currentPage" :totalPages="current.totalPages" @loadMore="loadMore">
				<view slot="content-list" class="page">
					<!-- 数据列表 -->
					<view v-for="(item, index) in list" :key="index" @click="go(item.id)">
						<news-card :options="item" :ref="item.id"></news-card>
					</view>
				</view>
			</loading>
		</view>
	</view>
</template>

<script>
import newsCard from '@/pages/RealTimeInfo/infoCard/index.vue';
import loading from '@/components/info_Com/load-refresh/load-refresh.vue';
export default {
	components:{
		loading,
		newsCard
	},
	data() {
		return {
			list: [], // 数据集
			current: {
				currentPage: 0, // 当前页码
				totalPages: 0 // 总页数
			},
			content: '',
			contentT: ''
		};
	},
	methods: {
		go(id) {
			uni.navigateTo({
				url: '../DetailedInfo/DetailedInfo?infoId='+id,
			});
			// console.log(this.$refs[id][0])
			// this.$refs[id][0].viewsAdd();
		},
		async init() {
			this.contentT = this.content
			this.current = {
				currentPage: 0, // 当前页码
				totalPages: 0 // 总页数
			}
			var postAPI = {current: this.current.currentPage,content: this.contentT}
			await this.$api.searchIfo(postAPI).then((res)=> {
				console.log('searchResult',res)
				this.list = res.data.rows
				this.current.totalPages = res.data.total
				this.current.currentPage=this.current.currentPage+1
			})
		},
		// 上划加载更多
		async loadMore() {
			var postAPI = {current: this.current.currentPage,content: this.contentT}
			await this.$api.searchIfo(postAPI).then((res)=> {
				console.log('searchResult',res)
				this.current.totalPages = res.data.total
				for(var i=0;i<res.data.rows.length;i++){
					this.list.push(res.data.rows[i])
				}
				this.current.currentPage=this.current.currentPage+1
			})
			this.$refs.loadRefresh.completed()
		},
	}
};
</script>

<style lang="less" scoped>
.search {
	position: fixed;
	top: 0;
	z-index: 1;
	background-color: rgb(255,255,255);
	width: 100%;
	height: 75rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.search-bar {
		width: 90%;
		height: 60rpx;
		border-radius: 40rpx;
		border: 1rpx solid #f0f0f0;
		background-color: rgb(248, 248, 248);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 25rpx 0 40rpx;
		padding-bottom: 4rpx;
		font-size: 30rpx;
		font-weight: 500;
		letter-spacing: 3rpx;
	}
}
.page {
	margin-top: 85rpx;
	// min-height: 100vh;
	background-color: rgb(255, 255, 255);
	width: 100%;
}
</style>
