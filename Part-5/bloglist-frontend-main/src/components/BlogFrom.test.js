import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

const setMessageContent = jest.fn();
const setShowMessage = jest.fn();

test("BlogForm component calls create funtion with the correct details when it submited", async () => {
  const handleCreateBlog = jest.fn();
  const user = userEvent.setup();
  const expected = {
    title: "test title",
    url: "test url",
    author: "test author",
  };

  const container = render(
    <BlogForm
      handleCreateBlog={handleCreateBlog}
      setMessageContent={setMessageContent}
      setShowMessage={setShowMessage}
    />
  ).container;

  const title = container.querySelector("#title");
  const url = container.querySelector("#url");
  const author = container.querySelector("#author");
  const createButton = screen.getByText("create");

  await user.type(title, expected.title);
  await user.type(url, expected.url);
  await user.type(author, expected.author);
  await user.click(createButton);

  expect(handleCreateBlog.mock.calls).toHaveLength(1);
  expect(handleCreateBlog.mock.calls[0][0]).toEqual(expected);
});
