const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-amber">▍</span>
          <h3 className="font-mono text-lg font-bold tracking-[0.15em]">
            JUDGE<span className="text-amber">X</span>
          </h3>
        </div>

        <p className="text-sm text-ink-faint">
          © 2026 JudgeX · built for people who live in the terminal
        </p>
      </div>
    </footer>
  );
};

export default Footer;
