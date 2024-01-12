import { getBounds } from "$lib/utils/bounds-utils";
import { parse, stringify, type INode } from 'svgson';

export class SvgElement {
	x = $state(10);
	y = $state(10);
  type = 'svg' as const;
	width = $state(200);
	height = $state(200);
	rotation = $state(0);
	obj = $state<INode>();

	constructor(data: string) {
    parse(data).then(json => {
      json.attributes.width = '100%';
      json.attributes.height = '100%';
      // fill
      // stroke
      json.attributes.fill = 'blue';
      json.attributes.stroke = 'red';
      this.obj = json
    })
	}

  get data() {
    if (!this.obj) return '';
    return stringify(this.obj);
  }

  get rect() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.x += x;
    this.y += y;
    this.width += width;
    this.height += height;
  }

  move({ x, y }: { x: number; y: number }) {
    this.x += x;
    this.y += y;
  }

  clone() {
    return new SvgElement(this.data);
  }

  toObject() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      type: this.type,
      rotation: this.rotation,
      data: this.data
    }
  }

  toJson() {
    return JSON.stringify(this.toObject());
  }

  get bounds(): { x: number; y: number; width: number; height: number } {
    return getBounds([this])
  }

  get colors() {
    if (!this.obj) return [];
    let colorList: string[] = [];
    extractColors(this.obj, colorList);

    return colorList;
  }
}

function extractColors(node: INode, colors: string[]) {
  if (node.attributes) {
      ['fill', 'stroke'].forEach(attr => {
          if (node.attributes[attr] && !colors.includes(node.attributes[attr])) {
              colors.push(node.attributes[attr]);
          }
      });
  }
  if (node.children) {
      node.children.forEach(child => extractColors(child, colors));
  }
}