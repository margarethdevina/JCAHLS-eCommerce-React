import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';
import RegisterPage from './Pages/RegisterPage';
import ProductPage from './Pages/ProductPage';
import ProductsAdmin from './Pages/ProductsAdmin';
import ProductDetail from "./Pages/ProductDetail";

// metode pembuatan komponen pd react menggunakan metode FUNCTIONAL COMPONENT
// metode ini paling sering digunakan saat ini dibandingkan class component

// FUNCTIONAL COMPONENT
function App() { //INITIALIZE COMPONENT

  // FUNCTION AND DATA
  let data = [];

  // RETURN HTML COMPONENT
  // return disini skrg bisa langsung mereturn tanpa dalam bentuk string sekarang
  return (
    <div>
      {/* NavbarComponent ga masuk Routes karena bersifat tetap */}
      <Navbar />
      <Routes>
        {/* untuk home pakai path='/' */}
        <Route path='/' element={<LandingPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/products' element={<ProductPage />}/>
        <Route path='/products/admin' element={<ProductsAdmin />}/>
        <Route path='/product/detail' element={<ProductDetail />}/>
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
