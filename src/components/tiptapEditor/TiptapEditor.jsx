import { useState, useEffect } from "react";
import { FileText, Edit, Plus, Bold, Italic, List, ListOrdered } from "lucide-react";

// Mock data for recent blogs (unchanged, 10 posts with images array)
const recentBlogs = [
  {
    id: 1,
    title: "10 Essential Nutrients for Optimal Health",
    slug: "essential-nutrients-optimal-health",
    description: "Discover the key nutrients your body needs for maintaining peak performance and wellbeing.",
    content: "<p>Nutrition is the foundation of good health. In this article, we explore the 10 most essential nutrients that your body needs to function optimally.</p><h2>1. Omega-3 Fatty Acids</h2><p>These essential fats are crucial for brain health and reducing inflammation.</p><h2>2. Vitamin D</h2><p>Known as the sunshine vitamin, Vitamin D plays a critical role in immune function and bone health.</p>",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    date: "April 12, 2025",
  },
  {
    id: 2,
    title: "Plant-Based Protein Sources You Should Try",
    slug: "plant-based-protein-sources",
    description: "Complete guide to getting enough protein on a plant-based diet.",
    content: "<p>Contrary to popular belief, getting adequate protein on a plant-based diet is easier than you might think. Here are some excellent sources of plant-based proteins that can help you meet your nutritional needs.</p><h2>Legumes</h2><p>Beans, lentils, and chickpeas are excellent sources of protein and fiber.</p><h2>Tofu and Tempeh</h2><p>These soy-based products are complete proteins containing all essential amino acids.</p>",
    images: ["/api/placeholder/800/500"],
    date: "April 10, 2025",
  },
  {
    id: 3,
    title: "Intermittent Fasting: Benefits and Risks",
    slug: "intermittent-fasting-benefits-risks",
    description: "An evidence-based look at the popular eating pattern and its effects on health.",
    content: "<p>Intermittent fasting has gained significant popularity in recent years. But what does the science say about this eating pattern?</p><h2>What is Intermittent Fasting?</h2><p>Intermittent fasting involves cycling between periods of eating and fasting, rather than focusing on which foods to eat.</p><h2>Potential Benefits</h2><p>Research suggests benefits may include weight loss, improved metabolic health, and potentially even longevity.</p>",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500", "/api/placeholder/800/500"],
    date: "April 8, 2025",
  },
  {
    id: 4,
    title: "The Gut-Brain Connection Explained",
    slug: "gut-brain-connection-explained",
    description: "How your digestive system affects your mental health and cognitive function.",
    content: "<p>The connection between our gut and brain is stronger than most people realize. This bidirectional communication system, often called the gut-brain axis, can influence our mood, cognitive function, and overall mental health.</p><h2>The Enteric Nervous System</h2><p>Often called our \"second brain,\" the enteric nervous system consists of millions of neurons lining our digestive tract.</p>",
    images: ["/api/placeholder/800/500"],
    date: "April 5, 2025",
  },
  {
    id: 5,
    title: "Nutrition Myths Debunked",
    slug: "nutrition-myths-debunked",
    description: "Separating fact from fiction in the world of nutrition advice.",
    content: "<p>In the age of information overload, nutrition myths spread quickly. Let's examine some common misconceptions and look at what the science actually says.</p><h2>Myth 1: Eating Fat Makes You Fat</h2><p>Dietary fat doesn't automatically translate to body fat. In fact, healthy fats are essential for proper body function.</p><h2>Myth 2: Carbs Are Bad For You</h2><p>Not all carbohydrates are created equal. Complex carbs from whole foods provide essential nutrients and energy.</p>",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    date: "April 3, 2025",
  },
  {
    id: 6,
    title: "How to Read Nutrition Labels Effectively",
    slug: "how-to-read-nutrition-labels",
    description: "A comprehensive guide to understanding food labels for healthier choices.",
    content: "<p>Nutrition labels contain valuable information, but they can be confusing. Here's how to decode them to make informed dietary choices.</p><h2>Serving Sizes</h2><p>Always check the serving size first, as all nutrition information is based on this amount.</p><h2>Calories</h2><p>This indicates the energy content per serving, which matters for weight management.</p>",
    images: ["/api/placeholder/800/500"],
    date: "March 30, 2025",
  },
  {
    id: 7,
    title: "Superfoods: Science or Marketing?",
    slug: "superfoods-science-or-marketing",
    description: "Examining the evidence behind popular superfoods and their claimed benefits.",
    content: "<p>The term \"superfood\" is everywhere in health media, but does science support these claims?</p><h2>What Makes a Food \"Super\"?</h2><p>While there's no official definition, superfoods are generally nutrient-dense foods with potential health benefits.</p><h2>Common Superfoods</h2><p>Foods like blueberries, kale, and salmon are often labeled as superfoods due to their high nutrient content.</p>",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    date: "March 28, 2025",
  },
  {
    id: 8,
    title: "Meal Prep 101: Save Time and Eat Healthier",
    slug: "meal-prep-101",
    description: "Beginner's guide to efficient meal preparation for busy lifestyles.",
    content: "<p>Meal prepping can transform your eating habits while saving time and money. Here's how to get started.</p><h2>Benefits of Meal Prepping</h2><p>Meal prepping helps control portions, reduces food waste, saves money, and makes healthy eating more convenient.</p><h2>Getting Started</h2><p>Start small with just 2-3 meals per week, and gradually build up as you get more comfortable with the process.</p>",
    images: ["/api/placeholder/800/500"],
    date: "March 25, 2025",
  },
  {
    id: 9,
    title: "Hydration: How Much Water Do You Really Need?",
    slug: "hydration-water-needs",
    description: "The science behind proper hydration and individual water requirements.",
    content: "<p>We've all heard we should drink eight glasses of water daily, but is this advice evidence-based?</p><h2>Individual Hydration Needs</h2><p>Water requirements vary based on factors like activity level, climate, age, and overall health.</p><h2>Signs of Dehydration</h2><p>Thirst, dark urine, fatigue, and headaches can all signal that you need more fluids.</p>",
    images: ["/api/placeholder/800/500", "/api/placeholder/800/500"],
    date: "March 22, 2025",
  },
  {
    id: 10,
    title: "Mindful Eating: Transform Your Relationship with Food",
    slug: "mindful-eating-guide",
    description: "Techniques for developing awareness around eating habits and food choices.",
    content: "<p>Mindful eating involves paying full attention to the experience of eating and drinking, both inside and outside the body.</p><h2>Benefits of Mindful Eating</h2><p>This practice can help improve digestion, regulate appetite, and develop a healthier relationship with food.</p><h2>Mindful Eating Techniques</h2><p>Try eating without distractions, eating slowly, and paying attention to hunger and fullness cues.</p>",
    images: ["/api/placeholder/800/500"],
    date: "March 20, 2025",
  },
];

