import { createElement } from "../utils/utils.js";

export function categoryOption(value, text, selected = false, disabled = false){
  // element variable
  const optionCard = createElement("option");

  // element atributs
  optionCard.value = value;
  optionCard.text = text;

  if (selected) {
    optionCard.selected = selected;
  }

  if (disabled) {
    optionCard.disabled = disabled;
  }

  return optionCard
}