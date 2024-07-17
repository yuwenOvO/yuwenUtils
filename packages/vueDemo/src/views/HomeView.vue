<template>
	<div class="box">
		<div class="head">
			<RouterLink to="/" v-if="!isHomeRoute">返回</RouterLink>
		</div>
		<div class="content" v-if="isHomeRoute">
			<template v-for="(route, index) in routes" :key="index">
				<div class="item" @click="() => $router.push(route.path)">
					{{ route.name }}
				</div>
			</template>
		</div>
		<div class="route-content" v-else>
			<router-view />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import routes from '@/router/routes';

const route = useRoute();

const isHomeRoute = computed(() => route.name === 'home');
</script>

<style lang="scss" scoped>
.box {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 50px;
		font-size: 20px;
		color: #fff;
		cursor: pointer;
		background-color: #42b883;
	}

	.content {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-auto-rows: 80px;
		grid-gap: 20px;
		width: 100%;
		height: calc(100% - 50px);
		padding: 20px;
		overflow: hidden;
		overflow-y: auto;
		cursor: pointer;
		background-color: #eceff7;

		&::-webkit-scrollbar {
			width: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #42b883;
			border-radius: 5px;
		}

		&::-webkit-scrollbar-track {
			background-color: #eceff7;
		}

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 80px;
			border: 1px solid #ccc;
			border-radius: 5px;

			&:hover {
				border-color: #42b883;
			}
		}
	}

	.route-content {
		box-sizing: border-box;
		width: 100%;
		height: calc(100% - 50px);
		padding: 20px;
		overflow: hidden;
		background-color: #eceff7;

		&::-webkit-scrollbar {
			width: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #42b883;
			border-radius: 5px;
		}

		&::-webkit-scrollbar-track {
			background-color: #eceff7;
		}
	}
}
</style>
