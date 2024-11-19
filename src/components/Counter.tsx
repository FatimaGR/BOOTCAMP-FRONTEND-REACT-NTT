import { FC, useEffect, useState } from "react";
import { Product } from "../types/interfaces";

interface CounterProps {
  cart: Product[],
}

const Counter: FC<CounterProps> = ({cart}) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    setCounter(cart.length);
  }, [cart])
  
  return(
    <span className="counter">
      {counter}
    </span>
  )
}

export default Counter;