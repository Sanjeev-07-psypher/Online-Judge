import {
  LayoutDashboard,
  Code2,
  FileCode,
  Trophy,
  User,
  TerminalSquare,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const username = user?.username || "guest";
  const role = user?.role || "user";
  const initial = (username[0] || "?").toUpperCase();

  const navItems = [
    { label: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "problems", icon: Code2, path: "/problems" },
    { label: "submissions", icon: FileCode, path: "/submissions" },
    { label: "leaderboard", icon: Trophy, path: "/leaderboard" },
    { label: "profile", icon: User, path: "/profile" },
  ];

  return (
    <aside className="relative flex min-h-screen w-64 flex-col border-r border-line bg-panel">

      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-5">
        <span className="text-amber glow">
          <TerminalSquare size={22} />
        </span>

        <div>
          <h1 className="font-mono text-lg font-bold tracking-[0.15em] text-ink">
            JUDGE<span className="text-amber">X</span>
          </h1>

          <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            online&nbsp;judge
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <p className="px-3 pb-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          // navigation
        </p>

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" &&
                location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "group flex items-center gap-3 rounded border-l-2 px-3 py-2.5 text-sm transition-colors duration-150",
                  isActive
                    ? "border-amber bg-amber/10 text-amber"
                    : "border-transparent text-ink-dim hover:bg-raise hover:text-ink"
                )}
              >
                <span
                  className={clsx(
                    "w-2 text-xs",
                    isActive ? "text-amber" : "text-ink-faint"
                  )}
                >
                  {isActive ? "▸" : "·"}
                </span>

                <Icon
                  size={16}
                  className={clsx(
                    "transition-colors",
                    isActive
                      ? "text-amber"
                      : "text-ink-faint group-hover:text-ink"
                  )}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom User Card */}
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded border border-line bg-raise px-3 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-amber/40 bg-amber/10 font-bold text-amber">
            {initial}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-ink">
              {username}
            </p>

            <p className="text-[11px] uppercase tracking-wider text-ink-faint">
              {role}
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
