// Loops through the parameters to infer the specific HTML element type.
// interesante 
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K, className?:string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (className){
    element.classList.add(className);
  };
  return element
}