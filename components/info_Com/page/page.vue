<template>
	<view>
		<loading ref="loadRefresh" :currentPage="currentPage" :totalPages="totalPages" @loadMore="loadMore" @refresh="refresh">
			<view slot="content-list">
				<!-- 数据列表 -->
				<view v-for="(item, index) in list" :key="index"><news-card :options="item"></news-card></view>
			</view>
		</loading>
	</view>
</template>

<script>
import loading from '@/components/info_Com/load-refresh/load-refresh.vue';
import newsCard from '@/components/info_Com/newsCard/index.vue';
export default {
	components: {
		loading,
		newsCard
	},
	data() {
		return {
			list: [
				{
					img: '/static/hm-news-card/images/img_22726_0_0.png',
					title: '新闻标题',
					author: '作者',
					date: '16 MAY 2016',
					summary:
					'新闻概要。新闻概要长度最好控制在50字符以内',
					comments: "14 评论",
					likes: "254 喜欢",
					url: '',
					showComments: true,
					showLikes: true
				},{
					img: '/static/hm-news-card/images/img_22726_0_0.png',
					title: '新闻标题',
					author: '作者',
					date: '16 MAY 2016',
					summary:
					'新闻概要。新闻概要长度最好控制在50字符以内',
					comments: "14 评论",
					likes: "254 喜欢",
					url: '',
					showComments: true,
					showLikes: true
				},{
					img: '/static/hm-news-card/images/img_22726_0_0.png',
					title: '新闻标题',
					author: '作者',
					date: '16 MAY 2016',
					summary:
					'新闻概要。新闻概要长度最好控制在50字符以内',
					comments: "14 评论",
					likes: "254 喜欢",
					url: '',
					showComments: true,
					showLikes: true
				}
			], // 数据集
			currentPage: 1, // 当前页码
			totalPages: 2 // 总页数
		};
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			var getAPI = {current: 1,limit: 20}
			this.$api.getSeedInfo(getAPI).then((res)=> {
				console.log('种子会资讯',res)
			})
		},
		// 上划加载更多
		loadMore() {
			// 模拟请求成功后的回调
			setTimeout(() => {
				console.log('加载更多')
				// 1. list数组添加新数据
				// 2. 更新当前页码 currentPage
				// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
			}, 800)
		  },
		// 下拉刷新数据列表
		refresh() {
			// 模拟请求成功后的回调
			setTimeout(() => {
				// 1. list重新赋值，应避免 this.list = [] 这种操作
				// 2. 更新当前页码 currentPage
				// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
			}, 1600)
		},
		// 代码触发下拉刷新方法
		runRefresh() {
			this.$refs.loadRefresh.runRefresh()
		}
	}
};
</script>

<style></style>
