import Form from "./components/form";

export default function Home() {

  return (
    <div className="flex flex-col gap-16 items-center justify-center">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-4xl">Create A Resume</h1>
        <h2 className="font-sans text-xl">Enter any LinkedIn URL to generate a customized resume PDF.</h2>
      </div>
      <Form />
    </div>
  );
}
