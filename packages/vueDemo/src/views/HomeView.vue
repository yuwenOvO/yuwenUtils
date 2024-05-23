<template>
	<canvas id="ywcanvas"></canvas>

	<button @click="toggleDrawLine">画直线</button>
	<button @click="toggleDrawArrow">画箭头</button>
	<button @click="toggleDrawRect">画矩形</button>
	<button @click="toggleDrawCircle">画圆形</button>
	<button @click="toggleDrawPath">画笔</button>
	<button @click="toggleAddText">添加文案</button>
	<button @click="undo">撤销</button>
	<button @click="reset">重置</button>
	<button @click="saveAsImage">保存为图片</button>
</template>

<script setup lang="ts">
import testImg from '@/assets/loginBgOne.png';
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';

let canvas: fabric.Canvas | null = null;

let isDown: boolean = false;
const type = ref('');

let line: fabric.Line | null = null;

let alltogetherObj: fabric.Group | null = null;
let arrowOrigin = { x: 0, y: 0 };

let rect: fabric.Rect | null = null;
let rectOrigin = { x: 0, y: 0 };

let ellipse: fabric.Ellipse | null = null;
let ellipseOrigin = { x: 0, y: 0 };

let activeText: fabric.IText | null = null;

let history: any[] = [];

const init = () => {
	canvas = new fabric.Canvas('ywcanvas', {
		backgroundColor: 'rgb(100,100,200)', // 画布背景色
		selection: false, // 在画布中鼠标是否可以框选 默认为true
		width: 600,
		height: 400,
	});
	insertImg();
};

const insertImg = () => {
	if (!canvas) return;
	let img = new Image();
	img.src = testImg;
	img.onload = () => {
		canvas!.setWidth(600);
		canvas!.setHeight(400);
		const maxWidth = 600;
		const maxHeight = 400;
		const scaleX = maxWidth / img.width;
		const scaleY = maxHeight / img.height;
		fabric.Image.fromURL(testImg, img => {
			img.set({
				scaleX: scaleX,
				scaleY: scaleY,
				left: 0,
				top: 0,
			});
			canvas!.setBackgroundImage(img, canvas!.renderAll.bind(canvas));
		});
	};
};

// TODO: 加防抖
const undo = async () => {
	if (history.length > 0) {
		const last = history.pop();
		canvas!.remove(last);
	}
};

const reset = () => {
	if (!canvas) return;
	canvas.clear(); // 清除画布上的所有对象
	history = []; // 清空历史记录
	insertImg(); // 重新插入背景图像
};

const saveAsImage = () => {
	if (!canvas) return;
	const dataURL = canvas.toDataURL({
		format: 'png',
		quality: 1,
	});
	const link = document.createElement('a');
	link.download = 'canvas.png';
	link.href = dataURL;
	link.click();
};

const toggleDrawLine = () => {
	if (type.value === 'line') {
		type.value = '';
	} else {
		type.value = 'line';
	}
	draw();
};

const toggleDrawArrow = () => {
	if (type.value === 'arrow') {
		type.value = '';
	} else {
		type.value = 'arrow';
	}
	draw();
};

const toggleDrawRect = () => {
	if (type.value === 'rect') {
		type.value = '';
	} else {
		type.value = 'rect';
	}
	draw();
};

const toggleDrawCircle = () => {
	if (type.value === 'circle') {
		type.value = '';
	} else {
		type.value = 'circle';
	}
	draw();
};

const toggleDrawPath = () => {
	if (type.value === 'path') {
		type.value = '';
	} else {
		type.value = 'path';
	}
	draw();
};

const toggleAddText = () => {
	if (type.value === 'text') {
		type.value = '';
	} else {
		type.value = 'text';
	}
	draw();
};

const disableDraw = () => {
	if (!canvas) return;
	canvas.isDrawingMode = false;
	canvas.off('path:created');
};

