"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePedido } from "./context/pedidoContext";

export default function Home() {
  const [pratos, setPratos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [modoExibicao, setModoExibicao] = useState("pratos");
  const [categoriasPrato, setCategoriasPrato] = useState([]);
  const [categoriasBebida, setCategoriasBebida] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const { adicionarAoPedido, pedido } = usePedido();

  useEffect(() => {
    const buscarItensAleatorios = async (url, quantidade) => {
      const promessas = Array.from({ length: quantidade }, () =>
        fetch(url).then((resposta) => resposta.json())
      );
      const resultados = await Promise.all(promessas);
      return resultados
        .map((resultado) => {
          if (resultado.meals?.[0]) {
            const item = resultado.meals[0];
            return {
              ...item,
              nomePrato: item.strMeal,
              imagemPrato: item.strMealThumb,
            };
          } else if (resultado.drinks?.[0]) {
            const item = resultado.drinks[0];
            return {
              ...item,
              nomeBebida: item.strDrink,
              imagemBebida: item.strDrinkThumb,
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    const carregarDados = async () => {
      const [itensPrato, itensBebida] = await Promise.all([
        buscarItensAleatorios("https://www.themealdb.com/api/json/v1/1/random.php", 10),
        buscarItensAleatorios("https://www.thecocktaildb.com/api/json/v1/1/random.php", 10),
      ]);
      setPratos(itensPrato);
      setBebidas(itensBebida);
    };

    const carregarCategorias = async () => {
      const [resPrato, resBebida] = await Promise.all([
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php").then(res => res.json()),
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list").then(res => res.json()),
      ]);
      setCategoriasPrato(resPrato.categories.map(cat => cat.strCategory));
      setCategoriasBebida(resBebida.drinks.map(cat => cat.strCategory));
    };

    carregarDados();
    carregarCategorias();
  }, []);

  const adicionarItemAoPedido = (item) => {
    adicionarAoPedido(item);
    alert(`Item adicionado: ${item.nomePrato || item.nomeBebida}`);
  };

  const obterIngredientes = (item) => {
    const ingredientes = [];
    for (let i = 1; i <= 10; i++) {
      const ingrediente = item[`strIngredient${i}`];
      if (ingrediente) ingredientes.push(ingrediente);
    }
    return ingredientes.join(", ");
  };

  const itensExibidos = modoExibicao === "pratos" ? pratos : bebidas;
  const itensFiltrados = itensExibidos.filter((item) => {
    const categoria = item.strCategory;
    return categoriaSelecionada === "" || categoria === categoriaSelecionada;
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">Restaurante Fullstack</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4"></ul>
            <Link href="/finalizar">
              <button className="btn btn-primary">
                <i className="bi-cart-fill me-1"></i>
                Meus pedidos ({pedido.length})
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Banner principal */}
      <header className="bg-warning py-5 text-center">
        <img src="/banner.png" alt="banner" width="350" height="270" />
      </header>

      {/* Select modoExibicao */}
      <section className="py-3">
        <div className="container text-center">
          <label htmlFor="modoExibicaoSelect" className="fw-bold me-2" style={{ fontSize: "1.1rem" }}>
            Exibir:
          </label>
          <div className="d-inline-block position-relative" style={{ minWidth: "180px" }}>
            <select
              id="modoExibicaoSelect"
              className="form-select rounded"
              value={modoExibicao}
              onChange={(e) => {
                setModoExibicao(e.target.value);
                setCategoriaSelecionada(""); // Resetar filtro ao trocar tipo
              }}
              style={{
                cursor: "pointer",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "1",
              }}>
              <option value="pratos">Somente Refeições</option>
              <option value="bebida">Somente Bebidas</option>
            </select>
          </div>

          {/* Select Categoria */}
          {(modoExibicao === "pratos" ? categoriasPrato : categoriasBebida).length > 0 && (
            <div className="mt-3">
              <label className="fw-bold me-2" style={{ fontSize: "1.1rem" }}>
                Filtrar por categoria:
              </label>
              <div className="d-inline-block" style={{ minWidth: "200px" }}>
                <select
                  className="form-select rounded"
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}>
                  <option value="">Todas as categorias</option>
                  {(modoExibicao === "pratos" ? categoriasPrato : categoriasBebida).map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Menu principal */}
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5">
          <h2 className="text-center mb-4">Confira nosso menu :</h2>
          <hr className="mb-4" />
          <div className="row justify-content-center">
            {itensFiltrados.map((item, index) => (
              <div className="col mb-5" key={index}>
                <div className="card h-100 shadow border-light">
                  <img
                    className="card-img-top"
                    src={item.imagemPrato || item.imagemBebida}
                    alt={item.nomePrato || item.nomeBebida}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      {item.nomePrato || item.nomeBebida}
                    </h5>
                    <p className="card-text">
                      <strong>Ingredientes:</strong> {obterIngredientes(item)}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => adicionarItemAoPedido(item)}>
                      Adicionar ao meu pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
