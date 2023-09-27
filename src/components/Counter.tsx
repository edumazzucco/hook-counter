import { useEffect, useState } from "react";
import Button from "./Button";

export default function Counter() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState<number>(0);

  // Using useEffect I can "mimic" the behavior of
  // componentDidMount(),
  // componentDidUpdate() and
  // componentWillUnmount() as requested:
  useEffect(() => {
    // "componentDidMount" is being simulated to set isLoading to false
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // The argument passed in [] works like "componentDidUpdate"
    if (count !== 0) {
      console.log("Value updated!");
    }

    // the return function, called "cleanup function" is like "componentWillUnmount"
    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  const handleCountDown = () => {
    if (count === 0) return;
    setCount(count - 1);
  };

  return (
    <div className="flex flex-col text-center text-neutral-100 select-none">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* I can manipulate the state directly through the click or in a separate function */}
        <Button onClick={() => setCount(count + 1)}>Count up</Button>
        {!isLoading ? (
          <h1 className="text-5xl font-bold">{count}</h1>
        ) : (
          <p className="font-semibold text-lg">Loading...</p>
        )}

        {/* I'm importing Button as a stateless
         reusable component to avoid rewriting a
         bunch of CSS, in this case, a bunch of tailwind classes */}
        <Button onClick={handleCountDown} disabled={count === 0 || isLoading}>
          Count down
        </Button>
        {/* Here I'm using ternary to avoid a common bug in react
        where a 0 might appear if the condition is not met while using `&&` */}
        {count > 0 ? (
          <Button
            onClick={() => setCount(0)}
            disabled={count === 0 || isLoading}
          >
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}
