import {createContext, useState} from "react";
const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const values = {products,setProducts}
    return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>

}

export default ProductContext;