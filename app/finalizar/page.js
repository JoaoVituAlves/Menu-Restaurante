"use client";
import { usePedido } from "../context/pedidoContext";
import Link from "next/link";

export default function Finalizar() {
  const {
    pedido,
    adicionarAoHistorico,
    limparPedido, // faltou isso para limpar pedido
    historicoPedidos,
  } = usePedido();

  const handleFinalizarPedido = () => {
    if (pedido.length === 0) {
      alert("Seu pedido está vazio!");
      return;
    }
    adicionarAoHistorico(pedido);
    limparPedido(pedido); // chamar a função do limpar pedido 
    alert("Pedido finalizado com sucesso!");
  };

  const renderItem = (item, indice) => (
    <li key={indice} className="list-group-item d-flex align-items-center">
      <img
        src={item.strMealThumb || item.strDrinkThumb}
        alt={item.strMeal || item.strDrink}
        style={{ width: 70, height: 70, objectFit: "cover", borderRadius: "8px"}}/>
      <div>
        <strong>{item.strMeal || item.strDrink}</strong>
        <br/>
        <small>
          Ingredientes:{" "}
          {[...Array(10)]
            .map((_, i) => item[`strIngredient${i + 1}`])
            .filter(Boolean)
            .join(", ")}
        </small>
      </div>
    </li>
  );

  return (
    <div className="container my-5">
      <h2>Finalize o seu pedido</h2>
      <hr/>{pedido.length === 0 ? (
        <p>Seu pedido está vazio.</p>
    ) : (
        <ul className="list-group mb-4">{pedido.map(renderItem)}</ul>
      )}
      <button
        className="btn btn-success mb-5"
        onClick={handleFinalizarPedido}
        disabled={pedido.length === 0}>Finalizar pedido</button>
      <hr/>
      <h3>Histórico de Pedidos</h3>
      {historicoPedidos.length === 0 ? (
        <p>Nenhum há nenhumn pedido finalizado.</p>
      ) : (
        historicoPedidos.map((pedidoHist, i) => (
          <div key={i} className="mb-4 p-3 border rounded">
            <h5>Pedido Nº{i + 1}</h5>
            <ul className="list-group">
              {pedidoHist.map((item, indice) => renderItem(item, indice))}
            </ul>
          </div>
        ))
      )}
      <Link href="/">
        <button className="btn btn-primary mt-4">Voltar ao Menu</button>
      </Link>
    </div>
  );
}
