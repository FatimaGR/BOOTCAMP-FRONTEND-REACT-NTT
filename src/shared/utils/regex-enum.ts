export const enum RegexEnum{
  OnlyLetters = "^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$",
  OnlyNumbers = "^[0-9]+$",
  Hyphens = "-",
  Email = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
}