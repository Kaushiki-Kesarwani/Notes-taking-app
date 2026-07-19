import React from "react";
import { Link } from "react-router";
import { NotebookPen, PlusIcon } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-lg border-b border-base-300 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-primary text-primary-content shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <NotebookPen className="size-6" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-wide">
                ThinkBoard
              </h1>
              <p className="text-xs text-base-content/60">Capture your ideas</p>
            </div>
          </Link>

          {/* Create Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-sm text-base-content/70">Welcome,</p>
              <p className="font-semibold">{user?.name}</p>
            </div>

            <Link
              to="/create"
              className="btn btn-primary rounded-xl shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              <PlusIcon className="size-5" />
              <span>Create Note</span>
            </Link>

            <button onClick={handleLogout} className="btn btn-error rounded-xl">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
