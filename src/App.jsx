import { AppForm } from "./components/AppForm";

function App() {
  return (
    <div className="md:px-10 px-4 pt-8 w-full">
      <h1 className="text-2xl font-semibold tracking-widest text-center pb-4">
        Contract Downloader
      </h1>
      <div className="flex justify-center w-full">
        <div className="border-2 md:px-8 px-2 py-4 rounded-sm lg:w-1/3 md:w-2/3 w-full">
          <AppForm />
        </div>
      </div>
      <hr className="my-6" />
    </div>
  );
}

export default App;
