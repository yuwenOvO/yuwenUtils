import type { EchartClickData, MyAxiosResponse } from '@/types/api';
import http from '@/utils/request';

export const getEchartClickData = (): Promise<MyAxiosResponse<EchartClickData[]>> => {
	return http.get('/getEchartClickData');
};
