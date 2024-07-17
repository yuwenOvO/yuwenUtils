import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

import type { RouteRecordRaw } from 'vue-router';

const defaultRoute: RouteRecordRaw = {
	path: '/',
	name: 'home',
	component: () => import('@/views/HomeView.vue'),
	children: [...routes],
	meta: {
		title: 'Home',
	},
};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [defaultRoute],
});

router.beforeEach((to, _, next) => {
	document.title = to.meta.title || 'Vue Demo';
	next();
});

export default router;
