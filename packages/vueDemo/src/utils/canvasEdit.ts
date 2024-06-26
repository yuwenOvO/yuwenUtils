import { fabric } from 'fabric';
import type { IEvent } from 'fabric/fabric-impl';

type DrawType = 'line' | 'arrow' | 'rect' | 'circle' | 'path' | 'text' | '';

class CanvasEdit {
	canvas: fabric.Canvas; // canvas实例
	private darwType: DrawType = ''; // 绘制类型
	private color: string = 'red'; // 颜色
	private url: string = ''; // 图片地址
	private maxWidth: number = 600; // 最大宽度
	private maxHeight: number = 400; // 最大高度
	private history: fabric.Object[] = []; // 历史记录
	private isDown: boolean = false; // 鼠标是否按下

	private line: fabric.Line | null = null; // 直线

	private arrow: fabric.Triangle | null = null; // 箭头

	private rect: fabric.Rect | null = null; // 矩形
	private rectOrigin: { x: number; y: number } = { x: 0, y: 0 }; // 矩形起点

	private ellipse: fabric.Ellipse | null = null; // 圆
	private ellipseOrigin: { x: number; y: number } = { x: 0, y: 0 }; // 圆起点

	private activeText: fabric.IText | null = null; // 文字

	/**
	 * 构造函数
	 * @param canvasId canvasId
	 * @param options fabric配置
	 */
	constructor(canvasId: string, options?: fabric.ICanvasOptions) {
		const dom = document.getElementById(canvasId);
		if (!dom) {
			throw new Error('canvasId不存在, 请检查canvasId是否正确, 或者是否已经挂载到dom上');
		}
		this.canvas = new fabric.Canvas(canvasId, options);
	}

	/**
	 * 添加图片
	 * @param url 图片地址
	 * @param maxWidth 最大宽度
	 * @param maxHeight 最大高度
	 */
	addImage(url: string, maxWidth = 600, maxHeight = 400) {
		if (!url) {
			return console.error('请传入图片地址');
		}
		this.url = url;
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
		const img = new Image();
		img.src = url;
		img.onload = () => {
			const scaleX = maxWidth / img.width;
			const scaleY = maxHeight / img.height;
			fabric.Image.fromURL(url, img => {
				img.set({
					scaleX: scaleX,
					scaleY: scaleY,
					left: 0,
					top: 0,
				});
				this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
			});
		};
	}

	/**
	 * 撤销
	 */
	undo() {
		if (history.length > 0) {
			const last = this.history.pop();
			this.canvas.remove(last!);
		}
	}

	/**
	 * 清空画布
	 */
	clear() {
		this.canvas.clear(); // 清除画布上的所有对象
		this.history = []; // 清空历史记录
		this.addImage(this.url, this.maxWidth, this.maxHeight); // 重新添加图片
	}

	/**
	 * 设置颜色
	 * @param color 颜色
	 */
	setColor(color: string) {
		this.color = color;
	}

	/**
	 * 保存图片
	 */
	saveAsImage() {
		let src = this.canvas
			.toDataURL({
				format: 'png',
				quality: 1,
			})
			.replace('image/png', 'image/octet-stream');
		src = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
		return src;
	}

	/**
	 * 销毁
	 */
	destroy() {
		this.canvas.dispose();
	}

	/**
	 * 设置绘制类型
	 * @param drawType 绘制类型
	 */
	setDrawType(drawType: DrawType) {
		this.darwType = drawType === this.darwType ? '' : drawType;
		this.listenMouse();
	}

	/**
	 * 监听鼠标点击、移动、松开事件
	 */
	private listenMouse() {
		if (this.darwType !== 'path') {
			this.disableDraw();
		} else {
			this.closeEdit();
			this.enableDraw();
			return;
		}
		if (this.darwType !== 'text') {
			this.closeEdit();
		}
		this.canvas!.off('mouse:down', this.mouseDown);
		this.canvas!.off('mouse:move', this.mouseMove);
		this.canvas!.off('mouse:up', this.mouseUp);
		if (this.darwType) {
			this.canvas!.on('mouse:down', this.mouseDown);
			this.canvas!.on('mouse:move', this.mouseMove);
			this.canvas!.on('mouse:up', this.mouseUp);
		}
	}

	/**
	 * 启用画笔
	 */
	private enableDraw() {
		this.canvas.isDrawingMode = true;
		this.canvas.isDrawingMode = true;
		this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
		this.canvas.freeDrawingBrush.color = 'red';
		this.canvas.freeDrawingBrush.width = 2;

		this.canvas.on('path:created', (e: any) => {
			e.path.selectable = false;
			e.path.hoverCursor = 'default';
			this.history.push(e.path);
		});
	}

