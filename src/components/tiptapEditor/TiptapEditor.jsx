import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import { Icon } from "@iconify/react";
import "highlight.js/styles/default.css";
import TiptapEditorToolbar from "./TiptapEditorToolbar";

const lowlight = createLowlight();

// BlogEditor component modified to fit with the Dashboard layout
export default function BlogEditor({ initialContent = "", onSave }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(initialContent);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // Mobile only: toggle between edit and preview

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    // Auto-generate slug from title
    if (title) {
      setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }, [title]);

  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        slug,
        description,
        content,
        featuredImage
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preview component for the blog post
  const BlogPreview = () => (
    <div className="bg-white rounded-xl p-5 h-full overflow-y-auto">
      {featuredImage && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={featuredImage} alt="Featured" className="w-full h-48 object-cover" />
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#333333] mb-2">{title || "Your Blog Title"}</h1>
      <p className="text-[#718096] mb-4 italic">{description || "Your blog description will appear here"}</p>
      <div className="prose prose-pink max-w-none" dangerouslySetInnerHTML={{ __html: content || "<p>Your content will appear here...</p>" }} />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile View: Toggle between edit and preview */}
      <div className="flex mb-4 md:hidden">
        <button
          onClick={() => setPreviewMode(false)}
          className={`flex-1 py-2 px-4 rounded-l-lg ${!previewMode ? 'bg-[#D93BB1] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Edit
        </button>
        <button
          onClick={() => setPreviewMode(true)}
          className={`flex-1 py-2 px-4 rounded-r-lg ${previewMode ? 'bg-[#D93BB1] text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Preview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Left Side - Editor (Hidden on mobile when preview mode is active) */}
        {(!previewMode || window.innerWidth >= 768) && (
          <div className="h-full flex flex-col">
            <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#D93BB1] flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-[#333333] mb-4">Create New Blog Post</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#718096] mb-1">Blog Title</label>
                <input
                  type="text"
                  placeholder="Type the blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#718096] mb-1">Blog Slug</label>
                <input
                  type="text"
                  placeholder="Slug will be auto-generated"
                  value={slug}
                  disabled
                  className="w-full border border-[#ADD01C]/30 rounded-lg p-2 bg-gray-50 text-gray-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#718096] mb-1">Description</label>
                <textarea
                  placeholder="Enter a short description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                  rows="2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#718096] mb-1">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                />
              </div>
              
              <div className="flex-grow flex flex-col">
                <label className="block text-sm font-medium text-[#718096] mb-1">Content</label>
                {editor && <TiptapEditorToolbar editor={editor} />}
                <div className="flex-grow border border-[#ADD01C]/30 rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#D93BB1] focus-within:border-transparent overflow-auto mt-1">
                  <EditorContent editor={editor} className="h-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Side - Preview (Hidden on mobile when edit mode is active) */}
        {(previewMode || window.innerWidth >= 768) && (
          <div className="h-full flex flex-col">
            <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#ADD01C] flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-[#333333] mb-4">Preview</h2>
              <div className="flex-grow overflow-hidden">
                <BlogPreview />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-3">
        <button
          className="bg-gray-200 text-[#333333] px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] text-white px-4 py-2 rounded-lg hover:opacity-90 shadow-md transition-opacity"
        >
          Save Post
        </button>
      </div>
    </div>
  );
}

BlogEditor.propTypes = {
  initialContent: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};