import React,{useEffect,useContext} from 'react'
import 'antd/dist/antd.css'
import HomePage from '../Pages/HomePage'
import ProductsPage from '../Pages/ProductsPage'
import { Link, Route, Routes } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Basket from '../Components/Basket';
import { ProductDetailPage } from '../Pages/ProductDetailPage';
import ProductsContext from '../Context/ProductContext'
import CategoryContext from '../Context/CategoryContext'
import { baseService } from '../Services/network/services/baseService'
import { BasketConfirmPage } from '../Pages/BasketConfirmPage';
import { CustomerOrdersPage } from '../Pages/CustomerOrdersPage';

const HeaderComponent = () => {
  const { Header, Content} = Layout;

  const { products, setProducts } = useContext(ProductsContext)
  const {categories, setCategories} = useContext(CategoryContext)

  useEffect(() => {
    getProducts();
    getCategories();
  }, [])
  const getProducts = async () => {
    const data = await baseService.get('/products')
    setProducts(data)
  }
  const getCategories = async () => {
    const data = await baseService.get('/categories')
    setCategories(data)
  }

  return (
    <Layout className="layout" style={{backgroundColor:"black",height:60}} >
      <Header>
        <Menu theme="dark" mode='horizontal' width={50}>
          <Menu.Item key="1"><Link to="/" />Home</Menu.Item>
          <Menu.Item key="2"><Link to="/products/all" />Products</Menu.Item>
          <Menu.Item key="3"><Link to="/basket"/>Cart</Menu.Item>
          <Menu.Item key="4"><Link to="/customerOrders"/>Customer Orders</Menu.Item>

        </Menu>
        <Basket></Basket>
        <Content >
          <div className='site-layout-content'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/products/:id" element={<ProductsPage />} />
              <Route  path="/details/:id" element={<ProductDetailPage/>}/>
              <Route  path="/basket" element={<BasketConfirmPage/>}/>
              <Route  path="/customerOrders" element={<CustomerOrdersPage/>}/>
            </Routes>
          </div>
        </Content>
      </Header>
    </Layout>
    
  )
}
export default HeaderComponent;
