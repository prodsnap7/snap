import shortUUID from "short-uuid";
import { BaseObject } from "..";
import { getBounds } from "$lib/utils/bounds-utils";

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export class TextBox extends BaseObject {
  type = 'text' as const;
  x = $state(0);
  y = $state(0);
  width = $state(240);
  content = $state('');
  id = shortUUID.generate();
  state = $state<'normal' | 'editing'>('normal');
  fontSize = $state(32);
  fontFamily = $state('Lato');
  fontStyle = $state<'normal' | 'italic'>('normal');
  fontWeight = $state<FontWeight>('normal');
  align = $state<'left' | 'center' | 'right' | 'justify'>('left');
  color = $state('#000000');
  decoration = $state<'none' | 'underline' | 'line-through'>('none');
  uppercase = $state(false);
  letterSpacing = $state(1.5);
  lineHeight = $state(1.2);
  listType = $state<'none' | 'ordered' | 'unordered'>('none');
  rotation = $state(0);
  opacity = $state(1);
  height = $derived(this.lineHeight * this.fontSize);
  scale = $state(1);
  _bounds = $derived(getBounds([this]));
  
  constructor(obj: Partial<TextBox>) {
    super(obj);
    Object.assign(this, obj);
  }

  get bounds(): { x: number; y: number; width: number; height: number } {
    return this._bounds;
  }

  get colors() {
    return [this.color]
  }

  get rect() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }

  clone(): TextBox {
    return new TextBox({
      x: this.x,
      y: this.y,
      width: this.width,
      content: this.content,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      fontStyle: this.fontStyle,
      fontWeight: this.fontWeight,
      align: this.align,
      color: this.color,
      decoration: this.decoration,
      uppercase: this.uppercase,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      listType: this.listType,
      rotation: this.rotation,
      opacity: this.opacity,
    });
  }


  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.x += x;
    this.y += y;
    
    const dampingFactor = 0.8; // Adjust this value to control sensitivity
    const adjustedRatio = (this.height + height) / this.height - 1;
  
    if (height !== 0 && width !== 0) {
      // this.fontSize += dampingFactor * adjustedRatio * this.fontSize;
      // this.width += adjustedRatio * this.width * dampingFactor;
      this.fontSize += adjustedRatio * this.fontSize * dampingFactor;
      this.width += adjustedRatio * this.width;
    } else if (width !== 0 && height === 0) {
      // this.width += width * dampingFactor;
      this.width += width;
    }
  }
}