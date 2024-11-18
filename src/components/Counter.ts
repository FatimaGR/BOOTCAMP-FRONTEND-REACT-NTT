const counterElement: HTMLParagraphElement | null = document.querySelector(".counter");

function createCounter(): {increment: () => void; getCount: () => number}{
  let count: number = 0;
  return{
    increment: () => {
      ++count;
      if (counterElement != null){
        counterElement.textContent = `${count}`;
      }
    },
    getCount: () => count
  };
}

export const counter = createCounter();