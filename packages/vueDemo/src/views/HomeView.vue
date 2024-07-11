<template>
	<div>1</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { WebSocketClient } from '@yuwena/utils';

onMounted(() => {
	const ws = new WebSocketClient('ws://localhost:3000');
	ws.connect();
});
</script>
