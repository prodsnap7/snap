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
  scale = $state(1);
  state = $state<TCanvas["state"]>("normal");

  setFromObject(state: Partial<TCanvas>) {
    Object.entries(state).forEach(([key, value]) => {
      switch(key) {
        case 'width':
          this.width = value as number;
          break;
        case 'height':
          this.height = value as number;
          break;
        case 'background':
          this.background = value as string;
          break;
        case 'scale':
          this.scale = value as number;
          break;
        case 'state':
          this.state = value as "normal" | "selected" | "cropping";
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

}