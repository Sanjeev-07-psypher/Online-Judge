import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TerminalSquare } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md overflow-hidden rounded-md border border-line bg-panel">

        {/* Terminal title bar */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs uppercase tracking-wider text-ink-dim">
          <span className="text-amber">▍</span>
          judgex — create account
          <span className="ml-auto flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
            <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
            <span className="h-2.5 w-2.5 rounded-full border border-line-hi" />
          </span>
        </div>

        <div className="p-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded border border-amber/40 bg-amber/10 text-amber glow">
              <TerminalSquare size={24} />
            </span>

            <div>
              <h1 className="font-mono text-2xl font-bold tracking-[0.12em]">
                JUDGE<span className="text-amber">X</span>
              </h1>

              <p className="text-xs text-ink-dim">$ auth register</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              name="username"
              placeholder="your_handle"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@domain.dev"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="min 6 characters"
              value={formData.password}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "creating…" : "▸ create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-dim">
            already have an account?{" "}
            <Link to="/login" className="text-amber hover:text-amber-hi">
              sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
