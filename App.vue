<script>
	export default {
		globalData: {
			backcolor: [{
					name: '误杀',
					color: [139, 127, 118]
				},
				{
					name: '星球大战9：天行者崛起',
					color: [118, 124, 146]
				},
				{
					name: '叶问4：完结篇',
					color: [128, 118, 112]
				},
				{
					name: '只有芸知道',
					color: [133, 130, 104]
				},
				{
					name: '坂本龙一：终曲',
					color: [50, 63, 57]
				},
				{
					name: '被光抓走的人',
					color: [174, 142, 131]
				},
			],
			selected: [],
		},
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

<style>
	/* @import url("./range/uni.css"); */
	/*每个页面公共css */
</style>
