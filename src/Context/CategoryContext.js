import {createContext,useState} from 'react';

const CategoryContext = createContext(null);
export const CategoryProvider = ({ children }) => {

    const [categories, setCategories] = useState([])
    const values = {categories,setCategories}
    
    return <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>

}

export default CategoryContext;