const enableDraw = () => {
	if (!canvas) return;
	canvas.isDrawingMode = true;
	canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
	canvas.freeDrawingBrush.color = 'red';
	canvas.freeDrawingBrush.width = 2;

	canvas.on('path:created', (e: any) => {
		e.path.selectable = false;
		e.path.hoverCursor = 'default';
		history.push(e.path);
	});
};

const draw = () => {
	if (!canvas) return;
	if (type.value !== 'path') {
		disableDraw();
	} else {
		enableDraw();
		return;
	}
	canvas!.off('mouse:down', mouseDown);
	canvas!.off('mouse:move', mouseMove);
	canvas!.off('mouse:up', mouseUp);
	canvas!.on('mouse:down', mouseDown);
	canvas!.on('mouse:move', mouseMove);
	canvas!.on('mouse:up', mouseUp);
};

const drawLine = {
	onMouseDown: (o: any) => {
		isDown = true;
		const pointer = canvas!.getPointer(o.e);
		const points = [pointer.x, pointer.y, pointer.x, pointer.y];
		line = new fabric.Line(points, {
			stroke: 'red',
			strokeWidth: 2,
			selectable: false,
			hoverCursor: 'default',
		});
		canvas!.add(line);
	},
	onMouseMove: (o: any) => {
		if (!isDown || !line) return;
		const pointer = canvas!.getPointer(o.e);
		line.set({ x2: pointer.x, y2: pointer.y });
		canvas!.renderAll();
	},
	onMouseUp: () => {
		isDown = false;
		if (line && line.x1 !== line.x2 && line.y1 !== line.y2) {
			line.setCoords();
			history.push(line);
		}
		line = null;
	},
};

const drawArrow = {
	onMouseDown: (o: any) => {
		isDown = true;
		const pointer = canvas!.getPointer(o.e);
		const points = [pointer.x, pointer.y, pointer.x, pointer.y];
		line = new fabric.Line(points, {
			stroke: 'red',
			strokeWidth: 2,
			selectable: false,
			hoverCursor: 'default',
		});
		canvas!.add(line);
		arrowOrigin = { x: pointer.x, y: pointer.y };
	},
	onMouseMove: (o: any) => {
		if (!isDown || !line) return;
		const pointer = canvas!.getPointer(o.e);

		// 计算箭头角度
		const angle = (Math.atan2(pointer.y - arrowOrigin.y, pointer.x - arrowOrigin.x) * 180) / Math.PI;
		// 计算偏移量 使箭头在线段的末端 箭头width为10 height为15 线段宽度为2
		const left = pointer.x * Math.cos((angle * Math.PI) / 180);
		const top = pointer.y * Math.sin((angle * Math.PI) / 180);
		console.log(left, top);
		const triangle = new fabric.Triangle({
			width: 10,
			height: 15,
			fill: 'red',
			left: left,
			top: top,
			angle: angle + 90,
			selectable: false,
			hoverCursor: 'default',
		});

		line.set({ x2: pointer.x, y2: pointer.y });

		var objs = [line, triangle];

		if (alltogetherObj) {
			canvas!.remove(alltogetherObj);
		}
		alltogetherObj = new fabric.Group(objs, { selectable: false, hoverCursor: 'default' });
		canvas!.add(alltogetherObj);
	},
	onMouseUp: () => {
		isDown = false;
		if (line && line.x1 !== line.x2 && line.y1 !== line.y2) {
			line.setCoords();
			history.push(line);
		}
		line = null;
	},
};

