import { render } from "@testing-library/react";
import { ComponentType, ReactElement } from "react";
import { OrderDetailsProvider } from "../Providers/OrderDetails.provider";
import { ScoopsAndToppingsProvider } from "../Providers/scoopsAndToppings.provider";

const WithAllProviders = ({ children }: { children: ReactElement }) => {
  return (
    <OrderDetailsProvider>
      <ScoopsAndToppingsProvider>{children}</ScoopsAndToppingsProvider>
    </OrderDetailsProvider>
  );
};

const renderWithContexts = (ui: ReactElement, options: object) => {
  return render(ui, {
    wrapper: WithAllProviders as ComponentType<{}>,
    ...options,
  });
};

export * from "@testing-library/react";
export { renderWithContexts as render };
