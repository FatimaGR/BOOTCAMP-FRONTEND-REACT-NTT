// Loops through the parameters to infer the specific HTML element type.
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
  return stringToFormat.replace(/-/g, " ");
};

export const validateStrings = (valueToValidate: string) => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(valueToValidate)
}

export const validateNumber = (numberToValidate: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(numberToValidate);
}