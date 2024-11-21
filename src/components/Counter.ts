type CreateCounterResult = { increment: () => void; getCount: () => number };

const counterElement: HTMLParagraphElement | null =
  document.querySelector(".counter");

function createCounter(): CreateCounterResult {
  let count: number = 0;
  return {
    increment: () => {
      count += 1;

      if (counterElement) {
        counterElement.textContent = `${count}`;
      }
    },
    getCount: () => count,
  };
}

export const counter = createCounter();
