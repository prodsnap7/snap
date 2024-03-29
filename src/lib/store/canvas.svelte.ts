export type TCanvas = {
  width: number;
  height: number;
  background: string;
  scale: number;
  state: "normal" | "selected" | "cropping";
}
export const canvasStore = new class implements TCanvas {
  width = $state(700);
  height = $state(500);
  background = $state("#ffffff");
  fonts = $state<string[]>([]);
  scale = $state(1);
  state = $state<TCanvas["state"]>("normal");
  history = $state<string[]>([]);
  historyIndex = $state<number>(0);
  canUndo = $derived(this.historyIndex > 0);
  canRedo = $derived(this.historyIndex < this.history.length - 1);

  setFromObject(state: Partial<TCanvas>) {
    Object.entries(state).forEach(([key, value]) => {
      switch(key) {
        case 'width':
          this.width = +value;
          break;
        case 'height':
          this.height = +value
          break;
        case 'background':
          this.background = value as string;
          break;
        case 'scale':
          this.scale = +value;
          break;
        case 'state':
          this.state = value as "normal" | "selected" | "cropping";
          break;
        case 'fonts':
          this.fonts = JSON.parse(value as string);
          break;
        default:
          // Handle unknown keys, if necessary
          break;
      }
    });
  }

  setFromJSON(json: string) {
    const obj = JSON.parse(json);
    this.setFromObject(obj);
  }


  saveToLocalStorage(id: string) {
    const key = `canvas-${id}`;
    const canvas = {
      width: this.width,
      height: this.height,
      background: this.background,
      scale: this.scale,
      state: this.state
    };

    const json = JSON.stringify(canvas);
    const current = localStorage.getItem(key);

    if (current !== json) {
      localStorage.setItem(key, json);
      // add to history
      this.historyIndex++;
      this.history = this.history.slice(0, this.historyIndex);
      this.history.push(json);
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const json = this.history[this.historyIndex];
      this.setFromJSON(json);
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const json = this.history[this.historyIndex];
      this.setFromJSON(json);
    }
  }
}