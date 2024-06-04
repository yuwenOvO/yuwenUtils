import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
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
	],
});

export default router;
