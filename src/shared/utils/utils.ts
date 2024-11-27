import { RegexEnum } from "./regex-enum";

export const replaceHyphensWithSpaces = (stringToFormat: string): string => {
  const hyphens = new RegExp(RegexEnum.Hyphens);
  return stringToFormat.replace(hyphens, " ");
};

export const validateStrings = (valueToValidate: string) => {
  const regex = new RegExp(RegexEnum.OnlyLetters);
  return regex.test(valueToValidate)
}

export const validateNumber = (numberToValidate: string) => {
  const regex = new RegExp(RegexEnum.OnlyNumbers);
  return regex.test(numberToValidate);
}