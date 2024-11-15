import { createElement } from "../utils/utils.js";

export function categoryOption(value, text, selected = false){
  const optionCard = createElement("option");
  optionCard.value = value;
  optionCard.text = text;
  if (selected) {
    optionCard.selected = selected;
  }

  return optionCard
}