// Simplified editor toolbar component that doesn't rely on TipTap
const SimpleEditorToolbar = ({ onAction }) => {
  return (
    <div className="border-b border-nutricare-green/30 pb-1 mb-2 flex flex-wrap gap-1">
      <button
        onClick={() => onAction("bold")}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => onAction("italic")}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => onAction("h2")}
        className="p-1 rounded hover:bg-gray-100 text-sm"
      >
        H2
      </button>
      <button
        onClick={() => onAction("h3")}
        className="p-1 rounded hover:bg-gray-100 text-sm"
      >
        H3
      </button>
      <button
        onClick={() => onAction("ul")}
        className="p-1 rounded hover:bg-gray-100"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => onAction("ol")}
        className="p-1 rounded hover:bg-gray-100"
      >
        <ListOrdered size={16} />
      </button>
    </div>
  );
};

export default function BlogDashboard() {
  const [activeView, setActiveView] = useState("editor");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isNewPost, setIsNewPost] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Editor state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  // Update editor with selected blog content
  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog.title);
      setSlug(selectedBlog.slug);
      setDescription(selectedBlog.description);
      setContent(selectedBlog.content);
      setImages(selectedBlog.images || []);
      setIsNewPost(false);
    }
  }, [selectedBlog]);

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }, [title]);

  const handleEditorAction = (action) => {
    console.log("Editor action:", action);
    const textArea = document.getElementById("content-editor");
    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const selectedText = content.substring(start, end);
      let replacement = selectedText;

      switch (action) {
        case "bold":
          replacement = `<strong>${selectedText}</strong>`;
          break;
        case "italic":
          replacement = `<em>${selectedText}</em>`;
          break;
        case "h2":
          replacement = `<h2>${selectedText}</h2>`;
          break;
        case "h3":
          replacement = `<h3>${selectedText}</h3>`;
          break;
        case "ul":
          replacement = `<ul><li>${selectedText}</li></ul>`;
          break;
        case "ol":
          replacement = `<ol><li>${selectedText}</li></ol>`;
          break;
        default:
          break;
      }

      const newContent = content.substring(0, start) + replacement + content.substring(end);
      setContent(newContent);

      setTimeout(() => {
        textArea.focus();
        textArea.setSelectionRange(start + replacement.length, start + replacement.length);
      }, 0);
    }
  };

  const createNewPost = () => {
    setSelectedBlog(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setContent("");
    setImages([]);
    setIsNewPost(true);
    setActiveView("editor");
    setIsMobileMenuOpen(false);
  };

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setActiveView("preview");
    setIsMobileMenuOpen(false);
  };

  const handleEditSelectedBlog = () => {
    setActiveView("editor");
  };

  const handleSave = () => {
    console.log("Saving blog post:", {
      title,
      slug,
      description,
      content,
      images,
    });
    alert("Blog post saved successfully!");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const BlogPreview = () => (
    <div className="bg-white rounded-xl p-3">
      {images.length > 0 && (
        <div className="mb-2 rounded-lg overflow-hidden">
          <img src={images[0]} alt="Featured" className="w-full h-36 object-cover" />
          {images.length > 1 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional ${index + 1}`}
                  className="w-full h-16 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>
      )}
      <h1 className="text-2xl font-bold text-nutricare-text-dark mb-2">
        {title || "Your Blog Title"}
      </h1>
      <p className="text-nutricare-text-gray mb-2 italic text-sm">
        {description || "Your blog description will appear here"}
      </p>
      <div
        className="prose max-w-none text-nutricare-text-dark text-sm"
        dangerouslySetInnerHTML={{ __html: content || "<p>Your content will appear here...</p>" }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-nutricare-bg-light font-sans">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-1.5 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-2 p-1 rounded-md hidden md:block hover:bg-gray-100"
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>
          <h1 className="text-lg font-bold text-nutricare-primary-dark md:text-xl">
            NutriCare Blog Dashboard
          </h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 rounded-md bg-nutricare-primary-light text-white text-sm"
          >
            {isMobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-48px)]">
        {/* Sidebar - Hidden on mobile unless menu is open */}
        <aside
          className={`
            ${isMobileMenuOpen ? "block" : "hidden"}
            md:block
            ${sidebarCollapsed ? "md:w-12" : "md:w-56 lg:w-64"}
            bg-white shadow-md sticky top-12
            transition-all duration-300
          `}
        >
          <div className="p-3">
            {!sidebarCollapsed && (
              <>
                <button
                  onClick={createNewPost}
                  className="w-full bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light text-white px-3 py-0 rounded-lg mb-2 flex items-center justify-center gap-1 text-sm"
                >
                  <Plus size={16} />
                  <span>New Blog Post</span>
                </button>
                <h2 className="text-[11px] font-semibold text-nutricare-text-dark mb-1.5">
                  Recent Posts
                </h2>
              </>
            )}
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={createNewPost}
                  className="w-6 h-6 bg-nutricare-primary-light text-white rounded-full mb-3 flex items-center justify-center"
                >
                  <Plus size={12} />
                </button>
                {recentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => handleSelectBlog(blog)}
                    className={`p-1 rounded-lg cursor-pointer mb-0.75 transition-colors ${
                      selectedBlog?.id === blog.id
                        ? "bg-nutricare-primary-light/10 border-l-2 border-nutricare-primary-light"
                        : "hover:bg-gray-50"
                    }`}
                    title={blog.title}
                  >
                    <div className="w-4 h-4 bg-nutricare-primary-light/20 rounded-full flex items-center justify-center text-nutricare-primary-dark text-[10px]">
                      {blog.title.charAt(0)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {recentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => handleSelectBlog(blog)}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedBlog?.id === blog.id
                        ? "bg-nutricare-primary-light/10 border-l-2 border-nutricare-primary-light"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="font-medium text-nutricare-text-dark line-clamp-1 text-sm leading-normal">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-nutricare-text-gray mt-1">{blog.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-2.5 transition-all duration-300 ${
            sidebarCollapsed ? "md:ml-12" : ""
          }`}
        >
          {/* Mobile View: Toggle between edit and preview */}
          {selectedBlog && !isNewPost && (
            <div className="flex mb-2 gap-1">
              <button
                onClick={() => setActiveView("preview")}
                className={`flex-1 py-1 px-3 rounded-lg flex items-center justify-center gap-1 text-sm ${
                  activeView === "preview"
                    ? "bg-nutricare-primary-light text-white"
                    : "bg-gray-200 text-nutricare-text-dark"
                }`}
              >
                <FileText size={14} />
                Preview
              </button>
              <button
                onClick={() => setActiveView("editor")}
                className={`flex-1 py-1 px-3 rounded-lg flex items-center justify-center gap-1 text-sm ${
                  activeView === "editor"
                    ? "bg-nutricare-primary-light text-white"
                    : "bg-gray-200 text-nutricare-text-dark"
                }`}
              >
                <Edit size={14} />
                Edit
              </button>
            </div>
          )}

          {/* Main container */}
          <div className="w-full flex flex-col">
            {/* Blog Preview */}
            {activeView === "preview" && selectedBlog && (
              <div className="flex flex-col mb-2">
                <div className="bg-white rounded-xl shadow p-3 transition-shadow duration-300 hover:shadow-lg border-l-4 border-nutricare-green flex flex-col max-w-6xl mx-auto w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-nutricare-text-dark">Blog Preview</h2>
                    <button
                      onClick={handleEditSelectedBlog}
                      className="bg-nutricare-green text-white px-3 py-1 rounded-lg hover:bg-nutricare-green-dark transition-colors flex items-center gap-1 text-sm"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                  </div>
                  <BlogPreview />
                </div>
              </div>
            )}

            {/* Blog Editor */}
            {activeView === "editor" && (
              <div className="w-full flex flex-col">
                {/* Mobile View: Toggle between edit and preview */}
                <div className="flex mb-2 md:hidden">
                  <button
                    onClick={() => setPreviewMode(false)}
                    className={`flex-1 py-1 px-3 rounded-l-lg text-sm ${
                      !previewMode
                        ? "bg-nutricare-primary-light text-white"
                        : "bg-gray-200 text-nutricare-text-gray"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className={`flex-1 py-1 px-3 rounded-r-lg text-sm ${
                      previewMode
                        ? "bg-nutricare-primary-light text-white"
                        : "bg-gray-200 text-nutricare-text-gray"
                    }`}
                  >
                    Preview
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-2xl mx-auto w-full gap-4">
                  {/* Left Side - Editor (Hidden on mobile when preview mode is active) */}
                  {(!previewMode || window.innerWidth >= 768) && (
                    <div className="flex flex-col">
                      <div className="bg-white rounded-xl shadow p-3 transition-shadow duration-300 hover:shadow-lg border-l-4 border-nutricare-primary-light flex flex-col">
                        <h2 className="text-lg font-bold text-nutricare-text-dark mb-2">
                          {isNewPost ? "Create New Blog Post" : "Edit Blog Post"}
                        </h2>
                        <div className="mb-1.5">
                          <label className="block text-xs font-medium text-nutricare-text-gray mb-0.5">
                            Blog Title
                          </label>
                          <input
                            type="text"
                            placeholder="Type the blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-nutricare-green/30 rounded-lg p-1.5 text-sm focus:ring-1 focus:ring-nutricare-primary-light focus:border-transparent shadow-sm"
                          />
                        </div>
                        <div className="mb-1.5">
                          <label className="block text-xs font-medium text-nutricare-text-gray mb-0.5">
                            Blog Slug
                          </label>
                          <input
                            type="text"
                            placeholder="Slug will be auto-generated"
                            value={slug}
                            disabled
                            className="w-full border border-nutricare-green/30 rounded-lg p-1.5 bg-gray-50 text-gray-500 text-sm"
                          />
                        </div>
                        <div className="mb-1.5">
                          <label className="block text-xs font-medium text-nutricare-text-gray mb-0.5">
                            Description
                          </label>
                          <textarea
                            placeholder="Enter a short description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-nutricare-green/30 rounded-lg p-1.5 text-sm focus:ring-1 focus:ring-nutricare-primary-light focus:border-transparent shadow-sm"
                            rows="1"
                          />
                        </div>
                        <div className="mb-1.5">
                          <label className="block text-xs font-medium text-nutricare-text-gray mb-0.5">
                            Images
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="w-full border border-nutricare-green/30 rounded-lg p-1.5 text-sm focus:ring-1 focus:ring-nutricare-primary-light focus:border-transparent shadow-sm"
                          />
                          {images.length > 0 && (
                            <div className="mt-1 grid grid-cols-2 gap-2">
                              {images.map((img, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={img}
                                    alt={`Preview ${index + 1}`}
                                    className="h-16 rounded-md object-cover w-full"
                                  />
                                  <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-xs font-medium text-nutricare-text-gray mb-0.5">
                            Content
                          </label>
                          <SimpleEditorToolbar onAction={handleEditorAction} />
                          <div className="flex-grow border border-nutricare-green/30 rounded-lg p-1.5 focus-within:ring-1 focus-within:ring-nutricare-primary-light focus-within:border-transparent mt-1">
                            <textarea
                              id="content-editor"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              className="w-full h-36 p-1.5 border-none focus:outline-none resize-none text-sm"
                              placeholder="Write your blog content here..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right Side - Preview (Hidden on mobile when edit mode is active) */}
                  {(previewMode || window.innerWidth >= 768) && (
                    <div className="flex flex-col">
                      <div className="bg-white rounded-xl shadow p-3 transition-shadow duration-300 hover:shadow-lg border-l-4 border-nutricare-green flex flex-col">
                        <h2 className="text-lg font-bold text-nutricare-text-dark mb-2">
                          Preview
                        </h2>
                        <BlogPreview />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-4 space-x-2 max-w-screen-2xl mx-auto w-full">
                  <button
                    onClick={() => (isNewPost ? createNewPost() : setActiveView("preview"))}
                    className="bg-gray-200 text-nutricare-text-dark px-4 py-1.5 rounded-lg shadow-md hover:bg-gray-300 transition-colors text-sm"
                  >
                    {isNewPost ? "Cancel" : "Back to Preview"}
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light text-white px-4 py-1.5 rounded-lg hover:opacity-90 shadow-md transition-opacity text-sm"
                  >
                    Save Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}