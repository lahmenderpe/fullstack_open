import { useState } from "react";
import Input from "./Input";
import Form from "./Form";

const BlogForm = ({ handleCreateBlog, setMessageContent, setShowMessage }) => {
  const [blog, setBlog] = useState({ title: "", author: "", url: "" });

  const handleAddBlogForm = (e) => {
    const { name, value } = e.target;
    const newBlog = { ...blog, [name]: value };
    setBlog(newBlog);
  };

  const createBlog = (e) => {
    e.preventDefault();
    const { title, author, url } = blog;

    if (title && author && url) {
      setBlog({ title: "", author: "", url: "" });
      setShowMessage(true);
      setMessageContent({
        content: `A new blog "${blog.title}" by ${blog.author} added`,
        success: true,
      });
      handleCreateBlog(blog);
    } else {
      setShowMessage(true);
      setMessageContent({
        content: "Please provide all necessarry information",
        success: false,
      });
    }
  };

  return (
    <section>
      <h2>add new</h2>
      <Form buttonText="create" onsubmit={createBlog}>
        <Input
          id="title"
          label="title"
          value={blog.title}
          onchange={handleAddBlogForm}
        />
        <Input
          id="author"
          label="author"
          value={blog.author}
          onchange={handleAddBlogForm}
        />
        <Input
          id="url"
          label="url"
          value={blog.url}
          onchange={handleAddBlogForm}
        />
      </Form>
    </section>
  );
};

export default BlogForm;
