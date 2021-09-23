import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const renderWithRouter = (ui: ReactElement, { route = "/summary" } = {}) => {
  window.history.pushState({}, "summary", route);

  return render(ui, { wrapper: MemoryRouter });
};

test("Render Summary page", async () => {
  renderWithRouter(<App />);
  const termsAndCOnditions = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(termsAndCOnditions).toBeInTheDocument();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // expect(linkElement).toHaveTextContent(`Learn React`);
});
