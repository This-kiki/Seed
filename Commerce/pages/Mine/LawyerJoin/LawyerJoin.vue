<template>
	<view class="container">
		<view class="ui-all">
			<view class="avatar" @tap="avatarChoose">
				<view class="imgAvatar"><view class="iavatar" :style="'background: url(' + layerMsg.img + ') no-repeat center/cover #eeeeee;'"></view></view>
				<text v-if="layerMsg.img">修改个人免冠证件照</text>
				<text v-if="!layerMsg.img">选择个人免冠证件照</text>
			</view>
			<view class="text-box">
				<text>姓名</text>
				<input class="input-box" type="text" v-model="layerMsg.name" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>身份证</text>
				<input class="input-box" type="text" v-model="layerMsg.idNum" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>律师身份</text>
				<picker class="picker" mode="selector" range-key="label" v-model="layerMsg.subLevel" @change="bindSubLevelChange" :range="sublevelList">
					<view class="picker-text">{{ layerMsg.polity }}</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>生日</text>
				<picker class="picker" mode="date" v-model="layerMsg.birth" @change="bindDateChange">
					<view class="picker-text">{{ layerMsg.birth ? layerMsg.birth : '' }}</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>性别</text>
				<picker class="picker" mode="selector" range-key="name" v-model="layerMsg.sex" @change="bindSexChange" :range="sexlist">
					<view class="picker-text">{{ layerMsg.sex == 0 ? '男' : layerMsg.sex == 1 ? '女' : '' }}</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>籍贯</text>
				<picker class="picker" mode="region" v-model="layerMsg.place" @change="bindRegionChange">
					<view class="picker-text">{{ layerMsg.place }}</view>
				</picker>
			</view>
			<!-- 			<view class="text-box">
				<text>政治面貌</text>
				<input class="input-box" type="text" v-model="layerMsg.polity" placeholder-class="place" />
			</view> -->
			<view class="picker-box">
				<text>政治面貌</text>
				<picker class="picker" mode="selector" range-key="label" v-model="layerMsg.polity" @change="bindPolityChange" :range="polityList">
					<view class="picker-text">{{ layerMsg.polity }}</view>
				</picker>
			</view>
			<view class="text-box">
				<text>民族</text>
				<input class="input-box" type="text" v-model="layerMsg.nation" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>手机号</text>
				<input class="input-box" type="text" v-model="layerMsg.phone" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>电子邮箱</text>
				<input class="input-box" type="text" v-model="layerMsg.email" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>毕业学校</text>
				<input class="input-box" type="text" v-model="layerMsg.school" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>专业</text>
				<input class="input-box" type="text" v-model="layerMsg.major" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作单位</text>
				<input class="input-box" type="text" v-model="layerMsg.work" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作职位</text>
				<input class="input-box" type="text" v-model="layerMsg.position" placeholder-class="place" />
			</view>
			<view class="textarea-box">
				<text>简介（可填写自己擅长领域...）</text>
				<textarea class="textarea" placeholder-class="place" v-model="layerMsg.introduce"></textarea>
			</view>
			<view class="text-box">
				<text>执业证号</text>
				<input class="input-box" type="text" v-model="layerMsg.workNum" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>执业律所</text>
				<input class="input-box" type="text" v-model="layerMsg.workplace" placeholder-class="place" />
			</view>
		</view>
		<button class="save" @tap="save">提 交 审 核</button>
	</view>
</template>

