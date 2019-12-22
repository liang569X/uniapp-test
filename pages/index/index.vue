<template>
	<view>
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="2000">
				<swiper-item v-for="(item,index) in in_theaters" v-bind:key='index'>
					<canvas canvas-id="myCanvas" class="myCanvas">
						<image :src="item.images.small" v-on:click="enterPic(item)"></image>
					</canvas>
				</swiper-item>
			</swiper>
		</view>
		<text style="color:red;font-size: 25px; ">{{errinfo}}</text>
		<view class="divide">
		</view>
		<view class="recomment">
			推荐购买
		</view>
		<view class="buylist">
			<view class="item1" v-for="(itemlist,indexlist) in in_theaters_more_s" :key='indexlist'>
				<view class="item1-left">
					<image :src="itemlist.images.small"></image>
				</view>
				<view class="item1-right">
					<view class="item1-right-top">
						<view class="item1-right-top-top">
							<view class="irtt">
								{{itemlist.title}}
								<text style="margin-left:3rpx; color: #818181;">({{itemlist.mainland_pubdate.slice(0,4)}})</text>
							</view>
							<pentagon style="height: 20%; position: relative;bottom: 12rpx;"></pentagon>
						</view>
						<view class="item1-right-top-bottom">
							<view class="irtb">
								{{itemlist.directors[0].name}}/{{itemlist.mainland_pubdate.slice(0,4)}}/{{itemlist.durations[0]}}
								/{{itemlist.genres.toString().replace(/\"/g, "").replace(/\,/g,'..')}}
							</view>
						</view>
						<view style="position: absolute;
						top: 50%;right: 10px;
						transform: translateY(-50%);
						width: 50rpx;
						height:50rpx;
						">
							<image v-if="itemlist.iswanted" src="../../static/want.png" style="width: 100%;" v-on:tap="clickheart(indexlist)"></image>
							<image v-else src="../../static/wanted.png" style="width: 100%;" v-on:tap="clickheart(indexlist)"></image>
						</view>
					</view>
					<view class="item1-right-bottom">
						<view style="position: relative;
						  width: 90%;height: 65%;
						  margin: 0 auto;top: 50%; 
						  transform: translateY(-50%);
						      font-size: 13px;
						      color: rgba(0,0,0,.5);
							  background-color: rgba(0,0,0,.03);
							  display: flex;
							  align-items: center;
							  border-radius: 5rpx;	  
						   ">
							<view style="margin-left: 10rpx;">
								你可能感兴趣
							</view>
						</view>
					</view>
				</view>

			</view>

		</view>

	</view>
</template>
<script>
	import pentagon from '../../components/pentagon.vue'
	import badge from '../../components/uni-badge.vue'
	export default {
		computed: {
			in_theaters: function() {
				return this.$store.state.in_theaters
			},
			in_theaters_more_s: function() {
				return this.$store.state.in_theaters_more_s
			},
		},
		data() {
			return {
				errinfo: ''
			}
		},
		components: {
			pentagon,
			badge
		},
		beforeMount: function() {
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(() => {
				uni.hideLoading()
			}, 600)
		},
		onLoad() {
			uni.request({
				url: 'https://douban.uieee.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=14',
				success: (res) => {
					this.errinfo ? this.errinfo = '' : void 0;
					for (let i = 0; i < res.data.subjects.length; i++) {
						res.data.subjects[i].iswanted = true;
						res.data.subjects[i].price = Math.floor(Math.random().toFixed(4) * 1000);
						let pictureResult = res.data.subjects[i].images.small.replace('https://', 'https://images.weserv.nl/?url=');
						res.data.subjects[i].images.small = pictureResult;
					};
					this.$store.dispatch('change_in_theatersdata', res.data.subjects.slice(0, 6))
					this.$store.dispatch('change_in_theaters_more_sdata', res.data.subjects.slice(7, 15))
				},
				fail: (e) => {
					this.errinfo = '发生错误可能是豆瓣API的问题/次数限制' + e.errMsg
				},

			});
		},
		methods: {
			enterPic: function(item) {
				uni.navigateTo({
					url: '../detail/detail?info=' + JSON.stringify(item),
					animationType: 'slide-in-right',
					animationDuration: 300,
				})
			},
			clickheart: function(indexlist) {
				this.$store.commit('changeiswanted', indexlist)
				let badgeText1 = this.$store.state.in_theaters_more_s.filter(item => item.iswanted == false).length;
				this.$store.commit('changeSelected', this.in_theaters_more_s.filter(item => item.iswanted == false));
				if (badgeText1 != 0) {
					badgeText1 = badgeText1;
					uni.setTabBarBadge({
						index: 1,
						text: badgeText1 + ''
					})
				} else {
					uni.removeTabBarBadge({
						index: 1
					})
				}

			}
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}

	.banner {
		width: 100%;
		height: 55vh;
	}

	.irtb {
		font-size: 15px;
		color: #191919;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal;
		word-wrap: break-word;
	}

	swiper {
		height: 100%;
	}

	swiper-item {
		height: 50vh;
		text-align: center;
	}

	.myCanvas {
		height: 100%;
		width: 100%;
		border-radius: 7rpx;

	}

	image {
		height: 110%;
		width: 90vw;
		border-radius: 7rpx;
	}

	.irtt {
		font-size: 17px;
		color: rgba(0, 0, 0, .9);
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;

	}

	.divide {
		width: 90%;
		height: 40px;
		margin: 0 auto;
	}

	.item1-right-top {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		position: relative;

	}

	.item1-right-top-top {
		height: 50%;
		width: 80%;
	}

	.item1-right-top-bottom {
		height: 50%;
		width: 80%;
	}

	.buylist {
		width: 90%;
		margin: 5px auto;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;

	}

	.buylist .item1 {
		width: 100%;
		height: 25vh;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: row;
	}

	.buylist .item1 .item1-left {
		width: 30%;
		height: 100%;
	}

	.item1-right {
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;

	}

	.item1-left image {
		width: 80%;
		height: 66%;
		border-radius: 5px;
		margin-top: 3rpx;
		margin-left: 5rpx;
	}

	.recomment {
		height: 90upx;
		width: 90%;
		margin: 0 auto;
		line-height: 90upx;
		font-size: 21px;
		color: rgba(0, 0, 0, .9);
		font-family: -apple-system, "Droid Sans", Helvetica, sans-serif;
	}

	.item1-right-top {
		width: 100%;
		height: 62%;
	}

	.item1-right-bottom {
		width: 100%;
		height: 38%;
	}
</style>
