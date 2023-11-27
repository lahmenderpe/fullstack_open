const _ = require("lodash");
const User = require("../models/User");
const Blog = require("../models/Blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.likes;
  }, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
  const sortedList = blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const { title, author, likes } = sortedList[0];
  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, "author");
  const most = Object.keys(grouped).map((author) => {
    return {
      author: author,
      blogs: grouped[author].length,
    };
  });
  const sorted = _.orderBy(most, ["blogs"], ["desc"]);
  return sorted[0];
};

const mostLikes = (blogs) => {
  const result = blogs.reduce((previousValue, currentValue) => {
    const list = {
      ...previousValue,
    };
    if (!list[currentValue.author]) {
      list[currentValue.author] = {
        author: currentValue.author,
        likes: currentValue.likes,
      };
    } else {
      list[currentValue.author].likes += currentValue.likes;
    }

    return list;
  }, {});
  const list = Object.keys(result).map((author) => result[author]);
  const sorted = _.orderBy(list, ["likes"], ["desc"]);
  return sorted[0];
};

const getUsers = async () => {
  const response = await User.find({});
  const users = response.map((user) => user);
  return users;
};

const getBlogs = async () => {
  const response = await Blog.find({});
  const blogs = response.map((blog) => blog);
  return blogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  getUsers,
  getBlogs,
};
