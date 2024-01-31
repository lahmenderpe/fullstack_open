import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const mockObject = {
  id: 1,
  title: "Test article",
  author: "Test author",
  likes: 0,
  url: "Test url",
  user: { id: 1, username: "test" },
};

test("Blog initialy renders title and author", () => {
  const update = jest.fn();
  const deleteBlog = jest.fn();

  render(<Blog blog={mockObject} update={update} deleteBlog={deleteBlog} />);

  const title = screen.getByText(mockObject.title);
  const author = screen.getByText(mockObject.author);

  expect(title).toBeDefined();
  expect(author).toBeDefined();
});

test("Blog initialy does not renders likes and url", () => {
  const update = jest.fn();
  const deleteBlog = jest.fn();

  render(<Blog blog={mockObject} update={update} deleteBlog={deleteBlog} />);

  const url = screen.queryByText(mockObject.url);
  const likes = screen.queryByText("likes", { exact: false });

  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("url and likes are shown when the expand button is clicked", async () => {
  const update = jest.fn();
  const deleteBlog = jest.fn();
  const user = userEvent.setup();

  render(<Blog blog={mockObject} update={update} deleteBlog={deleteBlog} />);

  const button = screen.getByText("view");
  await user.click(button);

  const url = screen.getByText(mockObject.url);
  const likes = screen.getByText("likes", { exact: false });

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("Blog component calls the updateLike funtion when the like button is clicked", async () => {
  const update = jest.fn();
  const deleteBlog = jest.fn();
  const user = userEvent.setup();

  render(<Blog blog={mockObject} update={update} deleteBlog={deleteBlog} />);

  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("Like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(update.mock.calls).toHaveLength(2);
});

test("Blog component calls the updateLike funtion when the like button is clicked", async () => {
  const update = jest.fn();
  const deleteBlog = jest.fn();
  const user = userEvent.setup();

  render(<Blog blog={mockObject} update={update} deleteBlog={deleteBlog} />);

  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("Like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(update.mock.calls).toHaveLength(2);
});
