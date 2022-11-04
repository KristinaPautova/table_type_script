import { createContext, FC, PropsWithChildren, useState } from "react";
import axios from "axios";
import { IProduct } from "../types/intProduct";

const API = "http://localhost:8000/table";

export const tableContext = createContext<IProduct | null>(null);

let page = 1;
let totalPage: object | number = [];
let limit = 5;

interface props {
  children: JSX.Element | JSX.Element[];
}

const TableContextProvider = ({ children }: props) => {
  const [product, setProduct] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [value, setValue] = useState("q");

  const addProduct = async (product: IProduct) => {
    await axios.post(API, product);
  };

  const getProduct = async (type?: string, operator?: string) => {
    totalPageFunc();
    if (type === "quantity" && operator === "less") {
      setValue("quantity_gte");
    } else if (type === "quantity" && operator === "more") {
      setValue("quantity_lte");
    } else if (type === "distance" && operator === "less") {
      setValue("distance_gte");
    } else if (type === "distance" && operator === "more") {
      setValue("distance_lte");
    } else if (type === "distance" && operator === "equals") {
      setValue(`distance`);
    } else if (type === "quantity" && operator === "equals") {
      setValue(`quantity`);
    } else {
      setValue("q");
    }
    const { data } = await axios.get(
      `${API}?_page=${page}&_limit=${limit}&${value}=${searchVal}`
    );
    setProduct(data);
  };

  // Работа с пагинацией

  const totalPageFunc = async () => {
    let { data } = await axios(API);
    totalPage = Math.ceil(data.length / limit);
  };

  const prevPage = () => {
    if (page <= 1) return;
    page--;
    getProduct();
  };

  const nextPage = () => {
    if (totalPage <= page) return;
    page++;
    getProduct();
  };

  let cloud: any = {
    nextPage,
    prevPage,
    addProduct,
    getProduct,
    setSearchVal,
    searchVal,
    productsArr: product,
  };

  return (
    <tableContext.Provider value={cloud}>{children}</tableContext.Provider>
  );
};

export default TableContextProvider;
