import AddWerdForm from "../components/forms/AddWerdForm";
import WerdList from "./components/WerdList";

export default async function Home() {
  return (
    <ul className="h-full space-y-3">
      {/*@ts-ignore*/}
      <WerdList />
      <AddWerdForm />
    </ul>
  );
}
