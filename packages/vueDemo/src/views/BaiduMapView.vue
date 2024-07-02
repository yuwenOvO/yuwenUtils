<template>
	<div class="map-query">
		<div class="content">
			<div id="map" ref="mapRef"></div>
			<div class="search">
				<input v-model="searchVal" @change="search" />
			</div>
			<div class="now-address">
				<div class="title"><b>当前选中地址：</b>{{ nowAddress.address }}</div>
			</div>
			<div class="list">
				<ul>
					<li v-for="item in searchLocalList" :key="item.id" @click="goto(item)">
						<div class="title">{{ item.title }}</div>
						<div class="address">{{ item.address }}</div>
					</li>
				</ul>
			</div>
		</div>

		<div ref="infoWindowRef">
			<div>名称: {{ nowAddress.title }}</div>
			<div>地址：{{ nowAddress.address }}</div>
			<div>经纬度：{{ nowAddress.point.lng }},{{ nowAddress.point.lat }}</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, shallowRef } from 'vue';

import { debounce } from 'lodash';

const searchVal = ref(''); //搜索地址
const mapRef = ref(null); //地图容器
const BMap = window.BMap; //百度地图api
const BMAP_STATUS_SUCCESS = window.BMAP_STATUS_SUCCESS; //百度地图api
const baiduMap = shallowRef<any>(null); //百度地图实例
const local = shallowRef<any>(null); //百度地图搜索实例
const geoc = shallowRef<any>(null); //百度地图逆地址解析实例
const searchLocalList = ref<any[]>([]); //搜索到的地址列表
const nowAddress = ref({
	address: '',
	point: {
		lng: '',
		lat: '',
	},
	title: '',
}); //当前地址
const point = ref<any>({}); //当前地址经纬度
const infoWindowRef = ref(null) as any; //信息窗口
// 初始化地图
const initMap = () => {
	baiduMap.value = new BMap.Map(mapRef.value); // 创建地图实例
	baiduMap.value.centerAndZoom('全国', 15); // 初始化地图，设置中心点坐标和地图级别
	baiduMap.value.enableScrollWheelZoom(); //开启鼠标滚轮缩放
	local.value = new BMap.LocalSearch(baiduMap.value, {
		renderOptions: { autoViewport: true },
		onSearchComplete: function (results: any) {
			// 判断状态是否正确
			if (local.value.getStatus() == BMAP_STATUS_SUCCESS) {
				const length = results.getCurrentNumPois();
				searchLocalList.value = [];
				for (let i = 0; i < length; i++) {
					searchLocalList.value.push(results.getPoi(i));
				}
			}
		},
	}); // 地图关键词搜索
	geoc.value = new BMap.Geocoder(); // 地址解析
	baiduMap.value.addEventListener('click', clickMapHandler); //点击地图事件
};
// 地图关键词搜索 500ms内只执行一次
const search = debounce(() => {
	if (!searchVal.value) return;
	local.value.search(searchVal.value);
}, 500);
// 点击地图事件 获取当前点击的经纬度 逆地址解析 获取当前地址 信息窗口 显示当前地址信息
const clickMapHandler = (e: any) => {
	const pt = e.point;
	geoc.value.getLocation(pt, function (rs: any) {
		var addComp = rs.addressComponents;
		nowAddress.value.title = addComp.street + addComp.streetNumber;
		nowAddress.value.address = (addComp.province === addComp.city ? addComp.city : addComp.province + addComp.city) + addComp.district + addComp.street + addComp.streetNumber;
		nowAddress.value.point.lng = pt.lng;
		nowAddress.value.point.lat = pt.lat;
		setMarker(pt);
	});
};
// 设置标记点
const setMarker = (point: any) => {
	const info = new BMap.InfoWindow(infoWindowRef.value);
	removeMarker();
	const marker = new BMap.Marker(new BMap.Point(point.lng, point.lat));
	baiduMap.value.addOverlay(marker);
	baiduMap.value.openInfoWindow(info, new BMap.Point(point.lng, point.lat));
	marker.addEventListener('click', function () {
		baiduMap.value.openInfoWindow(info, new BMap.Point(point.lng, point.lat));
	});
};
// 移除标记点
const removeMarker = () => {
	baiduMap.value.clearOverlays();
};
// 点击列表项跳转到目标地址
const goto = (item: any) => {
	nowAddress.value = item;
	point.value = item.point;
	setMarker(point.value);
	baiduMap.value.centerAndZoom(new BMap.Point(point.value.lng, point.value.lat), 18);
};

// 必须在onMounted中调用initMap
onMounted(() => {
	initMap();
});
</script>
<style lang="scss" scoped>
.map-query {
	width: 100vw;
	height: 100vh;
	overflow: hidden;

	.content {
		position: relative;
		width: 100%;
		height: calc(100% - 50px);

		.search {
			box-sizing: border-box;
			width: 100%;
			height: 50px;
			padding: 10px;
		}

		#map {
			width: 100%;
			height: 40vh;
			min-height: 300px;
			padding: 0;
			margin: 0;
		}

		.mark {
			position: absolute;
			top: 270px;
			left: 0;
			width: 100%;
			height: 30px;
			background-color: transparent;
		}

		.now-address {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 100%;
			height: 30px;
			padding: 0 10px;
			overflow: hidden;
			overflow-x: auto;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.list {
			width: 100%;
			height: calc(100% - 280px);
			overflow: hidden;
			overflow-y: auto;

			> ul {
				width: 100%;

				> li {
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					justify-content: space-between;
					width: 100%;
					min-height: 50px;
					padding: 5px 10px;
					border-top: 1px solid #eee;

					.title {
						font-size: 14px;
						font-weight: 700;
					}

					.address {
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
}
</style>
