// "use client";

import { useState } from "react";
import { useThemeContext } from "../../providers/theme";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// dynamic metadata
export async function generateMetadata() {
  return {
    title: "Hey you",
  };
}

export default function Home() {
  //   const [score, setScore] = useState(0);
  //   const { value } = useThemeContext();
  //   const increaseScore = () => setScore(score + 1);

  return (
    <div>
      {/* {value} */}
      Hello
      {/* <p>Your score is {score}</p> */}
      {/* <button onClick={increaseScore}>+</button> */}
    </div>
  );
}
