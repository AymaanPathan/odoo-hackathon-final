import { useEffect } from "react";
import toast from "react-hot-toast";
import MainContent from "./MainContent";

function AdminPanel() {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role && role === "User") {
      toast.error("You are not allowed to access the admin panel.");
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="flex h-full">
      <MainContent />
    </div>
  );
}

export default AdminPanel;
