<template>
	<view>
		<view v-if="getshopinfo.length==0" style="font-size: 60rpx;color: gray;text-align: center;">
			请点击前面💗添加到购物车
		</view>
		<view v-else class="shopcar" v-for="(itema,indexa) in getshopinfo" :key='indexa'>
			<view class="selecradio">
			</view>
			<view class="shopcar_left_pic">
				<image :src="itema.images.small" style="width: 90%;height: 90%;border-radius: 9rpx;position: absolute;top: 50%;left: 50%; transform: translate(-50%,-50%)"></image>
			</view>
			<view class="shopcar_right">
				<view class="shopcar_right_top">
					<view class="shopcar_right_top_title">
						<view class="shopcar_right_top_titles">
							{{itema.title}}
						</view>
						<view class="shopcar_right_top_actor">
							(导演)
							<text style="color: rgb(0,0,0);">{{itema.directors[0].name?itema.directors[0].name:'未知'}}</text>
							/(主演)
							<text style="color: rgb(0,0,0);">{{itema.casts[0].name?itema.casts[0].name:'未知'}} </text>
						</view>
					</view>
				</view>
				<view class="shopcar_right_bottom">
					<view style="display: inline-block;margin-top: 10rpx; ">
						¥{{itema.price}}
					</view>
					<view style="display: inline-block;margin-left:40% ;margin-top: 40rpx;">
						<button type="warn" size="mini" v-on:click="deletecar({itema,indexa})">删除</button>
					</view>
				</view>
			</view>

		</view>
		<view class="last" style="width: 100%;height: 120px;">

		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			getshopinfo() {
				return this.$store.state.selected
				}
		},
		methods: {
			deletecar({itema,indexa}){
				this.$store.commit('changeiswanteda', itema)
				let mm = 0;
				for (let i = 0; i < this.getshopinfo.length; i++) {
					mm += this.getshopinfo[i].price
				};
				let len = this.getshopinfo.length
				len == 0 ? uni.removeTabBarBadge({
					index: 1
				}) : uni.setTabBarBadge({
					index: 1,
					text: len + ''
				});
			}

		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}

	.shopcar_right_top_titles {
		width: 100%;
		height: 50%;
		font-size: 35rpx;
		font-weight: 800;
		font-family: -apple-system-body, system-ui, BlinkMacSystemFont;
	}

	.shopcar_right_top_actor {
		width: 100%;
		height: 50%;
		color: rgba(0, 0, 0, .25);
		font-weight: 600;
		font-size: 30rpx
	}

	.shopcar {
		width: 90%;
		height: 250rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		margin-bottom: 16rpx;
		border-radius: 9rpx;
		box-shadow: 0 5px 3px #888888;
		;
	}

	.shopcar_left_pic {
		width: 36%;
		height: 100%;
		position: relative;

	}

	.shopcar_right_top {
		width: 100%;
		height: 125rpx;
		border-bottom: 1px solid rgb(0, 0, 0, .1);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal;
		word-wrap: break-word;
		white-space: nowrap;
		-webkit-line-clamp: 1;
	}

	.shopcar_right_top_title {
		width: 95%;
		height: 90%;
		margin: 0 auto;
	}

	.shopcar_right_bottom {
		width: 100%;
		height: 125rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal;
		word-wrap: break-word;
		-webkit-line-clamp: 1;

	}

	.shopcar_right {
		width: 60%;
		height: 100%;
	}

	.selecradio {
		width: 3%;
		height: 100%;
		position: relative;

	}
</style>
