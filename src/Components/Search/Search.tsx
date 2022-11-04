import "./Search.css";
import React, { useContext, useEffect} from "react";
import {tableContext} from "../../context/TableContextProvider";

interface SearchType  {
    setType : (e: string)=> void;
    type: string;
    operator: string;
    setOperator: (e: string)=> void;
}

// interface SearchContext {
//     setSearchVal: () => void;
//     getProduct: any;
//     searchVal: string
// }

const Search = ({type,setType, operator, setOperator}: SearchType) => {
    const { setSearchVal, getProduct , searchVal}: any =
        useContext(tableContext);

    useEffect(() => {
        getProduct(type,operator)
    },[searchVal,type])

  return (
    <div className="search">
      <div className="search__list">
        <label htmlFor="name">Столбцы</label>
        <select className="form-control" id="example"
                value={type}
                onChange={(e) => setType(e.target.value)}
        >
          <option value="name" selected>
            Название
          </option>
          <option value="quantity">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
      </div>
        {type === "name" ? (
            <div className="search__list">
                <label htmlFor="name">Оператор</label>
                <select className="form-control" id="example"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                >
                    <option value="contains" selected>
                        содержит
                    </option>
                </select>
            </div>
        ): (
            <div className="search__list">
                <label htmlFor="name">Оператор</label>
                <select className="form-control" id="example"
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                >
                    <option value="equals">равно</option>
                    <option value="less">больше</option>
                    <option value="more">меньше</option>
                </select>
            </div>
        )}

      <div className="search__list">
        <label htmlFor="name">Ценность</label>
        <input onChange={(e) => setSearchVal(e.target.value)} type="search" placeholder="Значение фильтра" />
      </div>
    </div>
  );
};

export default Search;
