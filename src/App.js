import { CartProvider } from './Context/CartContext'
import { ProductProvider } from './Context/ProductContext';
import HeaderComponent from './main/HeaderComponent';
import { CategoryProvider } from './Context/CategoryContext';

function App() {

  return (
    <ProductProvider>
      <CategoryProvider>
        <CartProvider>
          <HeaderComponent />
        </CartProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
