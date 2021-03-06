/**
 * 雷达图
 * @param  {string} canvas DOM id
 * @return {object}        雷达图对象
 */
export default function createRadar(canvas) {
	const c = document.getElementById(canvas);
	// 未能找到该DOM对象
	if (!c) {
		console.log("[error] can not find id \'" + canvas + "\'");
		return null;
	}
	// 引用了错误的DOM对象
	if (!c.getContext) {
		console.log("[error] getContext is undefined");
		return null;
	}

	const ctx = c.getContext("2d");

	// 画布的宽高
	const cWidth = c.width;
	const cHeight = c.height;
	// 中心点
	const centerX = c.width / 2;
	const centerY = c.height / 2;
	// 半径
	const radius = centerY * 0.9;

	const drawPoint = function (x, y, n) {
		ctx.lineWidth = 1;
		for (let i = n; i > 0; i--) {
			ctx.beginPath();
			ctx.arc(x, y, n - i, 0, 2 * Math.PI);
			ctx.strokeStyle = "rgba(42,195,39," + i / n + ")";
			ctx.stroke();
		}
	};

	const drawCircle = function (r, lineWidth = 1, color = "#090") {
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.stroke();
	};

	const drawSector = function (sAngle, eAngle) {
		let blob = 50;
		let increase = 0;

		if (sAngle < eAngle) {
			increase = (eAngle - sAngle) / blob;
		}
		else if (sAngle > eAngle) {
			increase = (Math.PI * 2 - sAngle + eAngle) / blob;
		}
		else {
			return;
		}

		let angle1 = sAngle;
		let angle2 = sAngle + increase;
		for (let i = 0; i < blob; i++) {
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, angle1, angle2);
			ctx.fillStyle = "rgba(42,195,39," + i / blob + ")";
			ctx.fill();
			angle1 = angle2;
			angle2 = angle1 + increase;
			if (angle2 >= Math.PI * 2) {
				ctx.beginPath();
				ctx.moveTo(centerX, centerY);
				ctx.arc(centerX, centerY, radius, angle1, Math.PI * 2);
				ctx.fillStyle = "rgba(42,195,39," + i / blob + ")";
				ctx.fill();
				angle1 = 0;
				angle2 = angle1 + increase;
			}
		}
	};

	const Line = function (x, y, lineDash = [], color = "#396a00", lineWidth = 1) {
		ctx.beginPath();
		ctx.setLineDash(lineDash);
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(x, y);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.stroke();
	};

	const init = function () {
		// 背景上填充为黑色
		// var img = new Image();
		// img.src = require('../../assets/radar.png');
		// img.onload = () => {
		// 		var bg = canvas.createPattern(img, "no-repeat"); //createPattern() 方法在指定的方向内重复指定的元素。
		// 		canvas.fillStyle = bg; //fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
		// 		canvas.fillRect(0, 0, c.width, c.height); //绘制已填充矩形fillRect(左上角x坐标, 左上角y坐标, 宽, 高)
		// }
		ctx.fillStyle = "rgba(0, 0, 0, 0)";
		ctx.fillRect(0, 0, cWidth, cHeight);
		for (let i = 1; i <= 8; i++) {
			Line(centerX + Math.sin(Math.PI * i / 4) * radius,
				centerY + Math.cos(Math.PI * i / 4) * radius,
				[5, 3], "#396a00");
		}

		for (let i = 1; i <= 15;) {
			Line(centerX + Math.sin(Math.PI * i / 8) * radius,
				centerY + Math.cos(Math.PI * i / 8) * radius,
				[], "#062807");
			i += 2;
		}

		drawCircle(0.9 * centerY, 2.5);
		drawCircle(0.8 * centerY, 2.5, "#042906");
		drawCircle(0.6 * centerY);
		drawCircle(0.3 * centerY);
	};

	return {
		animID: undefined,
		points: [
			[cWidth / 3, cHeight * 3 / 7],
			[cWidth * 4 / 5, cHeight * 6 / 9]
		],
		addPoints(x, y) {
			this.points.push([x, y]);
		},
		removePoints() {
			// this.points.shift();
			this.points = [];
		},
		clear() {
			cancelAnimationFrame(this.animID);		// 停止动画
			ctx.clearRect(0, 0, cWidth, cHeight);  // 清除画布
			this.points = [[cWidth / 3, cHeight * 3 / 7], [cWidth * 4 / 5, cHeight * 6 / 9]];	// 重置默认点
		},
		scan() {
			let angle = Math.PI / 4;
			let scanBegin = 0;
			let scanEnd = angle;
			let pointRadius = 1;
			// 绘制雷达扫描
			let move = () => {
				ctx.clearRect(0, 0, cWidth, cHeight);  // 清除画布
				init();								// 重绘背景
				drawSector(scanBegin, scanEnd);		// 绘制扇形扫描区域
				// drawPoint(cWidth/3, cHeight*3/7, pointRadius);	// 绘制发光点
				// drawPoint(cWidth*4/5, cHeight*6/9, pointRadius);
				for (let p of this.points) {
					drawPoint(p[0], p[1], pointRadius);
				}
				// 改变点的半径以及扇形的角度
				pointRadius += 0.08;
				scanBegin += angle / 25;
				scanEnd = scanBegin + angle;
				// 超过阈值变为初始值
				if (scanBegin >= Math.PI * 2) {
					scanBegin = 0;
					scanEnd = scanBegin + angle;
				}
				if (pointRadius >= 7) pointRadius = 0;
				// 再次绘制
				this.animID = window.requestAnimFrame(move);
			}

			window.requestAnimFrame = (function () {
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function (callback) {
						window.setTimeout(callback, 1000 / 60);
					};
			})();

			this.animID = window.requestAnimFrame(move);
		},
		stopScan() {
			cancelAnimationFrame(this.animID);
		}
	}

}


// let radar = myCanvas("myCanvas");
// if(radar) radar.scan();

