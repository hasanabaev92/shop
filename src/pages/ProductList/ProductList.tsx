
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { getProducts } from "../../mock/fakeFetches";

import ProductMiniCard from "../../components/ProductMiniCard/ProductMiniCard";

import type { ProductT } from "../../types/productType";

import "./ProductList.css";

function ProductList() {
  /*
    useState (читается как «ю-стейт») — это хук в библиотеке React для управления состоянием в функциональных компонентах, который возвращает пару: текущее значение состояния (filterState) и функцию для его обновления (filterSetState). Изменять значение переменной filterState можно только
    вызовом функции filterSetState('новое значение')
  */
  const [filterState, filterSetState] = useState<string>("");
  const [state, setState] = useState<number>(0);

  const { isPending, error, data } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: getProducts,
  });

  const navigate = useNavigate();

  const handleClickProduct = (id: ProductT["id"]) => {
    navigate(`/product/${id}`);
  };

  const ProductDiv = data
    ?.filter((x) => x.name.toLowerCase().includes(filterState.toLowerCase()))
    .map((x) => (
      <ProductMiniCard
        key={x.id}
        onclickFn={() => handleClickProduct(x.id)}
        product={x}
      />
    ));

  if (isPending) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки товара</div>;

  return (
    <>
      <div>{state}</div>
      <button onClick={() => setState(state + 1)}>ТЫК</button>
      <input
        value={filterState}
        onChange={(e) => filterSetState(e.target.value)}
      />
      <div className="product-list-container">{ProductDiv}</div>
    </>
  );
}

export default ProductList;
