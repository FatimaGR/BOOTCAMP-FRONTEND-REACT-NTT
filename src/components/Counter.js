const counterElement = document.getElementById("counter");

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