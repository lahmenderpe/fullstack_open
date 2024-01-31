import { useState, useEffect, useRef } from "react";
import Input from "./components/Input";
import Blog from "./components/Blog";
import Form from "./components/Form";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Message from "./components/Message";
import blogService from "./services/blogs";
import userService from "./services/user";
import "./main.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState({
    content: "",
    success: true,
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const formRef = useRef(null);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    const newCredentials = { ...credentials, [name]: value };
    setCredentials(newCredentials);
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog, user.token);
      const newBlogs = blogs.concat({ ...newBlog, user });
      setBlogs(newBlogs);
      formRef.current?.toggleVisibility();
    } catch (error) {
      setShowMessage(true);
      setMessageContent({
        content: "Something went wrong",
        success: false,
      });
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (username && password) {
      try {
        const response = await userService.login(credentials);
        setUser(response);
        window.localStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        setShowMessage(true);
        setMessageContent({
          content: error.response.data.error,
          success: false,
        });
      }
    } else {
      setMessageContent({
        content: "Please provide all credentials",
        success: false,
      });
      setShowMessage(true);
    }
  };

  const fetchBlogs = async () => {
    const response = await blogService.getAll();
    setBlogs(response);
  };

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
    setCredentials({ username: "", password: "" });
  };

  const updateLike = async (updatedObject) => {
    try {
      await blogService.update(updatedObject, user.token);
      const temp = blogs.concat();
      const index = blogs.findIndex((blog) => blog.id === updatedObject.id);
      temp.splice(index, 1, { ...updatedObject, user: blogs[index].user });
      setBlogs(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const blogToDelete = blogs.find((blog) => blog.id === id);
      if (window.confirm(`Remove ${blogToDelete.title}`)) {
        await blogService.deleteBlog(id, user.token);
        const newBlogList = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes);

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {showMessage && (
          <Message
            messageContent={messageContent}
            setMessageContent={setMessageContent}
            setShowMessage={setShowMessage}
          />
        )}
        <Form onsubmit={login} buttonText="login">
          <Input
            label="Username"
            id="username"
            value={credentials.username}
            onchange={handleFormInput}
          />
          <Input
            label="Password"
            id="password"
            value={credentials.password}
            isPassword={true}
            onchange={handleFormInput}
          />
        </Form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
      {showMessage && (
        <Message
          messageContent={messageContent}
          setMessageContent={setMessageContent}
          setShowMessage={setShowMessage}
        />
      )}
      <Togglable buttonText="create new blog" ref={formRef}>
        <BlogForm
          handleCreateBlog={createBlog}
          setShowMessage={setShowMessage}
          setMessageContent={setMessageContent}
        />
      </Togglable>
      <div className="blogs">
        {blogsToShow.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            update={updateLike}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
