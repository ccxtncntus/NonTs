import Header from '../../layout/header/Header';
import Footer from '../../layout/footer/Footer';
import { Outlet } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
