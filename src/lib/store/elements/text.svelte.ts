import shortUUID from "short-uuid";
import { BaseObject } from "..";

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
  
  constructor(obj: Partial<TextBox>) {
    super(obj);
    Object.assign(this, obj);
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
    const newObj = Object.assign({}, this);
    return new TextBox(newObj);
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
  

  updateBounds33({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.x += x;
    this.y += y;
  
    let widthRatio = 1, heightRatio = 1;
  
    if (width !== 0) {
      widthRatio = (this.width + width) / this.width;
    }
  
    if (height !== 0) {
      heightRatio = (this.height + height) / this.height;
    }
  
    const dampingFactor = 0.8;
    let adjustedRatio = Math.min(widthRatio, heightRatio) - 1;
  
    // Apply a different method for decreasing width
    if (adjustedRatio < 0) {
      adjustedRatio *= dampingFactor;  // Lessen the decrease rate
    }
  
    if (height !== 0 && width !== 0) {
      this.fontSize += adjustedRatio * this.fontSize;
      this.width += adjustedRatio * this.width;
    } else if (width !== 0 && height === 0) {
      this.width += width * (adjustedRatio < 0 ? dampingFactor : 1);
    }
  }


}