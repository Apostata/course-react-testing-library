/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetailsContext } from "../../Providers/OrderDetails.provider";
import { useHistory } from "react-router";
import { NotNullCounters } from "../../types/interfaces";
export default function OrderConfirmation() {
  const [orderDetails, , resetOrder] = useOrderDetailsContext();
  const history = useHistory();

  useEffect(() => {
    if (
      (orderDetails as NotNullCounters).scoops.size === 0 &&
      (orderDetails as NotNullCounters).toppings.size === 0 &&
      !orderDetails.orderNumber
    ) {
      history.push("/");
      // console.log('mudar de página')
    }
  }, [orderDetails]);
  return (
    <div>
      <h1>Thank you!</h1>
      <h2>Order number: {orderDetails?.orderNumber || ""}</h2>
      <Button
        onClick={(e) => {
          e.preventDefault();
          resetOrder();
          history.push("/");
        }}
      >
        New Order
      </Button>
    </div>
  );
}
