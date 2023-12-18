export const sidepanelStore = new class {
  state = $state("elements");
  val = $state("");
  cb= $state<(x: any) => void>(() => {});
}