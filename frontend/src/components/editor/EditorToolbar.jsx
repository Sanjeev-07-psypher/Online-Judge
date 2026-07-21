import Button from "../ui/Button";
import LanguageSelector from "./LanguageSelector";

const EditorToolbar = ({
  language,
  setLanguage,
  onSubmit,
  submitting,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line bg-panel p-4">
      <LanguageSelector language={language} setLanguage={setLanguage} />

      <div className="flex items-center gap-3">
        <span className="hidden text-[11px] uppercase tracking-[0.12em] text-ink-faint sm:inline">
          time 2s · mem 256mb · net off
        </span>

        <Button onClick={onSubmit} disabled={submitting}>
          {submitting ? "submitting…" : "▸ submit"}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
