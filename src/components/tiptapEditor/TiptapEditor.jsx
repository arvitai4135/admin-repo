import PropTypes from "prop-types";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import visibilityIcon from "@iconify/icons-ic/baseline-visibility"; // ✅ Fixed import
import TiptapEditorToolbar from "./TiptapEditorToolbar.jsx";
import { createLowlight } from "lowlight";
import "highlight.js/styles/default.css";

const lowlight = createLowlight();

const RootStyle = styled("div")(({ theme }) => ({
  borderRadius: theme?.shape?.borderRadius || "8px",
  border: `solid 1px ${theme?.palette?.grey?.[500] || "#ccc"}`,
  "& .tiptap": {
    minHeight: 400,
    padding: theme?.spacing ? theme.spacing(2) : "16px", // ✅ Fix
    fontFamily: theme?.typography?.fontFamily || "Arial, sans-serif",
    border: "none",
    outline: "none",
    "& pre": {
      backgroundColor: theme?.palette?.grey?.[900] || "#333",
      padding: theme?.spacing ? theme.spacing(2) : "16px", // ✅ Fix
      borderRadius: theme?.shape?.borderRadius || "8px",
      color: "#fff",
    },
  },
}));

const PreviewStyle = styled("div")(({ theme }) => ({
  marginTop: theme?.spacing ? theme.spacing(2) : "16px",
  padding: theme?.spacing ? theme.spacing(2) : "16px",
  border: `solid 1px ${theme?.palette?.grey?.[500] || "#ccc"}`,
  borderRadius: theme?.shape?.borderRadius || "8px",
  backgroundColor: theme?.palette?.grey?.[50] || "#f9f9f9",
  maxHeight: "300px",
  overflowY: "auto",
}));

const PreviewButtonStyle = styled("button", {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  marginTop: theme?.spacing ? theme.spacing(1) : "8px",
  padding: theme?.spacing ? theme.spacing(1) : "8px",
  border: "none",
  borderRadius: theme?.shape?.borderRadius || "8px",
  backgroundColor: active ? theme?.palette?.primary?.light || "#e3f2fd" : "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function TiptapEditor({ value, onChange }) {
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }), // ✅ Fixed duplicate extension warning
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <RootStyle>
      <TiptapEditorToolbar editor={editor} />
      <EditorContent editor={editor} className="tiptap" />
      <PreviewButtonStyle
        active={showPreview}
        onClick={() => setShowPreview((prev) => !prev)}
        title="Toggle Preview"
      >
        <Icon
          icon={visibilityIcon}
          width={18}
          height={18}
          style={{ color: showPreview ? "#1976d2" : "inherit" }}
        />
      </PreviewButtonStyle>
      {showPreview && <PreviewStyle dangerouslySetInnerHTML={{ __html: value }} />}
    </RootStyle>
  );
}

TiptapEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
