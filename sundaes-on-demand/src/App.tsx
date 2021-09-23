import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
// import { OrderDetailsProvider } from "./Providers/OrderDetails.provider";
import { OrderDetailsProvider } from "./Providers/OrderDetails.provider";
export function App() {
  return <Routes />;
}

function WithRouter() {
  return (
    <Container>
      <OrderDetailsProvider>
        <Router>
          <App />
        </Router>
      </OrderDetailsProvider>
    </Container>
  );
}

export default WithRouter;
