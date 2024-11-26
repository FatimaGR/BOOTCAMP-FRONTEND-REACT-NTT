// Loops through the parameters to infer the specific HTML element type.
// por qu'e es necesario esto?
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K, className?:string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (className){
    element.classList.add(className);
  };
  return element
}

export const replaceHyphensWithSpaces = (stringToFormat: string): string => {
  // que hace el regex? hay que ponerlo en enum con un nombre para facilidad
  return stringToFormat.replace(/-/g, " ");
};

export const validateStrings = (valueToValidate: string) => {
  // que hace el regex? hay que ponerlo en enum con un nombre para facilidad
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(valueToValidate)
}

export const validateNumber = (numberToValidate: string) => {
  // que hace el regex? hay que ponerlo en enum con un nombre para facilidad
  const regex = /^[0-9]+$/;
  return regex.test(numberToValidate);
}