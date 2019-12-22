<template>
	<view :style="[cccc]">
		<view class="main">
			<view class="rating-left">
				<view class="rating-left-top">
					豆瓣评分 TM
				</view>
				<view class="rating-left-bottom">
					<text :style="{fontSize:info.data.rating.average===0?'12px':'36px'}">
						{{info.data.rating.average===0?'未上映':info.data.rating.average}}
					</text>
					<view class="pentagon">
						<i v-for="(item,index) in Math.ceil(Math.ceil(info.data.rating.average)/2)" class='back-pic'>

						</i>
						<i class='back-pic-blank' v-for='(itemf,indexf) in (5-Math.ceil(Math.ceil(info.data.rating.average)/2))'>

						</i>
					</view>
					<view class="pentagon-bottom">
						<text>
							{{info.data.wish_count}}人评分
						</text>

					</view>

				</view>
			</view>
			<view class="rating-right">
				<view class="blank">

				</view>
				<view class="content">
					<view class="content-right">
						<view class="rowf row">
							<view class="colorele">

							</view>
						</view>
						<view class="rows row">
							<view class="colorele1">

							</view>
						</view>
						<view class="rowt row">
							<view class="colorele2">

							</view>
						</view>
						<view class="rowf row">
							<view class="colorele3">

							</view>
						</view>
						<view class="rowe row">
							<view class="colorele4">

							</view>
						</view>

					</view>
					<view class="content-left">
						<view>
							<i class='five'></i>
							<i class='five'></i>
							<i class='five'></i>
							<i class='five'></i>
							<i class='five'></i>
						</view>
						<view>
							<i class='five'></i>
							<i class='five'></i>
							<i class='five'></i>
							<i class='five'></i>
						</view>
						<view>
							<i class='five'></i>
							<i class='five'></i>
							<i class='five'></i>
						</view>
						<view>
							<i class='five'></i>
							<i class='five'></i>
						</view>
						<view>
							<i class='five'></i>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object
			},
			colo: {
				type: Array
			}
		},
		data() {
			return {
				cccc: {
					width: `100%`,
					height: `300upx`,
					backgroundColor: `rgb(121, 65, 54)`,
					marginTop: `-1px`
				}
			};
		},
		mounted: function() {
			if (this.colo.length) {
				this.cccc.backgroundColor = `rgb(${this.colo[0]}, ${this.colo[1]}, ${this.colo[2]})`
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.main {
		margin: 0 auto;
		width: 88%;
		border-radius: 7px;
		height: 80%;
		background-color: rgba(0, 0, 0, 0.17);
		transform: translateY(7%);
	}

	.rating-left {
		height: 100%;
		width: 50%;
		position: absolute;
		top: 0;
		left: 0;
		color: #FFFFFF;
	}

	.rating-right {
		height: 100%;
		width: 50%;
		position: absolute;
		top: 0;
		right: 0;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}

	.rating-left-top {
		height: 40%;
		width: 60%;
		font-size: 12px;
		text-align: center;
		line-height: 40px;
	}

	.rating-left-bottom {
		height: 60%;
		width: 100%;

	}

	.rating-left-bottom text {
		font-size: 36px;
		margin-left: 13px;
	}

	.back-pic {
		width: 15px;
		height: 15px;
		display: inline-block;
		background-image: url('.././static/wuxing.png');
		background-repeat: no-repeat;
		background-size: cover;


	}

	.back-pic-blank {
		width: 15px;
		height: 15px;
		display: inline-block;
		background-image: url('.././static/graypenta.png');
		background-repeat: no-repeat;
		background-size: cover;

	}

	.pentagon {
		width: 50%;
		float: right;
		margin-top: 8%;
		margin-right: 10px;
	}

	.pentagon-bottom {
		width: 60%;
		height: 30rpx;
		position: absolute;
		right: 15%;
		bottom: 18%;
		text-align: center;
	}

	.pentagon-bottom text {
		font-size: 12px;
		display: inline-block;
		margin: 0 auto;
		position: absolute;
		right: 0;
	}

	.blank {
		width: 100%;
		height: 40%;
	}

	.content {
		height: 60%;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

	}

	.content-left {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}

	.content-left view {
		width: 100%;
		height: 18%;

	}

	.content-left view i {
		height: 100%;
		width: 14%;
		float: left;
	}

	.content-right {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}

	.five {
		width: 30%;
		height: 30%;
		display: inline-block;
		background-image: url('.././static/hello.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.row {
		width: 100%;
		height: 20%;
		position: relative;
	}

	.colorele {
		width: 30%;
		height: 25%;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffac2c;
	}

	.colorele1 {
		width: 70%;
		height: 25%;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffac2c;
	}

	.colorele2 {
		width: 60%;
		height: 25%;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffac2c;
	}

	.colorele3 {
		width: 40%;
		height: 25%;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffac2c;
	}

	.colorele4 {
		width: 10%;
		height: 25%;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #ffac2c;
	}
</style>
