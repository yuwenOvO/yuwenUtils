import Mock from 'mockjs'; //导入mockjs

Mock.mock('/getEchartClickData', 'get', {
	code: 200,
	msg: '操作成功',
	'data|7': [
		{
			'name|+1': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			'value|1-100': 100,
		},
	],
});
