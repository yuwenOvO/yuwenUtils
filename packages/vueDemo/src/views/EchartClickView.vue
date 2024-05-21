<template>
	<div id="echarts" style="width: 100%; height: 500px"></div>
	<div v-for="(item, index) in data" :key="index">{{ item.name }}: {{ item.value }}</div>
	<button @click="refresh">刷新</button>
</template>

<script setup lang="ts">
import { getEchartClickData } from '@/api/echartsClick';
import type { EchartClickData } from '@/types/api';
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, type TooltipComponentOption, GridComponent, type GridComponentOption } from 'echarts/components';
import { BarChart, type BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | BarSeriesOption>;

const data = ref<EchartClickData[]>([]);

const init = async () => {
	const res = await getEchartClickData();
	data.value = res.data;
};

let echartsInstance: echarts.EChartsType | null = null;
echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
const getOption = () => {
	const option: EChartsOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true,
		},
		xAxis: [
			{
				type: 'category',
				data: data.value.map(item => item.name),
				axisTick: {
					alignWithLabel: true,
				},
			},
		],
		yAxis: [
			{
				type: 'value',
			},
		],
		series: [
			{
				name: '数量',
				type: 'bar',
				barWidth: '60%',
				data: data.value.map(item => item.value),
				label: {
					show: true,
					position: 'top',
				},
			},
		],
	};
	return option;
};
const initEcharts = () => {
	echartsInstance = echarts.init(document.getElementById('echarts'));
	echartsInstance.setOption(getOption());

	echartsInstance.getZr().off('click');
	echartsInstance.getZr().on('click', event => {
		const pointInPixel = [event.offsetX, event.offsetY];
		const pointInGrid = echartsInstance!.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
		if (echartsInstance?.containPixel('grid', pointInPixel)) {
			// 获取点击的数据
			const clickData = data.value[pointInGrid[0]];
			alert(`点击了${clickData.name}`);
		}
	});
};

const refresh = async () => {
	await init();
	echartsInstance!.setOption(getOption());
};

onMounted(async () => {
	// 判断生产环境
	if (import.meta.env.PROD) {
		console.log('生产环境');
	} else {
		console.log('开发环境');
	}

	await init();
	initEcharts();
});
</script>
