/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import Option from "./Option";
import { Row } from "react-bootstrap";
import { useScoopContext } from "../../Providers/scoopsAndToppings.provider";
import { useOrderDetailsContext } from "../../Providers/OrderDetails.provider";
import AlertBanner from "../../components/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../helpers/formatCurrency";

export function Options({ optionsType }: { optionsType: string }) {
  const { scoops, toppings, getScoops, getToppings, error } = useScoopContext();
  const [orderDetails, updateItemCount] = useOrderDetailsContext();
  const { totals } = orderDetails;
  useEffect(() => {
    if (optionsType === "scoops") getScoops();
    if (optionsType === "toppings") getToppings();
  }, []);

  const renderOption = () => {
    if (optionsType === "scoops") {
      return scoops.map((item, idx) => (
        <Option
          key={`${idx}-${item.name}`}
          name={item.name as string}
          imagePath={item.imagePath as string}
          type="scoop"
          updateItemCount={(name: string, count: string) =>
            updateItemCount(name, count, "scoops")
          }
        />
      ));
    } else {
      return toppings.map((item, idx) => (
        <Option
          key={`${idx}-${item.name}`}
          name={item.name as string}
          imagePath={item.imagePath as string}
          type="topping"
          updateItemCount={(name: string, count: string) =>
            updateItemCount(name, count, "toppings")
          }
        />
      ));
    }
  };

  if (error) return <AlertBanner message={error.message} />;

  const title =
    optionsType[0].toUpperCase() + optionsType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionsType])} each</p>
      <p>
        {title} total: {totals[optionsType]}
      </p>
      <Row>{renderOption()}</Row>
    </>
  );
}

export default Options;

// export default function WithContext(props){
//     const { optionsType } = props
//     return (
//         <OrderDetailsProvider>
//             <ScoopsAndToppingsProvider>
//                 <Options optionsType={optionsType}/>
//             </ScoopsAndToppingsProvider>
//         </OrderDetailsProvider>
//     )
// }
