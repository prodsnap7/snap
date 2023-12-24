import shortUUID from "short-uuid";

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export class TextBox {
  type = 'text' as const;
  x = $state(0);
  y = $state(0);
  width = $state(100);
  height = $state(50);
  content = $state('');
  id = shortUUID.generate();
  state = $state<'normal' | 'editing'>('normal');
  fontSize = $state(16);
  fontFamily = $state('Lato');
  fontStyle = $state<'normal' | 'italic'>('normal');
  fontWeight = $state<FontWeight>('normal');
  align = $state<'left' | 'center' | 'right'>('left');
  color = $state('#000000');
  decoration = $state<'none' | 'underline' | 'line-through'>('none');
  uppercase = $state(false);
  letterSpacing = $state(0);
  lineHeight = $state(1.2);
  listType = $state<'none' | 'bullet' | 'number'>('none');
  rotation = $state(0);
  opacity = $state(1);
  
  constructor(obj: Partial<TextBox>) {
    Object.assign(this, obj);
  }

  get colors() {
    return [this.color]
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.fontSize * this.lineHeight
    }
  }

  clone(): TextBox {
    const newObj = Object.assign({}, this);
    return new TextBox(newObj);
  }

  updateBounds({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.x += x;
    this.y += y;
    const oldWidth = this.width;
    this.width += width;
    if (height !== 0) {
      this.fontSize = (this.width / oldWidth) * this.fontSize;
      this.height = (this.width / oldWidth) * this.height;
    }
  }
  
}