import Header from '../../layout/header/Header';
import Footer from '../../layout/footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { getCookie } from 'typescript-cookie';
import { AccountContext } from '../../contexts/nonts/AccountContext';

const Home = () => {
  const { account, setAccount } = useContext(AccountContext);
  useEffect(() => {
    const tokenNonts = getCookie('tokenNonts');
    if (account) {
      console.log(account);
    } else {
      console.log(tokenNonts);
    }
  }, []);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   // const tokenNonts = getCookie('tokenNonts');
  //   if (tokenNonts) {
  //     // console.log(tokenNonts);
  //     return;
  //   }
  //   navigate('/login');
  // }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
