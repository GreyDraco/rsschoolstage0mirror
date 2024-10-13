export function createBtn(classes = []) {
  const btn = document.createElement("button");
  btn.classList.add("btn", ...classes);
  return btn;
}
