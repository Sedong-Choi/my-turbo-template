import CustomButton from "@repo/ui/CustomButton";

export default function Page(): JSX.Element {
  return (
    <>
      <h1 className="hidden sm:flex text-3xl font-bold underline">
        Hello world
      </h1>
      <CustomButton>Test CustomButton</CustomButton>
    </>
  );
}
