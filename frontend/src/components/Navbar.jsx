import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  NotebookPen,
  PlusIcon,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-primary text-primary-content shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <NotebookPen className="size-6" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary tracking-wide">
                ThinkBoard
              </h1>
              <p className="text-xs text-base-content/60">
                Capture your ideas
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div>
              <p className="text-sm text-base-content/70">
                Welcome,
              </p>
              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

            <Link
              to="/create"
              className="btn btn-primary rounded-xl"
            >
              <PlusIcon className="size-5" />
              Create Note
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-error rounded-xl"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-base-300 pt-4 space-y-4">

            <div>
              <p className="text-sm text-base-content/70">
                Welcome,
              </p>
              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

            <Link
              to="/create"
              className="btn btn-primary w-full"
              onClick={() => setMenuOpen(false)}
            >
              <PlusIcon className="size-5" />
              Create Note
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-error w-full"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;