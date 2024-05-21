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
	],
});

export default router;
