import AppForm from "../components/AppForm";
import AppPreviewContract from "../components/AppPreviewContract";

export default function Home() {
  return (
    <div>
      <div className="w-full pb-10">
        <AppForm />
      </div>
      <AppPreviewContract />
    </div>
  );
}
