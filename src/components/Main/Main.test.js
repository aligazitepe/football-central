import React from 'react';
import {
  render,
} from "@testing-library/react";

import NewsList from '../NewsList/NewsList';

const emptyArticlesArr = [];
describe("NewsList", () => {
  it("renders 'You're all caught up' when there's no news articles", async () => {
    const { getByText } = render(<NewsList news={emptyArticlesArr}/>);
    expect(getByText("You're all caught up")).toBeInTheDocument();
  });

});
