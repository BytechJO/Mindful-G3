import { Subtitles } from "lucide-react"; // أو أي Icon بدك إياها

export default function Caption({ showCaption, toggleCaption }) {
  return (
    <button
      onClick={toggleCaption}
      className="control-btn"
      title="Caption"
    >
      <Subtitles className="w-6 h-6" />
      <span className="control-label">
        {showCaption ? "Hide Caption" : "Caption"}
      </span>
    </button>
  );
}
