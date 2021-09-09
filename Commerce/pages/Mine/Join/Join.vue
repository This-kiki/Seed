<template>
	<view class="container">
		<view class="ui-all">
			<view class="avatar" @tap="avatarChoose">
				<view class="imgAvatar"><view class="iavatar" :style="'background: url(' + ApplyMember.img + ') no-repeat center/cover #eeeeee;'"></view></view>
				<text v-if="ApplyMember.img">修改个人免冠证件照</text>
				<text v-if="!ApplyMember.img">选择个人免冠证件照</text>
			</view>
			<view class="text-box">
				<text>姓名</text>
				<input class="input-box" type="text" v-model="ApplyMember.name" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>申请职位</text>
				<picker class="picker" mode="selector" range-key="label" v-model="ApplyMember.subLevel" @change="bindLevelChange" :range="levelList">
					<view class="picker-text">{{ getsubLevel(ApplyMember.subLevel) }}</view>
				</picker>
			</view>
			<view class="text-box">
				<text>身份证</text>
				<input class="input-box" type="text" v-model="ApplyMember.idNum" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>生日</text>
				<picker class="picker" mode="date" v-model="ApplyMember.birth" @change="bindDateChange">
					<view class="picker-text">{{ ApplyMember.birth }}</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>性别</text>
				<picker class="picker" mode="selector" range-key="name" v-model="ApplyMember.sex" @change="bindSexChange" :range="sexlist">
					<view class="picker-text">{{ ApplyMember.sex == 0 ? '男' : ApplyMember.sex == 1 ? '女' : '' }}</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>籍贯</text>
				<picker class="picker" mode="region" v-model="ApplyMember.place" @change="bindRegionChange">
					<view class="picker-text">{{ ApplyMember.place }}</view>
				</picker>
			</view>
			<view class="picker-box">
				<text>政治面貌</text>
				<picker class="picker" mode="selector" range-key="label" v-model="ApplyMember.polity" @change="bindPolityChange" :range="polityList">
					<view class="picker-text">{{ ApplyMember.polity }}</view>
				</picker>
			</view>
			<view class="text-box">
				<text>民族</text>
				<input class="input-box" type="text" v-model="ApplyMember.nation" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>手机号</text>
				<input class="input-box" type="text" v-model="ApplyMember.phone" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>电子邮箱</text>
				<input class="input-box" type="text" v-model="ApplyMember.email" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>学校</text>
				<input class="input-box" type="text" v-model="ApplyMember.school" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>专业</text>
				<input class="input-box" type="text" v-model="ApplyMember.major" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作单位</text>
				<input class="input-box" type="text" v-model="ApplyMember.work" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作职位</text>
				<input class="input-box" type="text" v-model="ApplyMember.position" placeholder-class="place" />
			</view>
			<view class="textarea-box">
				<text>简介</text>
				<textarea class="textarea" placeholder-class="place" v-model="ApplyMember.introduce"></textarea>
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
			ApplyMember: {
				img: '',
				name: '',
				idNum: '',
				birth: '',
				sex: 3,
				place: '',
				polity: '',
				nation: '',
				phone: '',
				email: '',
				school: '',
				major: '',
				work: '',
				position: '',
				introduce: '',
				subLevel: 100
			},
			sexlist: [
				{
					id: 0,
					name: '男'
				},
				{
					id: 1,
					name: '女'
				}
			],
			levelList: [
				{
					label: '荣誉会长',
					value: 4
				},
				{
					label: '会长',
					value: 5
				},
				{
					label: '副会长',
					value: 6
				},
				{
					label: '执行委员会成员',
					value: 7
				},
				{
					label: '秘书长',
					value: 8
				},
				{
					label: '会计',
					value: 9
				},
				{
					label: '出纳',
					value: 10
				},
				{
					label: '会员',
					value: 11
				}
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
			]
		};
	},
	methods: {
		judge() {
			// console.log(regular(this.ApplyMember))
			return regular(this.ApplyMember);
		},
		bindLevelChange(e) {
			this.ApplyMember.subLevel = this.levelList[e.detail.value].value;
		},
		bindSexChange(e) {
			this.ApplyMember.sex = this.sexlist[e.detail.value].id;
		},
		bindPolityChange(e) {
			this.ApplyMember.polity = this.polityList[e.detail.value].label;
			// console.log(this.polityList[e.detail.value].label)
		},
		bindDateChange(e) {
			this.ApplyMember.birth = e.detail.value;
		},
		bindRegionChange(e) {
			console.log(e);
			this.ApplyMember.place = e.detail.value.join('-');
		},
		getsubLevel(key) {
			switch (key) {
				case 4:
					return '荣誉会长';
					break;
				case 5:
					return '会长';
					break;
				case 6:
					return '副会长';
					break;
				case 7:
					return '执行委员会成员';
					break;
				case 8:
					return '秘书长';
					break;
				case 9:
					return '会计';
					break;
				case 10:
					return '出纳';
					break;
				case 11:
					return '会员';
					break;
				default:
					break;
			}
		},
		avatarChoose() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					const tempFilePaths = res.tempFilePaths;
					that.temp = tempFilePaths;
					that.ApplyMember.img = tempFilePaths[0];
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
						var obj = this.ApplyMember;
						obj.openId = uni.getStorageSync('openid');
						obj.img = res.data.url;
						obj.level = 0;
						this.$api
							.applyMember(obj)
							.then(resa => {
								uni.hideLoading();
								if (resa.success == true) {
									uni.showToast({
										title: '提交成功',
										duration: 2000
									});
									setTimeout(() => {
										uni.navigateBack({});
									}, 1000)
								} else {
									uni.showToast({
										title: resa.message,
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
		.picker-box:hover {
			background-color: #eaeaea;
		}
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