	/**
	 * 禁用画笔
	 */
	private disableDraw() {
		this.canvas.isDrawingMode = false;
		this.canvas.off('path:created');
	}

	/**
	 * 关闭编辑
	 */
	private closeEdit() {
		if (this.activeText) {
			this.activeText.exitEditing();
			if (!this.activeText.text) {
				this.canvas.remove(this.activeText);
			} else {
				this.history.push(this.activeText);
			}
			this.activeText = null;
		}
	}

	/**
	 * 鼠标按下事件
	 * @param e 事件
	 */
	private mouseDown = (e: IEvent) => {
		if (this.darwType === 'line') {
			this.drawLine().onMouseDown(e);
		} else if (this.darwType === 'arrow') {
			this.drawArrow().onMouseDown(e);
		} else if (this.darwType === 'rect') {
			this.drawRect().onMouseDown(e);
		} else if (this.darwType === 'circle') {
			this.drawEllipse().onMouseDown(e);
		} else if (this.darwType === 'text') {
			this.drawText().onMouseDown(e);
		}
	};

	/**
	 * 鼠标移动事件
	 * @param e 事件
	 */
	private mouseMove = (e: IEvent) => {
		if (this.darwType === 'line') {
			this.drawLine().onMouseMove(e);
		} else if (this.darwType === 'arrow') {
			this.drawArrow().onMouseMove(e);
		} else if (this.darwType === 'rect') {
			this.drawRect().onMouseMove(e);
		} else if (this.darwType === 'circle') {
			this.drawEllipse().onMouseMove(e);
		}
	};

	/**
	 * 鼠标松开事件
	 * @param e 事件
	 */

	private mouseUp = () => {
		if (this.darwType === 'line') {
			this.drawLine().onMouseUp();
		} else if (this.darwType === 'arrow') {
			this.drawArrow().onMouseUp();
		} else if (this.darwType === 'rect') {
			this.drawRect().onMouseUp();
		} else if (this.darwType === 'circle') {
			this.drawEllipse().onMouseUp();
		}
	};

	/**
	 * 画直线
	 */
	private drawLine() {
		return {
			onMouseDown: (e: IEvent) => {
				this.isDown = true;
				const pointer = this.canvas.getPointer(e.e);
				const points = [pointer.x, pointer.y, pointer.x, pointer.y];
				this.line = new fabric.Line(points, {
					stroke: this.color,
					strokeWidth: 2,
					selectable: false,
					hoverCursor: 'default',
				});
				this.canvas.add(this.line);
			},
			onMouseMove: (e: IEvent) => {
				if (!this.isDown || !this.line) return;
				const pointer = this.canvas.getPointer(e.e);
				this.line.set({ x2: pointer.x, y2: pointer.y });
				this.canvas.renderAll();
			},
			onMouseUp: () => {
				this.isDown = false;
				if (this.line && this.line.x1 !== this.line.x2 && this.line.y1 !== this.line.y2) {
					this.line.setCoords();
					this.history.push(this.line);
				}
				this.line = null;
			},
		};
	}

	/**
	 * 画箭头
	 */
	private drawArrow() {
		return {
			onMouseDown: (e: IEvent) => {
				this.isDown = true;
				const pointer = this.canvas.getPointer(e.e);
				const arrowLinePoints = [pointer.x, pointer.y, pointer.x, pointer.y];
				this.line = new fabric.Line(arrowLinePoints, {
					fill: 'transparent',
					stroke: this.color,
					strokeWidth: 2,
					selectable: false,
					hoverCursor: 'default',
				});
				const dx = this.line.x2! - this.line.x1!,
					dy = this.line.y2! - this.line.y1!;

				let angle = Math.atan2(dy, dx);
				angle *= 180 / Math.PI;
				angle += 90;
				this.arrow = new fabric.Triangle({
					angle: angle,
					fill: 'red',
					top: this.line.y2,
					left: this.line.x2,
					width: 15,
					height: 15,
					originX: 'center',
					originY: 'center',
					stroke: 'red',
					selectable: false,
					hoverCursor: 'default',
				});

				this.canvas!.add(this.line);
				this.canvas!.add(this.arrow);
				this.canvas!.renderAll();
			},
			onMouseMove: (e: IEvent) => {
				if (!this.isDown || !this.line || !this.arrow) return;
				const pointer = this.canvas.getPointer(e.e);
				this.line.set({
					x2: pointer.x,
					y2: pointer.y,
				});
				const dx = this.line.x2! - this.line.x1!,
					dy = this.line.y2! - this.line.y1!;

				let angle = Math.atan2(dy, dx);
				angle *= 180 / Math.PI;
				angle += 90;

				this.arrow.set({ top: this.line.y2, left: this.line.x2, angle: angle, width: 15, height: 15 });

				this.canvas.renderAll();
			},
			onMouseUp: () => {
				this.isDown = false;
				if (this.line && this.arrow) {
					const lineArrow = new fabric.Group([this.line, this.arrow], {
						selectable: false,
						hoverCursor: 'default',
					});
					this.history.push(lineArrow);
					this.canvas.remove(this.line);
					this.canvas.remove(this.arrow);
					this.canvas.add(lineArrow);
				}
				this.line = null;
				this.arrow = null;
			},
		};
	}

