import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { 
  Tooltip, 
  Divider, 
  Select, 
  MenuItem, 
  FormControl 
} from "@mui/material";

const ToolbarStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
  borderBottom: `solid 1px ${theme.palette.grey[300]}`,
  backgroundColor: "#f9fafb", // Light gray background
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(0.25),
  },
}));

const ToolbarGroup = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const ButtonStyle = styled("button")(({ theme, active }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  backgroundColor: active ? "rgba(217, 59, 177, 0.15)" : "transparent",
  border: "none",
  height: 36,
  width: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(217, 59, 177, 0.08)",
  },
  "&:disabled": {
    color: theme.palette.text.disabled,
    cursor: "default",
    backgroundColor: "transparent",
  }
}));

const StyledSelect = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  margin: theme.spacing(0, 1),
  [theme.breakpoints.down("sm")]: {
    minWidth: 90,
    margin: theme.spacing(0, 0.5),
  },
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
  height: 24,
  margin: theme.spacing(0, 0.5),
}));

export default function TiptapEditorToolbar({ editor }) {
  if (!editor) return null;

  const fontFamilies = [
    { label: "Sans Serif", value: "sans-serif" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "monospace" },
  ];

  const fontSizes = [
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
    { label: "Huge", value: "huge" },
  ];

  return (
    <ToolbarStyle>
      <ToolbarGroup>
        <StyledSelect variant="outlined" size="small">
          <Select
            defaultValue="sans-serif"
            sx={{ height: 36 }}
            onChange={(e) => {
              // Implement font family change
              console.log(e.target.value);
            }}
          >
            {fontFamilies.map((font) => (
              <MenuItem key={font.value} value={font.value}>
                {font.label}
              </MenuItem>
            ))}
          </Select>
        </StyledSelect>

        <StyledSelect variant="outlined" size="small">
          <Select
            defaultValue="normal"
            sx={{ height: 36 }}
            onChange={(e) => {
              // Implement font size change
              console.log(e.target.value);
            }}
          >
            {fontSizes.map((size) => (
              <MenuItem key={size.value} value={size.value}>
                {size.label}
              </MenuItem>
            ))}
          </Select>
        </StyledSelect>
      </ToolbarGroup>

      <VerticalDivider orientation="vertical" flexItem />

      <ToolbarGroup>
        <Tooltip title="Bold">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Icon icon="mdi:format-bold" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Italic">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Icon icon="mdi:format-italic" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Underline">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <Icon icon="mdi:format-underline" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Strike">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <Icon icon="mdi:format-strikethrough" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Quote">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Icon icon="mdi:format-quote-close" width={20} />
          </ButtonStyle>
        </Tooltip>
      </ToolbarGroup>

      <VerticalDivider orientation="vertical" flexItem />

      <ToolbarGroup>
        <Tooltip title="Bullet List">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <Icon icon="mdi:format-list-bulleted" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Numbered List">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <Icon icon="mdi:format-list-numbered" width={20} />
          </ButtonStyle>
        </Tooltip>
      </ToolbarGroup>

      <VerticalDivider orientation="vertical" flexItem />

      <ToolbarGroup>
        <Tooltip title="Insert Link">
          <ButtonStyle 
            onClick={() => {
              const url = window.prompt('URL')
              if (url) {
                editor.chain().focus().setLink({ href: url }).run()
              }
            }}
            active={editor.isActive("link")}
          >
            <Icon icon="mdi:link" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Insert Image">
          <ButtonStyle>
            <Icon icon="mdi:image" width={20} />
          </ButtonStyle>
        </Tooltip>
      </ToolbarGroup>

      <VerticalDivider orientation="vertical" flexItem />

      <ToolbarGroup>
        <Tooltip title="Code Block">
          <ButtonStyle 
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          >
            <Icon icon="mdi:code-tags" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Clear Format">
          <ButtonStyle 
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          >
            <Icon icon="mdi:format-clear" width={20} />
          </ButtonStyle>
        </Tooltip>
      </ToolbarGroup>

      <VerticalDivider orientation="vertical" flexItem />

      <ToolbarGroup>
        <Tooltip title="Undo">
          <ButtonStyle 
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Icon icon="mdi:undo" width={20} />
          </ButtonStyle>
        </Tooltip>

        <Tooltip title="Redo">
          <ButtonStyle 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Icon icon="mdi:redo" width={20} />
          </ButtonStyle>
        </Tooltip>
      </ToolbarGroup>
    </ToolbarStyle>
  );
}

TiptapEditorToolbar.propTypes = {
  editor: PropTypes.object,
};