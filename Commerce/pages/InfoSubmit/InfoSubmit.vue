<template>
	<view class="submitContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" v-if="!showEditor"></topBar>
		<view class="setBack" :style="{'height':height.titleBarHeight+'px'}" v-if="showEditor">
		</view>
		<!-- 个人信息 -->
		<view class="userInfo" v-if="!showEditor">
			<view class="img" :style="{'backgroundImage':`url(${baseInfo.img})`}">
			</view>
			<view class="content">
				<view class="name">
					{{baseInfo.name}}
				</view>
				<view class="identity">
					{{getIdentity(baseInfo.identity)}}
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="title" v-if="!showEditor">
			<input type="text" v-model="infoForm.title" placeholder="请输入标题(5-20个字)" maxlength="20" />
		</view>
		<!-- 类型 -->
		<view class="category" v-if="!showEditor">
			<text>请选择资讯类型</text>
			<picker @change="selectCategory" range-key="name" :value="index" :range="categoryList">
				<view class="uni-input">{{categoryList[infoForm.category].name}}</view>
			</picker>
		</view>
		<!-- 简介 -->
		<view class="intro" v-if="!showEditor">
			<textarea v-model="infoForm.simpleContent" placeholder="请输入简介(100字以内)" maxlength="100" />
		</view>
		<!-- 编辑正文 -->
		<view class="edit" v-if="!showEditor" @click="showEditor=!showEditor">
			<view class="text" v-if="!infoForm.content">
				去编辑正文
			</view>
			<rich-text v-if="infoForm.content" :nodes="infoForm.content"></rich-text>
		</view>
		<!-- 主页操作 -->
		<view class="editOperate">
			<view class="btn" @click="showEditor=!showEditor">
				{{!showEditor?"编辑正文":"编辑完毕"}}
			</view>
			<view class="btn" @tap="preview">
				预览
			</view>
			<view class="btn" @click="setLocal()">
				暂存
			</view>
			<view class="btn" @tap="submit">
				发布
			</view>
		</view>
		<!-- 操作栏 -->
		<view class="operate" v-if="showEditor">
			<view class="operateLine">
				<view class="icon">
					<view class="iconfont icon-tupian" @touchend.stop="insertImage()">
					</view>
					<view class="iconfont icon-text1" @click="selectTap(1)" :class="tapSelect==1?'selectColor':''">
					</view>
					<view class="iconfont icon-text" @click="selectTap(2)" :class="tapSelect==2?'selectColor':''">
					</view>
					<view class="iconfont icon-undo" @tap="undo">
					</view>
					<view class="iconfont icon-redo" @tap="redo">
					</view>
					<view class="close" @click="tapSelect = 0" v-if="tapSelect">
						收起
					</view>
				</view>
			</view>
			<view class="setText" v-if="tapSelect==1">
				<view class="textStyle">
					<text>文字格式</text>
					<view class="selectMain" @touchend.stop="format">
						<view class="iconfont icon-cuti" data-name="bold"
							:class="textStyle.includes(0)?'selectBgColor':''" @click="selectTextStyle(0)">
						</view>
						<view class="iconfont icon-xieti" data-name="italic"
							:class="textStyle.includes(1)?'selectBgColor':''" @click="selectTextStyle(1)">
						</view>
						<view class="iconfont icon-Underline" data-name="underline"
							:class="textStyle.includes(2)?'selectBgColor':''" @click="selectTextStyle(2)">
						</view>
						<view class="iconfont icon-strikethrough" data-name="strike"
							:class="textStyle.includes(3)?'selectBgColor':''" @click="selectTextStyle(3)">
						</view>
					</view>
					<view class="selectMain" @touchend.stop="format">
						<view class="small common" data-name="header" :data-value="5"
							:class="textSize==0?'selectBgColor':''" @click="selectTextSize(0)">小
						</view>
						<view class="normal common" data-name="header" :data-value="4"
							:class="textSize==1?'selectBgColor':''" @click="selectTextSize(1)">标准
						</view>
						<view class="big common" data-name="header" :data-value="3"
							:class="textSize==2?'selectBgColor':''" @click="selectTextSize(2)">大
						</view>
						<view class="bigger common" data-name="header" :data-value="2"
							:class="textSize==3?'selectBgColor':''" @click="selectTextSize(3)">超大
						</view>
					</view>
				</view>
				<view class="textColor">
					<text>文字颜色</text>
					<view class="selectMain" @touchend.stop="format">
						<view class="common color1" data-name="color" :class="textColor==0?'selectColorMain':''"
							data-value="#222222" @click="selectColorMain(0)">
						</view>
						<view class="common color2" data-name="color" :class="textColor==1?'selectColorMain':''"
							data-value="#707070" @click="selectColorMain(1)">
						</view>
						<view class="common color3" data-name="color" :class="textColor==2?'selectColorMain':''"
							data-value="#ef4142" @click="selectColorMain(2)">
						</view>
						<view class="common color4" data-name="color" :class="textColor==3?'selectColorMain':''"
							data-value="#fe7527" @click="selectColorMain(3)">
						</view>
						<view class="common color5" data-name="color" :class="textColor==4?'selectColorMain':''"
							data-value="#01aa54" @click="selectColorMain(4)">
						</view>
						<view class="common color6" data-name="color" :class="textColor==5?'selectColorMain':''"
							data-value="#0289e5" @click="selectColorMain(5)">
						</view>
						<view class="common color7" data-name="color" :class="textColor==6?'selectColorMain':''"
							data-value="#742bff" @click="selectColorMain(6)">
						</view>
					</view>
				</view>
				<view class="highColor">
					<text>高亮颜色</text>
					<view class="selectMain" @touchend.stop="format">
						<view class="common color1" data-name="backgroundColor"
							:class="textHigh==0?'selectColorMain':''" data-value="#ffffff" @click="selectColorBg(0)">无
						</view>
						<view class="common color2" data-name="backgroundColor"
							:class="textHigh==1?'selectColorMain':''" data-value="#707070" @click="selectColorBg(1)">
						</view>
						<view class="common color3" data-name="backgroundColor"
							:class="textHigh==2?'selectColorMain':''" data-value="#ef4142" @click="selectColorBg(2)">
						</view>
						<view class="common color4" data-name="backgroundColor"
							:class="textHigh==3?'selectColorMain':''" data-value="#fe7527" @click="selectColorBg(3)">
						</view>
						<view class="common color5" data-name="backgroundColor"
							:class="textHigh==4?'selectColorMain':''" data-value="#01aa54" @click="selectColorBg(4)">
						</view>
						<view class="common color6" data-name="backgroundColor"
							:class="textHigh==5?'selectColorMain':''" data-value="#0289e5" @click="selectColorBg(5)">
						</view>
						<view class="common color7" data-name="backgroundColor"
							:class="textHigh==6?'selectColorMain':''" data-value="#742bff" @click="selectColorBg(6)">
						</view>
					</view>
				</view>
				<view class="alignStyle">
					<text>对齐方式</text>
					<view class="selectMain" @touchend.stop="format">
						<view class="iconfont icon-zuoyouduiqi" :class="textAlign==0?'selectBgColor':''"
							data-name="align" data-value="justify" @click="selectTextAlign(0)">
						</view>
						<view class="iconfont icon-zuoduiqi" :class="textAlign==1?'selectBgColor':''" data-name="align"
							data-value="left" @click="selectTextAlign(1)">
						</view>
						<view class="iconfont icon-juzhongduiqi" :class="textAlign==2?'selectBgColor':''"
							data-name="align" data-value="center" @click="selectTextAlign(2)">
						</view>
						<view class="iconfont icon-youduiqi" :class="textAlign==3?'selectBgColor':''" data-name="align"
							data-value="right" @click="selectTextAlign(3)">
						</view>
					</view>
				</view>
			</view>
			<view class="setOther" v-if="tapSelect==2">
				<view class="listStyle">
					<text>列表</text>
					<view class="selectMain" @touchend.stop="format">
						<view class="iconfont icon-youxupailie" data-name="list" data-value="ordered">
						</view>
						<view class="iconfont icon-wuxupailie" data-name="list" data-value="bullet">
						</view>
						<view class="iconfont icon--checklist" data-name="list" data-value="check">
						</view>
					</view>
				</view>
				<view class="lineStyle">
					<text>分割线</text>
					<view class="selectMain" @touchend.stop="format">
						<view class="iconfont icon-fengexian" @tap="insertDivider">
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 资讯主体 -->
		<view class="mainContainer" v-if="showEditor">
			<editor id="editor" show-img-size show-img-resize show-img-toolbar placeholder="请输入正文(当图片加载完毕后才可点击发布)"
				@statuschange="onStatusChange" @ready="onEditorReady" @input="getImgList" :read-only="!showEditor"
				@focus="showEditor=true">
			</editor>
			<!-- 占位框 -->
			<view class="setBox" v-if="showEditor" :style="{height:keyboardHeight+'px'}">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "发布资讯",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				height: {},
				// 分类列表
				categoryList: [{
						id: 1,
						name: "种子会动态"
					},
					{
						id: 2,
						name: "会员风采"
					},
					{
						id: 3,
						name: "会员单位"
					},
					{
						id: 4,
						name: "家乡新闻"
					},
					{
						id: 5,
						name: "普通资讯"
					},
				],
				// 发布表单
				infoForm: {
					title: "",
					simpleContent: "",
					category: 0,
					content: "",
					imag: "",
					top: 0,
				},
				// 图片数组
				imgList: [],
				// context 样式
				formats: {},
				// 操作栏选择
				tapSelect: 0,
				// 字体样式选择
				textStyle: [],
				// 字体大小选择
				textSize: 1,
				// 字体颜色选择
				textColor: 0,
				// 字体高亮选择
				textHigh: 0,
				// 对齐方式选择
				textAlign: 0,
				// 是否是修改
				flag: 1,
				// 修改的id
				editId: "",
				// 用户身份
				identity: 0,
				// 是否展开编辑器
				showEditor: false,
				// 键盘高度
				keyboardHeight: 0,
				// 个人信息
				baseInfo: {}
			};
		},
		onLoad(options) {
			if (options.id) {
				this.editId = options.id
				this.setNav.navTitle = "修改资讯"
				this.flag = 2
				this.getInfoDetail(options.id)
				this.showOperate = true
			}
			if (this.flag != 2)
				this.getLocalInfoForm()
		},
		created() {
			this.getBaseInfo()
			this.height = uni.getStorageSync('height')
			uni.onKeyboardHeightChange(res => {
				// console.log(res.height)
				this.keyboardHeight = res.height
			})
			// 获取身份
			this.identity = uni.getStorageSync("identity")
			if (this.identity == 1) {
				this.categoryList = [{
						id: 2,
						name: "会员风采"
					},
					{
						id: 5,
						name: "普通资讯"
					},
					{
						id: 6,
						name: "知识板块"
					},
					{
						id: 4,
						name: "家乡新闻"
					}
				]
			} else if (this.identity == 2) {
				this.categoryList = [{
						id: 5,
						name: "普通资讯"
					}, {
						id: 7,
						name: "法律常识"
					},
					{
						id: 4,
						name: "家乡新闻"
					}
				]
			} else if (this.identity == 3) {
				this.categoryList = [{
						id: 3,
						name: "会员单位"
					},
					{
						id: 5,
						name: "普通资讯"
					},
					{
						id: 6,
						name: "知识板块"
					},
					{
						id: 4,
						name: "家乡新闻"
					}
				]
			}
		},
		methods: {
			// 获取身份
			getIdentity(flag) {
				switch (flag) {
					case 1:
						return "会员";
					case 2:
						return "会员单位";
					case 3:
						return "律师";
				}
			},
			// 获取个人信息
			async getBaseInfo() {
				let res = await this.$api.getUserMsg()
				// console.log(res)
				this.baseInfo = res.data.userBaseInfo
			},
			// 获得本地暂存
			getLocalInfoForm() {
				let infoForm = uni.getStorageSync("infoForm")
				let that = this
				if (infoForm) {
					uni.showModal({
						title: '提示',
						content: '是否加载本地暂存？',
						success: function(res) {
							if (res.confirm) {
								that.infoForm = infoForm
								that.editorCtx.setContents({
									html: infoForm.content
								})
							} else if (res.cancel) {
								return
							}
						}
					})
				}
			},
			// 获得资讯详情
			async getInfoDetail(id) {
				let res = await this.$api.getOneInfo({
					id
				})
				// console.log(res)
				this.infoForm = res.data.info
				this.infoForm.category = this.getUpdateCate()
				this.editorCtx.setContents({
					html: this.infoForm.content
				})
			},
			// 选择类型
			selectCategory(e) {
				this.infoForm.category = parseInt(e.detail.value)
				console.log(e.detail.value)
			},
			// 是否置顶
			selectTop(e) {
				this.infoForm.top = parseInt(e.detail.value)
			},
			// 编辑器初始化
			onEditorReady() {
				let that = this
				uni.createSelectorQuery().select('#editor').context(function(res) {
					that.editorCtx = res.context;

					that.editorCtx.setContents({
						html: that.infoForm.content
					})

				}).exec();
			},
			// 样式改变时
			onStatusChange(e) {
				this.formats = e.detail;
				// console.log(this.formats)
			},
			// 设置样式
			format(e) {
				let {
					name,
					value
				} = e.target.dataset;
				if (!name) return;
				this.editorCtx.format(name, value);
			},
			// 操作栏选择
			selectTap(num) {
				if (num == this.tapSelect) {
					this.tapSelect = 0
				} else {
					this.tapSelect = num
				}
			},
			// 撤销
			undo() {
				this.editorCtx.undo();
			},
			// 返回
			redo() {
				this.editorCtx.redo();
			},
			// 插入图片
			insertImage() {
				const that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						console.log(chooseImageRes)
						const tempFilePaths = chooseImageRes.tempFilePaths;
						tempFilePaths.forEach(async item => {
							await uni.uploadFile({
								url: 'https://hjzpzzh.com/seed/oss/uploadImag',
								filePath: item,
								name: 'file',
							}).then((uploadFileRes) => {
								let url = JSON.parse(uploadFileRes[1].data).data.url
								that.editorCtx.insertImage({
									src: url,
									data: {
										id: 'abcd',
										role: 'god'
									},
									width: '100%',
									success: function() {
										console.log('insert image success');
									}
								});
							})
						})
					}
				});
			},
			// 获得图片列表
			getImgList(e) {
				let html = e.detail.html
				this.infoForm.content = html
				let img = html.split("src=\"")
				let img1 = []
				img.forEach(item => {
					if (item.slice(0, 4) == 'http') {
						img1.push(item)
					}
				})
				let img2 = []
				img1.forEach(item => {
					let url = item.split("\" width")[0]
					img2.push(url)
				})
				this.infoForm.imag = JSON.stringify(img2)
			},
			// 插入分割线
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success');
					}
				});
			},
			// 预览
			preview() {
				let that = this
				this.editorCtx.getContents({
					success: function(res) {
						uni.navigateTo({
							url: `/pages/PreviewEditor/PreviewEditor?rich=${encodeURIComponent(res.html)}`
						});
					}
				});
			},
			// 发布
			submit() {
				let that = this
				this.editorCtx.getContents({
					success: function(res) {
						that.infoForm.content = res.html
						// that.infoForm.category = that.getRealCategory()
						// console.log(that.infoForm)
						uni.showModal({
							title: '提示',
							content: '确定发布？',
							success: function(res) {
								if (res.confirm) {
									if (that.flag == 1) {
										that.submitInfo()
									} else {
										that.editInfo()
									}
								} else if (res.cancel) {
									return
								}
							}
						})
					}
				});
			},
			// 修改获取分类
			getUpdateCate() {
				let num = this.infoForm.category
				if (this.identity == 1) {
					switch (num) {
						case 2:
							return 0;
						case 5:
							return 1;
						case 6:
							return 2;
						case 4:
							return 3;
					}
				} else if (this.identity == 2) {
					switch (num) {
						case 5:
							return 0;
						case 7:
							return 1;
						case 4:
							return 2;
					}
				} else if (this.identity == 3) {
					switch (num) {
						case 3:
							return 0;
						case 5:
							return 1;
						case 6:
							return 2;
						case 4:
							return 3;
					}
				}
			},
			// 获取真正的分类
			getRealCategory() {
				let num = this.infoForm.category
				console.log(num)
				if (this.identity == 1) {
					switch (num) {
						case 0:
							return 2;
						case 1:
							return 5;
						case 2:
							return 6;
						case 3:
							return 4;
					}
				} else if (this.identity == 2) {
					switch (num) {
						case 0:
							return 5;
						case 1:
							return 7;
						case 2:
							return 4;
					}
				} else if (this.identity == 3) {
					switch (num) {
						case 0:
							return 3;
						case 1:
							return 5;
						case 2:
							return 6;
						case 3:
							return 4;
					}
				}
			},
			// 发布资讯
			async submitInfo() {
				this.infoForm.category = this.getRealCategory()
				let res = await this.$api.submitInfo(this.infoForm)
				if (res.code == 20000) {
					uni.showModal({
						title: "发布成功,等待管理员审核",
						showCancel: false,
						success: function(res) {
							uni.navigateBack()
						}
					})
				} else if (res.code == 12001) {
					uni.showToast({
						title: "内容中有敏感词汇，请删除后发布",
						icon: "none"
					})
				} else {
					uni.showToast({
						title: "发布失败，请联系管理员",
						icon: "none"
					})
				}
			},
			// 修改资讯
			async editInfo() {
				this.infoForm.id = this.editId
				this.infoForm.category = this.getRealCategory()
				let res = await this.$api.updateInfo(this.infoForm)
				if (res.code == 20000) {
					uni.showToast({
						title: "修改成功"
					})
					uni.navigateBack()
				} else {
					uni.showToast({
						title: "修改失败，请联系管理员",
						icon: "none"
					})
				}
			},
			// 暂存
			setLocal() {
				let that = this
				this.editorCtx.getContents({
					success: function(res) {
						that.infoForm.content = res.html
						uni.showModal({
							title: '确定暂存？',
							content: '此操作将会覆盖上次暂存。',
							success: function(res) {
								if (res.confirm) {
									uni.setStorageSync("infoForm", that.infoForm)
								} else if (res.cancel) {
									return
								}
							}
						})
					}
				});
			},
			// 选择字体样式
			selectTextStyle(num) {
				if (this.textStyle.includes(num)) {
					this.textStyle = this.textStyle.filter(item => {
						return item != num
					})
				} else {
					this.textStyle.push(num)
				}
				// console.log(this.textStyle)
			},
			// 选择字体大小
			selectTextSize(num) {
				this.textSize = num
			},
			// 选择字体颜色
			selectColorMain(num) {
				this.textColor = num
			},
			// 选择高亮颜色
			selectColorBg(num) {
				this.textHigh = num
			},
			// 选择对齐方式
			selectTextAlign(num) {
				this.textAlign = num
			}
		}
	}