<script>
import { regular } from '../../../util/common.js';
export default {
	data() {
		return {
			temp: null,
			layerMsg: {
				img: '',
				name: '',
				idNum: '',
				birth: '',
				sex: 3,
				place: '',
				polity: '',
				subLevel: '',
				nation: '',
				phone: '',
				email: '',
				school: '',
				major: '',
				work: '',
				position: '',
				introduce: '',
				workNum: '',
				workplace: ''
			},
			sublevelList: [
				{
					label: '律师',
					value: 12
				},
				{
					label: '公司法务',
					value: 13
				},
				{
					label: '法官',
					value: 14
				},
				{
					label: '检察',
					value: 15
				},
			],
			polityList: [
				{
					label: '中共党员',
					value: 0
				},
				{
					label: '中共预备党员',
					value: 1
				},
				{
					label: '共青团员',
					value: 3
				},
				{
					label: '无党派人士',
					value: 4
				},
				{
					label: '群众',
					value: 5
				},
				{
					label: '民革会员',
					value: 6
				},
				{
					label: '民盟盟员',
					value: 7
				},
				{
					label: '民建会员',
					value: 8
				},
				{
					label: '民进会员',
					value: 9
				},
				{
					label: '农工党党员',
					value: 10
				},
				{
					label: '致公党党员',
					value: 11
				},
				{
					label: '九三学社社员',
					value: 12
				},
				{
					label: '台盟盟员',
					value: 13
				}
			],
			sexlist: [
				{
					id: 0,
					name: '男'
				},
				{
					id: 1,
					name: '女'
				}
			]
		};
	},
	methods: {
		judge() {
			return regular(this.layerMsg);
		},
		bindSexChange(e) {
			this.layerMsg.sex = this.sexlist[e.detail.value].id;
		},
		bindDateChange(e) {
			this.layerMsg.birth = e.detail.value;
		},
		bindPolityChange(e) {
			this.layerMsg.polity = this.polityList[e.detail.value].label;
			// console.log(this.polityList[e.detail.value].label)
		},
		bindSubLevelChange(e) {
			this.layerMsg.subLevel = e.detail.value
		},
		bindRegionChange(e) {
			// console.log(e)
			this.layerMsg.place = e.detail.value.join('-');
		},
		avatarChoose() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					const tempFilePaths = res.tempFilePaths;
					// let resSize = res.tempFiles[0].size;
					// if(resSize > 20971520){
					// 	uni.showToast({
					// 		title: "上传的图片大小不超过20m",
					// 		icon: 'none',
					// 		duration: 2000,
					// 		mask: true
					// 	});
					// 	return
					// }
					that.temp = tempFilePaths;
					that.layerMsg.img = tempFilePaths[0];
					// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
					// 	console.log(res)
					// })
				}
			});
		},
		save() {
			if (this.judge().status == true) {
				uni.showLoading({
					title: '正在提交'
				});
				this.$api
					.uploadPicture({ tempFilePaths: this.temp })
					.then(res => {
						// console.log(res)
						var obj = this.layerMsg;
						obj.img = res.data.url;
						this.$api
							.applyLayer(obj)
							.then(res => {
								uni.hideLoading();
								if (res.success == true) {
									uni.showToast({
										title: '提交成功',
										duration: 2000
									});
									setTimeout(() => {
										uni.navigateBack({});
									}, 1000)
								} else {
									uni.showToast({
										title: res.message,
										icon: 'none'
									});
								}
							})
							.catch(err => {
								uni.hideLoading();
								uni.showToast({
									title: '提交失败，请重新提交',
									icon: 'none'
								});
							});
					})
					.catch(err => {
						uni.hideLoading();
						uni.showToast({
							title: '图片上传失败',
							icon: 'none'
						});
					});
			} else {
				uni.showToast({
					title: this.judge().value,
					icon: 'none'
				});
				return false;
			}
		}
	},
	onLoad() {}
};
</script>

<style lang="scss">
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	.ui-all {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.avatar {
			width: 100%;
			height: 180rpx;
			border-bottom: solid 1px #f2f2f2;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;
				margin-left: 50rpx;
				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}
		}
		.text-box {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: solid 1px #f2f2f2;
			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
			}
			.input-box {
				color: rgb(121, 121, 121);
				margin-left: 20rpx;
				font-size: 28rpx;
			}
			.place {
				color: rgb(200, 200, 200);
			}
		}
		.text-box:hover {
			background-color: #eaeaea;
		}
		.textarea-box {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			border-bottom: solid 1px #f2f2f2;
			text {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
				height: 100rpx;
			}
			.textarea {
				color: rgb(121, 121, 121);
				margin-left: 20rpx;
				font-size: 28rpx;
				height: 150rpx;
				width: 95%;
				border: solid 1px #f2f2f2;
			}
			.place {
				color: rgb(200, 200, 200);
			}
		}
		.picker-box {
			width: 100%;
			height: 100rpx;
			display: flex;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: solid 1px #f2f2f2;
			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
			}
			.picker {
				width: 80%;
				height: 100rpx;
			}
			.picker-text {
				color: rgb(121, 121, 121);
				margin-left: 26rpx;
				height: 100rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}
	}
	.picker-box:hover {
		background-color: #eaeaea;
	}
	.save {
		width: 80%;
		background: #030303;
		border: none;
		color: #ffffff;
		margin: 100rpx 0rpx;
		font-size: 28rpx;
	}
}
</style>
