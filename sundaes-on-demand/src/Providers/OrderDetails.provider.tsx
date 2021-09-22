import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { subtotalCalc } from "../helpers/subtotalCalc";
import { formatCurrency } from "../helpers/formatCurrency";
import { postOrder } from "../services/sundae.service";
import { keyValue, Counters } from "../types/interfaces";

export interface OderDetailsDefaultValue extends Counters {
  orderNumber?: number;
}

interface OrderDetailsProps extends OderDetailsDefaultValue {
  children: JSX.Element;
}

type Totals = {
  scoops: string;
  toppings: string;
  total: string;
  [key: string]: string;
};

type OrderDetails = {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
  totals: Totals;
  orderNumber: number;
};

type ContextValue = [
  OrderDetails,
  (itemName: string, newItemCount: string, optionType: string) => void,
  () => void,
  (
    data: Object,
    retorno?: boolean,
    callback?: Function | undefined
  ) => Promise<void | keyValue | keyValue[]>
];

export const OrderDetailsContext = createContext<ContextValue | null>(null);

export const useOrderDetailsContext = () => {
  const context = useContext(OrderDetailsContext);
  if (!context) {
    // se não estiver dentro de um OrderDetailsProvider, gera um erro, se estiver, retorna o context
    throw new Error("Must be used within an OrderDetailsProvider!");
  }

  return context;
};

export const OrderDetailsProvider = (props: OrderDetailsProps) => {
  const { children, ...newProps } = props;
  const [orderNumber, setOrderNumber] = useState(props?.orderNumber || null);
  const [optionCounts, setOptionCounts] = useState<Counters>({
    scoops: props?.scoops || new Map(), // [key, value]
    toppings: props?.toppings || new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    total: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = subtotalCalc("scoops", optionCounts);
    const toppingsSubtotal = subtotalCalc("toppings", optionCounts);
    const total = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      total: formatCurrency(total),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: string
    ) {
      const newOptionCounts = {
        ...optionCounts,
      };
      const optionCountsMap = (
        optionCounts as { [index: string]: Map<string, number> }
      )[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
      setOrderNumber(null);
    }

    const createOrder = async (
      data: Object,
      retorno = false,
      callback?: Function
    ) => {
      const resp = await postOrder(data);
      if (!retorno && resp) {
        const respObj = resp as keyValue;
        setOrderNumber(respObj.orderNumber as number);
        if (callback && typeof callback === "function") {
          callback();
        }
      } else {
        return resp;
      }
    };

    return [
      {
        ...optionCounts,
        totals,
        orderNumber,
      },
      updateItemCount,
      resetOrder,
      createOrder,
    ];
  }, [optionCounts, totals, orderNumber]);

  return (
    <OrderDetailsContext.Provider
      value={value as unknown as ContextValue}
      {...newProps}
    >
      {children}
    </OrderDetailsContext.Provider>
  );
};