const drawRect = {
	onMouseDown: (o: any) => {
		isDown = true;
		const pointer = canvas!.getPointer(o.e);
		rectOrigin = { x: pointer.x, y: pointer.y };
		rect = new fabric.Rect({
			left: pointer.x,
			top: pointer.y,
			fill: 'transparent',
			stroke: 'red',
			strokeWidth: 2,
			selectable: false,
			hoverCursor: 'default',
		});
		canvas!.add(rect);
	},
	onMouseMove: (o: any) => {
		if (!isDown || !rect) return;
		const pointer = canvas!.getPointer(o.e);
		if (rectOrigin.x > pointer.x) {
			rect.set({ left: Math.abs(pointer.x) });
		}
		if (rectOrigin.y > pointer.y) {
			rect.set({ top: Math.abs(pointer.y) });
		}
		rect.set({ width: Math.abs(rectOrigin.x - pointer.x), height: Math.abs(rectOrigin.y - pointer.y) });
		canvas!.renderAll();
	},
	onMouseUp: () => {
		isDown = false;
		if (rect) {
			rect.setCoords();
			history.push(rect);
		}
		rect = null;
		rectOrigin = { x: 0, y: 0 };
	},
};

const drawEllipse = {
	onMouseDown: (o: any) => {
		isDown = true;
		const pointer = canvas!.getPointer(o.e);
		ellipseOrigin = { x: pointer.x, y: pointer.y };
		ellipse = new fabric.Ellipse({
			left: pointer.x,
			top: pointer.y,
			rx: 1,
			ry: 1,
			fill: 'transparent',
			stroke: 'red',
			strokeWidth: 2,
			selectable: false,
			hoverCursor: 'default',
		});
		canvas!.add(ellipse);
	},
	onMouseMove: (o: any) => {
		if (!isDown || !ellipse) return;
		const pointer = canvas!.getPointer(o.e);

		if (ellipseOrigin.x > pointer.x) {
			ellipse.set({ left: Math.abs(pointer.x) });
		}
		if (ellipseOrigin.y > pointer.y) {
			ellipse.set({ top: Math.abs(pointer.y) });
		}

		ellipse.set({ rx: Math.abs(ellipseOrigin.x - pointer.x) / 2, ry: Math.abs(ellipseOrigin.y - pointer.y) / 2 });
		canvas!.renderAll();
	},
	onMouseUp: () => {
		isDown = false;
		if (ellipse) {
			ellipse.setCoords();
			history.push(ellipse);
		}
	},
};

const drawText = {
	onMouseDown: (o: any) => {
		if (o.target && o.target.type === 'i-text') return;
		const pointer = canvas!.getPointer(o.e);
		if (!activeText) {
			activeText = new fabric.IText('', {
				left: pointer.x,
				top: pointer.y,
				fill: 'red',
				editable: true,
				fontSize: 20,
				selectable: true,
				hoverCursor: 'default',
			});
			canvas!.add(activeText);
			activeText.enterEditing();
			activeText.hiddenTextarea?.focus();
		} else {
			activeText.exitEditing();
			if (!activeText.text) {
				canvas!.remove(activeText);
			} else {
				history.push(activeText);
			}
			activeText = null;
		}
	},
};

const mouseDown = (o: any) => {
	if (type.value === 'line') {
		drawLine.onMouseDown(o);
	} else if (type.value === 'arrow') {
		drawArrow.onMouseDown(o);
	} else if (type.value === 'rect') {
		drawRect.onMouseDown(o);
	} else if (type.value === 'circle') {
		drawEllipse.onMouseDown(o);
	} else if (type.value === 'text') {
		drawText.onMouseDown(o);
	}
};

const mouseMove = (o: any) => {
	if (type.value === 'line') {
		drawLine.onMouseMove(o);
	} else if (type.value === 'arrow') {
		drawArrow.onMouseMove(o);
	} else if (type.value === 'rect') {
		drawRect.onMouseMove(o);
	} else if (type.value === 'circle') {
		drawEllipse.onMouseMove(o);
	}
};

const mouseUp = () => {
	if (type.value === 'line') {
		drawLine.onMouseUp();
	} else if (type.value === 'arrow') {
		drawArrow.onMouseUp();
	} else if (type.value === 'rect') {
		drawRect.onMouseUp();
	} else if (type.value === 'circle') {
		drawEllipse.onMouseUp();
	}
};

onMounted(() => {
	init();
});
</script>

<style scoped>
#ywcanvas {
	width: 600px;
	height: 400px;
}
</style>