	/**
	 * 画矩形
	 */
	private drawRect() {
		return {
			onMouseDown: (e: IEvent) => {
				this.isDown = true;
				const pointer = this.canvas.getPointer(e.e);
				this.rectOrigin = { x: pointer.x, y: pointer.y };
				this.rect = new fabric.Rect({
					left: pointer.x,
					top: pointer.y,
					fill: 'transparent',
					stroke: 'red',
					strokeWidth: 2,
					selectable: false,
					hoverCursor: 'default',
				});
				this.canvas.add(this.rect);
			},
			onMouseMove: (e: IEvent) => {
				if (!this.isDown || !this.rect || !this.rectOrigin) return;
				const pointer = this.canvas.getPointer(e.e);
				if (this.rectOrigin.x > pointer.x) {
					this.rect.set({ left: Math.abs(pointer.x) });
				}
				if (this.rectOrigin.y > pointer.y) {
					this.rect.set({ top: Math.abs(pointer.y) });
				}
				this.rect.set({ width: Math.abs(this.rectOrigin.x - pointer.x), height: Math.abs(this.rectOrigin.y - pointer.y) });
				this.canvas.renderAll();
			},
			onMouseUp: () => {
				this.isDown = false;
				if (this.rect) {
					this.rect.setCoords();
					this.history.push(this.rect);
				}
				this.rect = null;
				this.rectOrigin = { x: 0, y: 0 };
			},
		};
	}

	/**
	 * 画圆
	 */
	private drawEllipse() {
		return {
			onMouseDown: (e: IEvent) => {
				this.isDown = true;
				const pointer = this.canvas.getPointer(e.e);
				this.ellipseOrigin = { x: pointer.x, y: pointer.y };
				this.ellipse = new fabric.Ellipse({
					left: pointer.x,
					top: pointer.y,
					rx: 1,
					ry: 1,
					fill: 'transparent',
					stroke: 'red',
					strokeWidth: 2,
					selectable: false,
					hoverCursor: 'default',
				});
				this.canvas.add(this.ellipse);
			},
			onMouseMove: (e: IEvent) => {
				if (!this.isDown || !this.ellipse || !this.ellipseOrigin) return;
				const pointer = this.canvas.getPointer(e.e);

				if (this.ellipseOrigin.x > pointer.x) {
					this.ellipse.set({ left: Math.abs(pointer.x) });
				}
				if (this.ellipseOrigin.y > pointer.y) {
					this.ellipse.set({ top: Math.abs(pointer.y) });
				}

				this.ellipse.set({ rx: Math.abs(this.ellipseOrigin.x - pointer.x) / 2, ry: Math.abs(this.ellipseOrigin.y - pointer.y) / 2 });
				this.canvas.renderAll();
			},
			onMouseUp: () => {
				this.isDown = false;
				if (this.ellipse) {
					this.ellipse.setCoords();
					this.history.push(this.ellipse);
				}
				this.ellipse = null;
				this.ellipseOrigin = { x: 0, y: 0 };
			},
		};
	}

	/**
	 * 添加文字
	 */
	private drawText() {
		return {
			onMouseDown: (e: IEvent) => {
				if (e.target && e.target.type === 'i-text') return;
				const pointer = this.canvas.getPointer(e.e);
				if (!this.activeText) {
					this.activeText = new fabric.IText('', {
						left: pointer.x,
						top: pointer.y,
						fill: 'red',
						editable: true,
						fontSize: 20,
						selectable: true,
						hoverCursor: 'default',
					});
					this.canvas.add(this.activeText);
					this.activeText.enterEditing();
					this.activeText.hiddenTextarea?.focus();
				} else {
					this.activeText.exitEditing();
					if (!this.activeText.text) {
						this.canvas.remove(this.activeText);
					} else {
						this.history.push(this.activeText);
					}
					this.activeText = null;
				}
			},
		};
	}
}

export default CanvasEdit;
