import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, update, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { id, title, author, url, likes } = blog;

  console.log(user);
  console.log(blog);

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  const updateLike = () => {
    const newForm = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    update(newForm);
  };

  return (
    <div className="blog">
      <div>
        <span>{title} </span>
        <span>
          <button onClick={handleToggle}>
            {showDetails ? "hide" : "view"}
          </button>
        </span>
        <p>{author}</p>
      </div>
      {showDetails && (
        <div>
          <p>{url}</p>
          <div>
            <span>Likes: {likes} </span>
            <span>
              <button onClick={updateLike}>Like</button>
            </span>
          </div>
          {user.name === blog.user.name && (
            <button onClick={() => deleteBlog(id)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
