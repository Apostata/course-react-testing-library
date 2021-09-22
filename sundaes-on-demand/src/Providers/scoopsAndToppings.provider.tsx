import { createContext, useState, useContext, ReactNode } from "react";
import { getScoopsOrToppings } from "../services/sundae.service";
import { keyValue } from "../types/interfaces";
// criando contexto

interface ContextValue {
  scoops: keyValue[];
  toppings: keyValue[];
  getScoops: (retorno?: boolean) => Promise<void | keyValue | keyValue[]>;
  getToppings: (retorno?: boolean) => Promise<void | keyValue | keyValue[]>;
  error: { message: string } | null;
}

export const ScoopsAndToppingsContext = createContext<ContextValue | null>(
  null
);

export const ScoopsAndToppingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [scoops, setScoops] = useState<keyValue[]>([]);
  const [toppings, setToppings] = useState<keyValue[]>([]);
  const [error, setError] = useState<null | string>(null);

  const getScoops = async (retorno = false) => {
    const resp = await getScoopsOrToppings("scoops");
    if (!retorno) {
      Array.isArray(resp)
        ? setScoops(resp as keyValue[])
        : setError(resp as unknown as string);
    } else {
      return resp;
    }
  };

  const getToppings = async (retorno = false) => {
    const resp = await getScoopsOrToppings("toppings");
    if (!retorno) {
      Array.isArray(resp)
        ? setToppings(resp)
        : setError(resp as unknown as string);
    } else {
      return resp;
    }
  };

  return (
    <ScoopsAndToppingsContext.Provider
      value={
        { scoops, toppings, getScoops, getToppings, error } as ContextValue
      }
    >
      {children}
    </ScoopsAndToppingsContext.Provider>
  );
};

export const useScoopContext = () => {
  const context = useContext(ScoopsAndToppingsContext);
  if (!context) {
    // se não estiver dentro de um ScoopsAndToppingsProvider, gera um erro, se estiver, retorna o context
    throw new Error("Must be used within an ScoopsAndToppingsProvider!");
  }

  return context;
};
