import { waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentType, ReactElement } from "react";
import { OrderDetailsProvider } from "../../../Providers/OrderDetails.provider";
import { ScoopsAndToppingsProvider } from "../../../Providers/scoopsAndToppings.provider";
import { Options } from "../Options";
import { OrderEntry } from "../OrderEntry";

const WhithAllProviders = ({ children }: { children: ReactElement }) => {
  return (
    <OrderDetailsProvider>
      <ScoopsAndToppingsProvider>{children}</ScoopsAndToppingsProvider>
    </OrderDetailsProvider>
  );
};

describe("subtotals", () => {
  describe("scoops Subtotals", () => {
    test("update scoops subtotal when scoops change", async () => {
      render(<Options optionsType="scoops" />, {
        wrapper: WhithAllProviders as ComponentType<{}>,
      });
      //  initial subtotal
      const scoopsSubtotal = screen.getByText("Scoops total: $", {
        exact: false,
      }); //partial match
      expect(scoopsSubtotal).toHaveTextContent("0.00");

      //  update subtotal with 1 vanilla
      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, "1");
      expect(scoopsSubtotal).toHaveTextContent("2.00");

      //  update subtotal with 2 chocolate
      const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
      });
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");
      expect(scoopsSubtotal).toHaveTextContent("6.00");
    });
  });

  describe("toppings Subtotals", () => {
    test("update toppgins subtotal when toppgins change", async () => {
      render(<Options optionsType="toppings" />, {
        wrapper: WhithAllProviders as ComponentType<{}>,
      });
      const toppginsSubtotal = screen.getByText("Toppings total: $", {
        exact: false,
      }); //partial match
      expect(toppginsSubtotal).toHaveTextContent("0.00");

      // check M&Ms
      const mAndMsCheckbox = await screen.findByRole("checkbox", {
        name: "M&Ms",
      });
      userEvent.clear(mAndMsCheckbox);
      userEvent.click(mAndMsCheckbox);
      expect(toppginsSubtotal).toHaveTextContent("1.50");

      // check Hot fudge
      const hotFudgeCheckbox = await screen.findByRole("checkbox", {
        name: "Hot fudge",
      });
      userEvent.clear(hotFudgeCheckbox);
      userEvent.click(hotFudgeCheckbox);
      expect(toppginsSubtotal).toHaveTextContent("3.00");

      //uncheck M&Ms
      userEvent.click(mAndMsCheckbox);
      expect(toppginsSubtotal).toHaveTextContent("1.50");
    });
  });
});

describe("Grand Total", () => {
  test("Grand total starts at $0.00", async () => {
    render(<OrderEntry />, { wrapper: WhithAllProviders as ComponentType<{}> });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    await waitFor(() => {
      // apesar de o do grandTotal ser syncrono, o componente Order entry carrega Options para scoops e toppings asyncrono é necessário que seja asyncrono
      screen.getByRole("spinbutton", { name: "Vanilla" });
      screen.getByRole("checkbox", { name: "M&Ms" });
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("update Grand Total when scoops change and toppings change after", async () => {
    render(<OrderEntry />, { wrapper: WhithAllProviders as ComponentType<{}> });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const mAndMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("update Grand Total when toppings change and scoops change after", async () => {
    render(<OrderEntry />, { wrapper: WhithAllProviders as ComponentType<{}> });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const mAndMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(mAndMsCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
});
