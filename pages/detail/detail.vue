<template>
	<view class="detail">
		<view :style="[detail_header]">
			<image ref='picture' :src="detail.images.small" mode="" class="pic"></image>
			<view class="detail_profile">
				<view class="title wrap_left">
					{{detail.title}}
				</view>
				<view style="margin-top: 10px;">
					<view class="detail_font wrap_left">
						({{detail.year}}) {{detail.title}}
					</view>
				</view>
				<view style="margin-top: 10px;">
					<view class="font_style wrap_left">
						<text class="detail_text">
							({{detail.year}})
						</text>
						<text \class="detail_text detail_mr sp" v-for="(item,index) in detail.genres" :key='index'>
							{{item}}/
						</text>
						<text class="detail_text">
							片长 {{detail.durations[0]}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view v-cloak>
			<rating :info='moreDetail' :colo="sentcomcolor"></rating>
		</view>
		<view class="">
			<view class="sort-introduce">剧情介绍</view>
			<view :class="{summary:summaryStyle}">
				<view v-if="summary.length<=60">
					<text>{{summary}}</text>
				</view>
				<view v-else="summary.length>60">
					<text v-if="isselec1">{{displaysummarys}}...</text>
					<text v-else>{{displaysummaryf}}...</text>
					<!-- 展开按钮 -->
					<text class="more" @click="displayMoreFont()">{{moreFonfInfo}}</text>
				</view>
			</view>
			<view class="actor">
				演职员
			</view>
			<scroll-view scroll-x="true">
				<view class="castss">
					<view class="castss-box" v-for="(single,index) in moreDetail.data.casts" :key='index'>
						<image :src="single.avatars.small" mode="widthFix" style="border-radius: 7px;"></image>
						<view>
							<text class="actor-name">
								{{single.name}}
							</text>
							<view class="actor-role">
								{{moreDetail.data.directors.name===single.name?'导演':'演员'}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
		<view class="sort-comment">
			短评
		</view>
		<view class="comments">
			<view v-for="(sin,index) in popular_reviews2" :key='index'>
				<view class="comments-title">
					<view class="comments-aver" :style="{backgroundImage:`url(${sin.author.avatar})`}"></view>
					<text>{{sin.author.name}}</text>
					<text class="pent">
						<pent :pent='sin.rating.max'></pent>
					</text>
				</view>
				<view class="comments-body">
					<view class="comments-body-box">
						<view class="comments-body-box-left">
						</view>
						<view v-if="sin.summary.length>=68">
							{{sin.summary.slice(0,68)}}
							<text class="more">...</text>
						</view>
						<view v-else='sin.summary.length<68'>
							{{sin.summary}}
						</view>
					</view>
					<view class="comments-body-box-bottom">
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import pent from '../../components/pentagon.vue'
	import rating from '../../components/rating.vue'
	export default {
		onReady: function() {

		},
		data() {
			return {
				detail: {},
				summary: '',
				moreDetail: {},
				popular_reviews: [],
				popular_reviews2: [],
				summaryStyle: true,
				moreFonfInfo: "展开",
				isselec1: true,
				detail_header: {
					width: `100%`,
					display: `flex`,
					flexDirection: `row`,
					flexWrap: `nowrap`,
					padding: `20px`,
					backgroundColor: `rgb(121, 65, 54)`
				},
				sentcomcolor: []
			}
		},
		computed: {
			displaysummaryf: function() {
				return this.summary.slice(0, this.summary.length)
			},
			displaysummarys: function() {
				return this.summary.slice(0, 60)
			},

		},
		beforeCreate: function() {
			uni.showLoading({
				title: 'loading...'
			})
		},
		onLoad(data) {
			let info = JSON.parse(data.info);
			this.detail = info;
			let colorgets = getApp().globalData.backcolor.filter(item => {
				return item.name == info.title
			})
			if (colorgets.length) {
				let cc = colorgets[0].color;
				this.sentcomcolor = cc;
				this.detail_header.backgroundColor = `rgb(${cc[0]}, ${cc[1]}, ${cc[2]})`;
			} else {
				this.detail_header.backgroundColor = `rgb(121, 65, 54)`;
			}
			uni.request({
				url: `https://douban.uieee.com/v2/movie/subject/${info.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
				success: (res) => {
					uni.setNavigationBarTitle({
						title: res.data.title
					});
					for (let i = 0; i < res.data.casts.length; i++) {
						let pictureResult = res.data.casts[i].avatars.small.replace('https://', 'https://images.weserv.nl/?url=');
						res.data.casts[i].avatars.small = pictureResult;
					}
					this.moreDetail = res;
					this.summary = res.data.summary;
					this.popular_reviews = res.data.popular_reviews;
					this.popular_reviews2 = res.data.popular_reviews.slice(0, 3);
				}
			})
			

		},
		onReachBottom() {
			uni.showLoading({
				title: '加载中...'
			});
			if (this.popular_reviews2.length != this.popular_reviews.length) {
				setTimeout(() => {
					this.popular_reviews2 = this.popular_reviews;
					uni.hideLoading()
				}, 800)
			} else {
				uni.showToast({
					title: '该写作业了...',
					duration: 400,
				})
				uni.hideLoading()
			}

		},
		mounted: function() {
			setTimeout(() => {
				uni.hideLoading()
			}, 300);
		},
		methods: {
			displayMoreFont: function() {
				if (this.moreFonfInfo === '收起') {
					this.moreFonfInfo = '展开';
					this.isselec1 = true;
				} else {
					this.moreFonfInfo = '收起'
					this.isselec1 = false;
				}
			},

		},
		components: {
			rating,
			pent,
		}
	}
</script>

<style scoped>
	.sp {
		position: relative;
		z-index: 10;
	}

	.wrap_left {
		margin-left: 10px;
	}

	.title {
		font-size: 20px;
		color: #fff;
		background-color: rgb();
	}

	.actor-role {
		font-size: 12px;
		color: #818181;
		margin-left: 15px;
	}

	.actor-name {
		font-size: 12px;
		color: black;
		text-align: left;
		height: 16px;
		margin-left: 15px;
		font-size: 12px;
		color: #818181;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;

	}

	.pic {

		width: 30%;
		height: 140px;
		border-radius: 7upx;
		margin-left: 6upx;
	}

	.actor {
		color: #818181;
		font-size: 15px;
		margin: 10px 0 14px 14px;
	}

	.detail_profile {
		width: 75%;

	}

	.detail_text {
		font-size: 12px;
		color: rgba(255, 255, 255, .7);
	}

	.left {
		width: 50%;
		height: 100px;

	}

	.castss {
		width: 90%;
		display: flex;
		flex-wrap: nowrap;
		margin: 0 auto;
		flex-direction: row;
		height: 180px;
		justify-content: space-between;
	}

	.castss view {
		width: 90%;
		height: 100px;
	}

	.castss view>image {
		width: 80%;
	}

	.detail_font {
		font-size: 15px;
		color: #fff;
	}

	.font_style {
		color: rgb(174, 168, 163);
		font-size: 12px;
	}

	.summary {
		width: 90%;
		margin: 0 auto;
		font-size: 15px;
		color: #191919;
	}

	.sort-introduce {
		margin: 12px auto;
		width: 90%;
		font-size: 15px;
		color: #818181;
	}

	.sort-comment {
		color: #818181;
		margin: 0 13px 15px;
		font-size: 15px;
	}

	.comments {
		color: #494949;
		font-size: 14px;
		width: 90%;
		margin: -5px auto;
	}

	.comments-title {
		height: 25px;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
	}

	.comments-body {
		border-bottom: 1px solid #efefef;
		margin-bottom: 12%;
	}

	.comments-aver {
		width: 25px;
		height: 25px;
		display: inline-block;
		border-radius: 50%;
		margin-right: 15px;
		background-size: cover;
		line-height: 25px;
		float: left;

	}

	.comments-aver text {
		float: left;
		font-size: 15px;
		color: gray !important;
	}

	.pent {
		width: 50%;
		height: 100%;
		display: inline-block;
		margin-left: 10%;
	}

	.comments-body-box {
		margin-top: 3%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.comments-body-box-left {
		width: 40%;
		height: 100%;
	}

	.comments-body-box-bottom {
		width: 100%;
		height: 50px;
	}

	.more {
		color: green;
		text-decoration: underline;
	}
</style>
