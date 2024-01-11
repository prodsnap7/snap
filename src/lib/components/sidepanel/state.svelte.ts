export const sidepanelStore = new class {
  private _prev = $state("elements");
  private _state = $state("elements");
  private base_states = ["elements", "uploads"];
  val = $state("");
  cb = $state<(x: any) => void>(() => {});

  get state() {
    return this._state;
  }

  set state(val) {
    if (val.length && this._state === val) {
      return;
    }

    if (this.base_states.includes(this._state)) {
      this._prev = this._state;
    }
    
    this._state = val;
  }

  prev() {
    this.state = this._prev;
    this._prev = "";
  }
}