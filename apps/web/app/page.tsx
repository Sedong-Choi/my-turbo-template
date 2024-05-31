import { Button } from "@nextui-org/react";

export default function Page(): JSX.Element {
  return (
    <div>
      <main>
        <h1 className="hidden sm:flex text-3xl font-bold underline">Hello world</h1>
        <Button color="primary">Test Button</Button>
      </main>
    </div>
  );
}
