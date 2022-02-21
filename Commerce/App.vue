<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	uni-picker-view {
	  display: block;
	}
	
	uni-picker-view .uni-picker-view-wrapper {
	  display: flex;
	  position: relative;
	  overflow: hidden;
	  height: 100%;
	  background-color: white;
	}
	
	uni-picker-view[hidden] {
	  display: none;
	}
	
	picker-view {
	    width: 100%;
	    height: 600upx;
	    margin-top:20upx;
	}
</style>
