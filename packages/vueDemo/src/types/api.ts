export interface MyAxiosResponse<T> {
	code: number;
	msg: string;
	data: T;
}

export interface EchartClickData {
	name: string;
	value: number;
}
