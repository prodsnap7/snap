export const sidepanelStore = new class {
  private _prev = $state("");
  private _state = $state("elements");
  val = $state("");
  cb= $state<(x: any) => void>(() => {});

  get state() {
    return this._state;
  }

  set state(val) {
    if (this._state === val) {
      return;
    }
    this._prev = this._state;
    this._state = val;
  }

  prev() {
    this.state = this._prev;
  }
}