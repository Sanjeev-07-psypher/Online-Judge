const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="rounded border border-line bg-raise px-4 py-2 text-sm text-ink outline-none focus:border-amber"
    >
      <option value="cpp">C++</option>
      <option value="c">C</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
    </select>
  );
};

export default LanguageSelector;
