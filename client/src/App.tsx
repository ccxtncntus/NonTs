import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import HomeContent from './pages/homecontent/HomeContent';
import Contact from './pages/contact/Contact';
import Blog from './pages/blog/Blog';
const NonLazy = lazy(() => import('./pages/non/Non'));
const RegisterLazy = lazy(() => import('./pages/register/Register'));
const ForgotpassLazy = lazy(() => import('./pages/forgotpass/Forgotpass'));
const ForgotpassChangeLazy = lazy(
  () => import('./pages/changepass/ChangePassForgot')
);

import Cv from './pages/cv/Cv';
const AboutCV = lazy(() => import('./components/cv/About'));
const ProjectsCV = lazy(() => import('./components/cv/Projects'));
const ContactCV = lazy(() => import('./components/cv/Contact'));
const ResumeCV = lazy(() => import('./components/cv/Resume'));
const BannerCV = lazy(() => import('./components/cv/Banner'));
const DownLoadCV = lazy(() => import('./components/cv/download/DownLoad'));
import { Toaster } from 'sonner';

import Loading from './components/cv/Loading';

import Tv from './pages/tv/Tv';
const LoginLazy = lazy(() => import('./pages/login/Login'));

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<HomeContent />} />
          <Route
            path="/call"
            element={
              <Suspense fallback={'Loading...'}>
                <NonLazy />
              </Suspense>
            }
          />
          <Route
            path="/call/:id"
            element={
              <Suspense fallback={'Loading...'}>
                <NonLazy />
              </Suspense>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
        </Route>
        <Route path="/cv" element={<Cv />}>
          <Route
            path="/cv"
            element={
              <Suspense fallback={<Loading />}>
                <BannerCV />
              </Suspense>
            }
          />
          <Route
            path="/cv/home"
            element={
              <Suspense fallback={<Loading />}>
                <BannerCV />
              </Suspense>
            }
          />
          <Route
            path="/cv/resume"
            element={
              <Suspense fallback={<Loading />}>
                <ResumeCV />
              </Suspense>
            }
          />
          <Route
            path="/cv/about"
            element={
              <Suspense fallback={<Loading />}>
                <AboutCV />
              </Suspense>
            }
          />
          <Route
            path="/cv/projects"
            element={
              <Suspense fallback={<Loading />}>
                <ProjectsCV />
              </Suspense>
            }
          />
          <Route
            path="/cv/contact"
            element={
              <Suspense fallback={<Loading />}>
                <ContactCV />
              </Suspense>
            }
          />
          <Route
            path="/cv/download"
            element={
              <Suspense fallback={<Loading />}>
                <DownLoadCV />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="download-cv"
          element={
            <Suspense fallback={<Loading />}>
              <DownLoadCV />
            </Suspense>
          }
        />
        <Route path="/tv" element={<Tv />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={'loading...'}>
              <LoginLazy />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={'loading...'}>
              <RegisterLazy />
            </Suspense>
          }
        />
        <Route
          path="/forgotpass"
          element={
            <Suspense fallback={'loading...'}>
              <ForgotpassLazy />
            </Suspense>
          }
        />
        <Route
          path="/forgotpass/change"
          element={
            <Suspense fallback={'loading...'}>
              <ForgotpassChangeLazy />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
export default App;
