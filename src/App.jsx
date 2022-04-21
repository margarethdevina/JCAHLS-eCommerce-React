import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';
import RegisterPage from './Pages/RegisterPage';
import ProductPage from './Pages/ProductPage';
import ProductsAdmin from './Pages/ProductsAdmin';
import ProductDetail from "./Pages/ProductDetail";
import Axios from 'axios';
import { API_URL } from './helper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from './redux/actions/productsAction';
import { loginAction } from './redux/actions/usersAction';
import TransactionsAdminPage from './Pages/TransactionsAdmin';
import CartPage from './Pages/Cart';
import TransactionsPage from './Pages/Transactions';
import NotFoundPage from './Pages/404';

// metode pembuatan komponen pd react menggunakan metode FUNCTIONAL COMPONENT
// metode ini paling sering digunakan saat ini dibandingkan class component

// FUNCTIONAL COMPONENT
function App() { //INITIALIZE COMPONENT

  // dispatch mengeksekusi action pada redux dan menghubungkannya ke reducer by sistem redux makannya di productsReducer ga diimport productsAction lagi
  const dispatch = useDispatch();

  const { role } = useSelector((state) => {
    return {
      role: state.usersReducer.role
    }
  })

  // FUNCTION AND DATA
  let data = [];

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        console.log(response.data)
        dispatch(getProductsAction(response.data))
      }).catch((error) => {
        console.log(error)
      })
  }

  const keepLogin = () => {
    let token = localStorage.getItem("tokenIdUser")
    if (token) {
      Axios.get(`${API_URL}/users?id=${token}`)
        .then((res) => {
          localStorage.setItem("tokenIdUser", res.data[0].id)
          dispatch(loginAction(res.data[0]));
        }).catch((error) => {
          console.log(error);
        })
    }
  }

  React.useEffect(() => {
    keepLogin();
    getProducts();
  }, [])

  // RETURN HTML COMPONENT
  // return disini skrg bisa langsung mereturn tanpa dalam bentuk string sekarang
  return (
    <div>
      {/* NavbarComponent ga masuk Routes karena bersifat tetap */}
      <Navbar />
      <Routes>
        {/* untuk home pakai path='/' */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/detail' element={<ProductDetail />} />
        {
          role == "admin" ?
            <>
              <Route path='/products/admin' element={<ProductsAdmin />} />
              <Route path='/transactions/admin' element={<TransactionsAdminPage />} />
            </>
            :
            <>
            <Route path='/cart' element={<CartPage />} />
            <Route path='/transactions' element={<TransactionsPage />} />
            </>
        }
        <Route path='*' element={<NotFoundPage />} />
        
      </Routes>
    </div>
  );
}

// export default untuk mengekspor komponen agar dpt ditampilkan oleh virtualDOM react
export default App;

// export disini, diimpor di index.js, dipanggil virtualDOM, disambung ke root di index.html

// react bersifat modular design/concept component atau atomic design = react bisa memecah berbagai komponen ke dalam folder masing2.
// tiap bagian tampilan bisa dipecah ke berbagai file
// keunggulan:
/**
 * 1. bisa daur ulang
 * 2. maintenance partial lebih mudah
 */
// saat buat komponen buat nama file menggunakan
// .jsx berarti berisi komponen
// js aja berarti berisi fungsi
// sebenarnya keduanya ga berbeda tapi ini cuma jd penanda
