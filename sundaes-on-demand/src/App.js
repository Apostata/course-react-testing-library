import { Container } from "react-bootstrap";
import "./App.css";
import OrderEntry from "./Pages/entry/OrderEntry";
// import SummaryForm from "./Pages/summary/SummaryForm";
function App() {
  return (
    <Container>
      <h1>Sundae App</h1>
      <OrderEntry />
    </Container>
  );
}

export default App;
