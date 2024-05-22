import { Button } from "@nextui-org/react";
import Navbar from "@repo/ui/customNavbar";

export default function Page(): JSX.Element {
  return (
    <main >
      <Navbar />
      <h1 className="text-3xl font-bold underline" >Hello world</h1>
      <Button color="primary">Test Button</Button>
    </main>
  );
}
