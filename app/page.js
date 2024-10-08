import Form from "./components/form";

export default function Home() {

  return (
    <div className="flex flex-col gap-10 align-items justify-center">
      {/* className="bg-[#EEEDF8] px-5 py-[56px] text-coal transition-all duration-[200ms] tablet:py-[100px] null" */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl">Create Your Resume</h1>
        <h2 className="font-sans">Enter any LinkedIn to generate a customized resume.</h2>
      </div>
      <Form />
    </div>
  );
}