</script>

<style lang="scss">
	@import "../Editor/assets/iconfont.css";

	.selectColor {
		color: #4e8df6;
	}

	.selectBgColor {
		background-color: #e7e7e7 !important;
	}

	.selectColorMain {
		height: 70rpx !important;
		width: 70rpx !important;
		border-radius: 35rpx !important;
		line-height: 70rpx !important;
		box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
	}

	.submitContainer {
		background-color: #fff;
		max-height: 100vh;

		// overflow-y: hidden;
		.setBack {
			width: 90%;
			margin: 0 auto;
		}

		.userInfo {
			padding: 20rpx 40rpx;
			display: flex;
			align-items: center;

			.img {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}

			.content {
				margin-left: 30rpx;
				letter-spacing: 1rpx;

				.name {
					font-weight: bold;
					color: #141414;
				}

				.identity {
					font-size: 26rpx;
					color: #999;
					margin-top: 8rpx;
				}
			}
		}

		.title {
			border-bottom: 4rpx solid #eee;

			input {
				height: 100rpx;
				font-size: 50rpx;
				padding: 10rpx 40rpx;
				letter-spacing: 1rpx;
			}
		}

		.category,
		.top {
			padding: 20rpx 40rpx;
			border-bottom: 4rpx solid #eee;
			font-size: 30rpx;

			text {
				color: #808080;
			}

			picker {
				margin-top: 10rpx;
			}
		}

		.intro {
			border-bottom: 4rpx solid #eee;

			textarea {
				height: 180rpx;
				font-size: 30rpx;
				padding: 20rpx 40rpx;
				letter-spacing: 1rpx;
			}
		}

		.edit {
			padding: 20rpx 40rpx;
			color: #808080;
		}

		.editOperate {
			display: flex;
			align-items: center;
			justify-content: space-between;

			background-color: #fff;
			box-sizing: border-box;
			position: fixed;
			bottom: 20rpx;
			left: 2%;
			width: 96%;
			height: 120rpx;
			border-radius: 14rpx;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			z-index: 999;

			.btn {
				width: 22%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				border: 2rpx solid #36c1ba;
				color: #36c1ba;
				background-color: #36c1ba10;
				border-radius: 8rpx;
			}
		}

		.mainContainer {
			padding: 0 40rpx 20rpx;

			editor {
				min-height: 74vh;
			}
		}

		.operate {
			padding-bottom: 20rpx;
			bottom: 0rpx;
			width: 100%;
			background-color: #fff;

			.operateLine {
				border-top: 2rpx solid #eee;
				border-bottom: 2rpx solid #eee;
				display: flex;
				padding: 20rpx 10rpx;

				.icon {
					width: 100%;
					display: flex;
					justify-content: space-around;

					.icon-tupian,
					.icon-text1 {
						font-size: 50rpx;
					}

					.icon-text {
						font-size: 42rpx;
					}

					.icon-undo,
					.icon-redo {
						font-size: 40rpx;
						font-weight: bold;
					}

					.close {
						display: block;
						color: #4e8df6;
						font-size: 30rpx;
						font-weight: bold;
						margin-left: 20rpx;
						letter-spacing: 1rpx;
					}
				}

			}

			.setText {
				height: 500rpx;
				overflow-y: auto;

				.textStyle,
				.alignStyle {
					padding: 20rpx 0;

					text {
						font-size: 20rpx;
						letter-spacing: 1rpx;
						color: #666;
						padding: 20rpx 40rpx 0;
					}

					.selectMain {
						width: 90%;
						margin: 20rpx auto 0;
						height: 100rpx;
						display: flex;
						justify-content: space-around;
						box-sizing: border-box;

						.iconfont,
						.common {
							width: 25%;
							height: 100rpx;
							line-height: 100rpx;
							font-size: 40rpx;
							background-color: #fafafa;
							display: block;
							text-align: center;
						}

						.small {
							font-size: 26rpx;
						}

						.normal {
							font-size: 30rpx;
						}

						.big {
							font-size: 34rpx;
						}

						.bigger {
							font-size: 38rpx;
						}
					}
				}

				.textColor,
				.highColor {
					padding: 20rpx 0;

					text {
						font-size: 20rpx;
						letter-spacing: 1rpx;
						color: #666;
						padding: 20rpx 40rpx 0;
					}

					.selectMain {
						width: 90%;
						margin: 20rpx auto 0;
						display: flex;
						justify-content: space-around;
						box-sizing: border-box;
						align-items: center;

						.common {
							height: 60rpx;
							width: 60rpx;
							border-radius: 30rpx;
						}

						.color1 {
							background-color: #222222;
						}

						.color2 {
							background-color: #707070;
						}

						.color3 {
							background-color: #ef4142;
						}

						.color4 {
							background-color: #fe7527;
						}

						.color5 {
							background-color: #01aa54;
						}

						.color6 {
							background-color: #0289e5;
						}

						.color7 {
							background-color: #742bff;
						}
					}
				}

				.highColor {
					.color1 {
						background-color: #fff !important;
						text-align: center;
						font-size: 24rpx;
						line-height: 60rpx;
					}
				}
			}

			.setOther {
				height: 500rpx;
				overflow-y: auto;

				.listStyle,
				.lineStyle {
					padding: 20rpx 0;

					text {
						font-size: 20rpx;
						letter-spacing: 1rpx;
						color: #666;
						padding: 20rpx 40rpx 0;
					}

					.selectMain {
						width: 90%;
						margin: 20rpx auto 0;
						height: 100rpx;
						display: flex;
						box-sizing: border-box;

						.iconfont {
							width: 25%;
							height: 100rpx;
							line-height: 100rpx;
							font-size: 40rpx;
							background-color: #fafafa;
							display: block;
							text-align: center;
						}

						.small {
							font-size: 26rpx;
						}

						.normal {
							font-size: 30rpx;
						}

						.big {
							font-size: 34rpx;
						}

						.bigger {
							font-size: 38rpx;
						}
					}
				}
			}
		}
	}
</style>
