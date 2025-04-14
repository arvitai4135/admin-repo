// // BlogEditor.jsx (To be used in your routes)
// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { 
//   Box, 
//   TextField, 
//   Button, 
//   Typography, 
//   Container, 
//   Grid, 
//   Paper,
//   Snackbar,
//   Alert
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import TiptapEditor from "./TiptapEditor";

// const EditorPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(3),
//   borderRadius: theme.spacing(1),
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
// }));

// const ViewPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: theme.spacing(1),
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
//   height: "100%",
// }));

// const SectionTitle = styled(Typography)(({ theme }) => ({
//   fontSize: "24px",
//   fontWeight: 600,
//   marginBottom: theme.spacing(3),
//   paddingBottom: theme.spacing(1),
//   borderBottom: "1px solid #E2E8F0",
//   color: "#333333", // nutricare-text-dark
// }));

// const StyledFormLabel = styled(Typography)(({ theme }) => ({
//   fontSize: "16px",
//   fontWeight: 500,
//   marginBottom: theme.spacing(1),
//   color: "#333333", // nutricare-text-dark
// }));

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#E2E8F0",
//     },
//     "&:hover fieldset": {
//       borderColor: "#D93BB1", // nutricare-primary-light
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#9E0B7F", // nutricare-primary-dark
//     },
//   },
// }));

// const SubmitButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#9E0B7F", // nutricare-primary-dark
//   color: "white",
//   padding: "10px 24px",
//   "&:hover": {
//     backgroundColor: "#D93BB1", // nutricare-primary-light
//   },
// }));

// const ViewLabel = styled(Typography)(({ theme }) => ({
//   fontSize: "16px",
//   fontWeight: 500,
//   marginBottom: theme.spacing(1),
//   color: "#718096", // nutricare-text-gray
// }));

// const ViewContent = styled(Typography)(({ theme }) => ({
//   fontSize: "16px",
//   marginBottom: theme.spacing(2),
//   color: "#333333", // nutricare-text-dark
// }));

// const BlogEditorPage = () => {
//   const [blogData, setBlogData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     content: "",
//   });

//   const [generatedSlug, setGeneratedSlug] = useState("");
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     // Auto-generate slug from title
//     if (blogData.title) {
//       const slug = blogData.title
//         .toLowerCase()
//         .replace(/[^\w\s]/gi, '')
//         .replace(/\s+/g, '-');
//       setGeneratedSlug(slug);
//     }
//   }, [blogData.title]);

//   const handleChange = (field, value) => {
//     setBlogData({
//       ...blogData,
//       [field]: value,
//     });
//   };

//   const handleSubmit = () => {
//     const finalData = {
//       ...blogData,
//       slug: blogData.slug || generatedSlug,
//     };
    
//     console.log("Blog post submitted:", finalData);
    
//     // Here you would send the data to your backend API
    
//     setNotification({
//       open: true,
//       message: "Blog post created successfully!",
//       severity: "success",
//     });
//   };

//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false,
//     });
//   };

//   return (
//     <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
//       <Grid container spacing={3}>
//         {/* Editor Column */}
//         <Grid item xs={12} md={6}>
//           <EditorPaper>
//             <SectionTitle>Blog Editor</SectionTitle>
            
//             <StyledFormLabel>Blog Title</StyledFormLabel>
//             <StyledTextField
//               fullWidth
//               placeholder="Type the blog title"
//               value={blogData.title}
//               onChange={(e) => handleChange("title", e.target.value)}
//               variant="outlined"
//             />
            
//             <StyledFormLabel>Blog Slug</StyledFormLabel>
//             <StyledTextField
//               fullWidth
//               placeholder="Slug will be auto-generated"
//               value={blogData.slug || generatedSlug}
//               onChange={(e) => handleChange("slug", e.target.value)}
//               variant="outlined"
//               helperText="Leave empty to auto-generate from title"
//             />
            
//             <StyledFormLabel>Blog Description</StyledFormLabel>
//             <StyledTextField
//               fullWidth
//               multiline
//               rows={4}
//               placeholder="Write your blog summary..."
//               value={blogData.description}
//               onChange={(e) => handleChange("description", e.target.value)}
//               variant="outlined"
//             />
            
//             <StyledFormLabel>Blog Content</StyledFormLabel>
//             <TiptapEditor
//               value={blogData.content}
//               onChange={(value) => handleChange("content", value)}
//             />
            
//             <Box mt={3}>
//               <SubmitButton 
//                 variant="contained" 
//                 onClick={handleSubmit}
//                 startIcon={<span>+</span>}
//               >
//                 Create Blog Post
//               </SubmitButton>
//             </Box>
//           </EditorPaper>
//         </Grid>
        
//         {/* Preview Column */}
//         <Grid item xs={12} md={6}>
//           <ViewPaper>
//             <SectionTitle>Blog View</SectionTitle>
            
//             <ViewLabel>Blog Title</ViewLabel>
//             <ViewContent>{blogData.title || ""}</ViewContent>
            
//             <ViewLabel>Blog Slug</ViewLabel>
//             <ViewContent>{blogData.slug || generatedSlug || ""}</ViewContent>
            
//             <ViewLabel>Blog Description</ViewLabel>
//             <ViewContent>{blogData.description || ""}</ViewContent>
            
//             <ViewLabel>Blog Content</ViewLabel>
//             <Box 
//               sx={{ 
//                 padding: 2,
//                 backgroundColor: "#FCF0F8", // nutricare-bg-light
//                 borderRadius: 1,
//                 marginTop: 1
//               }}
//               dangerouslySetInnerHTML={{ __html: blogData.content }}
//             />
//           </ViewPaper>
//         </Grid>
//       </Grid>
      
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert 
//           onClose={handleCloseNotification} 
//           severity={notification.severity}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default BlogEditorPage;