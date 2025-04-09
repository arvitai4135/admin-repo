import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"; // ✅ Use @mui/material/styles
import { Icon } from "@iconify/react";
import roundUndo from "@iconify-icons/ic/round-undo";
import roundRedo from "@iconify-icons/ic/round-redo";

const ToolbarStyle = styled("div")(({ theme = {} }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing ? theme.spacing(1) : "8px", // ✅ Safe fallback
  padding: theme.spacing ? theme.spacing(1) : "8px",
  borderBottom: `solid 1px ${theme.palette?.grey?.[300] || "#ccc"}`, // ✅ Safe fallback
}));

const ButtonStyle = styled("button")(({ theme = {} }) => ({
  padding: theme.spacing ? theme.spacing(1) : "8px",
  borderRadius: theme.shape?.borderRadius || "4px",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  "&:hover": {
    backgroundColor: theme.palette?.grey?.[200] || "#eee",
  },
}));

export default function TiptapEditorToolbar({ editor }) {
  if (!editor) return null;

  return (
    <ToolbarStyle>
      <ButtonStyle onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </ButtonStyle>
      <ButtonStyle onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </ButtonStyle>
      <ButtonStyle onClick={() => editor.chain().focus().toggleStrike().run()}>
        <s>S</s>
      </ButtonStyle>
      <ButtonStyle onClick={() => editor.chain().focus().setParagraph().run()}>
        P
      </ButtonStyle>
      <ButtonStyle onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        {"</>"}
      </ButtonStyle>
      <ButtonStyle onClick={() => editor.chain().focus().undo().run()}>
        <Icon icon={roundUndo} width={18} height={18} />
      </ButtonStyle>
      <ButtonStyle onClick={() => editor.chain().focus().redo().run()}>
        <Icon icon={roundRedo} width={18} height={18} />
      </ButtonStyle>
    </ToolbarStyle>
  );
}

TiptapEditorToolbar.propTypes = {
  editor: PropTypes.object,
};
