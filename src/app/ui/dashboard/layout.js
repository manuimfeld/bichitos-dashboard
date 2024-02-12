import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="p-4">
        <div className="bg-teal-200">Header</div>
        <div>Main</div>
      </div>
    </div>
  );
}
