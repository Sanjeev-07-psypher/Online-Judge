import { useState } from "react";
import { Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const segment =
    location.pathname.split("/").filter(Boolean)[0] || "dashboard";

  const initial = (user?.username?.[0] || "?").toUpperCase();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/problems?q=${encodeURIComponent(q)}` : "/problems");
  };

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center justify-between
        border-b border-line
        bg-bg/90 px-6
      "
    >
      {/* Terminal prompt / breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-amber">$</span>
        <span className="text-ink-faint">judgex@web</span>
        <span className="text-ink-faint">:</span>
        <span className="text-ink">~/{segment}</span>
        <span className="term-cursor" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-3">
        <form
          onSubmit={handleSearch}
          className="hidden items-center gap-2 rounded border border-line bg-raise px-3 py-2 focus-within:border-amber-dim md:flex"
        >
          <Search size={15} className="text-ink-faint" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search problems…"
            className="w-44 bg-transparent text-sm outline-none placeholder:text-ink-faint"
          />
        </form>

        <div className="flex h-9 w-9 items-center justify-center rounded border border-amber/40 bg-amber/10 font-bold text-amber">
          {initial}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
