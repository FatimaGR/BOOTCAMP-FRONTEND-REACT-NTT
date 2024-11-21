// deber'ia estar en otra carpeta ya que no es un componente
const counterElement = document.querySelector(".counter");

function createCounter(){
  let count = 0;
  return{
    increment: () => {
      ++count;
      counterElement.textContent = count;
    },
    getCount: () => count
  };
}

export const counter = createCounter();