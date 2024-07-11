<template>
	<canvas id="ywcanvas"></canvas>
	<button @click="canvas!.setDrawType('line')">画直线</button>
	<button @click="canvas!.setDrawType('arrow')">画箭头</button>
	<button @click="canvas!.setDrawType('rect')">画矩形</button>
	<button @click="canvas!.setDrawType('circle')">画圆形</button>
	<button @click="canvas!.setDrawType('path')">画笔</button>
	<button @click="canvas!.setDrawType('text')">添加文案</button>
	<button @click="canvas!.undo()">撤销</button>
	<button @click="canvas!.clear()">重置</button>
	<button @click="saveImage">保存为图片</button>
</template>

<script setup lang="ts">
import testImg from '@/assets/test.png';
import { onMounted } from 'vue';

import { CanvasEdit } from '@yuwena/utils';

let canvas: CanvasEdit | null = null;

onMounted(() => {
	canvas = new CanvasEdit('ywcanvas', {
		backgroundColor: '#fff', // 画布背景色
		width: 600,
		height: 400,
		selection: false,
	});
	canvas.addImage(testImg);
});

const saveImage = () => {
	const img = canvas!.saveAsImage();
	const a = document.createElement('a');
	a.href = img;
	a.download = 'canvas.png';
	a.click();
};
</script>

<style scoped>
#ywcanvas {
	width: 600px;
	height: 400px;
}
</style>
