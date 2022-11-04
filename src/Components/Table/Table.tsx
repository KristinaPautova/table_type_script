import React, { FC, useContext, useEffect, useState } from "react";
import "./Table.css";
import { tableContext } from "../../context/TableContextProvider";
import Search from "../Search/Search";
import { IProduct } from "../../types/intProduct";

const Table: FC = () => {
  const { getProduct, productsArr, prevPage, nextPage }: any =
    useContext(tableContext);

  const [type, setType] = useState("name");
  const [operator, setOperator] = useState("contains");

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {productsArr ? (
        <div className="table">
          <Search
            type={type}
            setType={setType}
            operator={operator}
            setOperator={setOperator}
          />
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Название</th>
                  <th className="pers">Количество</th>
                  <th className="pers">Расстояние</th>
                </tr>
              </thead>
              <tbody className="task-list">
                {productsArr.map((elem: IProduct) => (
                  <tr key={elem.id}>
                    <td>{elem.date}</td>
                    <td>{elem.name}</td>
                    <td>{elem.quantity}</td>
                    <td>{elem.distance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="block-button">
            <button onClick={prevPage}>Prev</button>
            <button onClick={nextPage}>Next</button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Table;
