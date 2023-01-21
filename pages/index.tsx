import AppForm from "../components/AppForm";
import AppPreviewContract from "../components/AppPreviewContract";

export default function Home() {
  return (
    <div>
      <div className="mx-auto w-full max-w-md py-10">
        <AppForm />
      </div>
      <AppPreviewContract />
    </div>
  );
}
