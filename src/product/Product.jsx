import { useState } from "react";
import Input from "components_ui/Input";
import List from "components_ui/List";

function Product() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Input value={count} onChange={setCount} onSubmit={() => setCount((count) => count + 1)} />
      <List items={["Product UI", "Learn Vite", "Make an awesome app"]} />
    </>
  )
}

export default Product;
