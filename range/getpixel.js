const getpixel = function(canvas, img) {
	 canvas = document.getElementById('myCanvas');
	let bkImg = new Image();
	bkImg.crossOrigin = 'anonymous';
	bkImg.onload = function() {
		canvas.setAttribute('width', this.width);
		canvas.setAttribute('height', this.height);
		let context = canvas.getContext('2d');
		context.drawImage(this, 0, 0);
		let imgData = context.getImageData(0, 0, this.width, this.height);
		let r = 0,
			g = 0,
			b = 0;
		for (let i = 0; i < imgData.data.length; i++) {
			if (i % 4 === 0) {
				r += imgData.data[i];
			} else if (i % 4 === 1) {
				g += imgData.data[i]
			} else if (i % 4 === 2) {
				b += imgData.data[i]
			}
		}
		console.log(Math.floor(r / (bkImg.width * bkImg.height)))
		console.log(Math.floor(g / (bkImg.width * bkImg.height)))
		console.log(Math.floor(b / (bkImg.width * bkImg.height)))
	};
	bkImg.src = "https://images.weserv.nl/?url=img3.doubanio.com/view/photo/s_ratio_poster/public/p2577437186.webp";

}
export default getpixel;
