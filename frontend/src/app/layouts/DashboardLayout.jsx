import Sidebar from "../../components/navigation/Sidebar";
import Navbar from "../../components/navigation/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-7xl flex-1 px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;