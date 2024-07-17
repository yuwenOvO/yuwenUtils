import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/echartClick',
		name: 'echartClick',
		component: () => import('@/views/EchartClickView.vue'),
		meta: {
			title: 'EchartClick',
		},
	},
	{
		path: '/canvasEditor',
		name: 'canvasEditor',
		component: () => import('@/views/CanvasEditView.vue'),
		meta: {
			title: 'CanvasEditor',
		},
	},
	{
		path: '/baiduMap',
		name: 'baiduMap',
		component: () => import('@/views/BaiduMapView.vue'),
		meta: {
			title: 'BaiduMap',
		},
	},
];

export default routes;
