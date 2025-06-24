"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [pedido, setPedido] = useState([]);
  const [historicoPedidos, setHistoricoPedidos] = useState([]);

  // Carrega os dados do localStorage ao iniciar
  useEffect(() => {
    const pedidoSalvo = localStorage.getItem("pedido");
    const historicoSalvo = localStorage.getItem("historicoPedidos");

    if (pedidoSalvo) setPedido(JSON.parse(pedidoSalvo));
    if (historicoSalvo) setHistoricoPedidos(JSON.parse(historicoSalvo));
  }, []);

  // Atualiza o localStorage sempre que o pedido mudar
  useEffect(() => {
    localStorage.setItem("pedido", JSON.stringify(pedido));
  }, [pedido]);

  // Atualiza o localStorage sempre que o histórico mudar
  useEffect(() => {
    localStorage.setItem("historicoPedidos", JSON.stringify(historicoPedidos));
  }, [historicoPedidos]);

  const adicionarAoPedido = (item) => {
    setPedido((pedidoAnterior) => [...pedidoAnterior, item]);
  };

  const limparPedido = () => {
    setPedido([]);
  };

  const adicionarAoHistorico = (pedidoFinalizado) => {
    setHistoricoPedidos((historicoAnterior) => [...historicoAnterior, pedidoFinalizado]);
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        adicionarAoPedido,
        limparPedido,
        historicoPedidos,
        adicionarAoHistorico,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  return useContext(PedidoContext);
}
