import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import jwtDecode from "jwt-decode";
import '../scss/index.scss';
import AuthContext from '../context/AuthContext';
import { ToastContainer } from "react-toastify";
import { getUserData } from '../api/users';
import { setToken, getToken, removeToken } from '../api/token';
//Redux
import { useDispatch } from 'react-redux';
import withRedux, { createWrapper } from "next-redux-wrapper";
import { Provider } from 'react-redux';
import store from '../store/store';
//Redux Actions
import { getPropertiesAction } from '../store/actions/propertyActions';
import { getCustomersAction } from '../store/actions/customerActions';
import { getUsersAction } from '../store/actions/usersAction';
import { getRolesAction } from '../store/actions/rolesAction';
import { getBuildersAction } from '../store/actions/builderActions';
import { getCategoriesAction } from '../store/actions/categoryActions';
import { getDivisionsAction } from '../store/actions/divisionActions';
import { getBuildModelsAction } from '../store/actions/buildModelActions';
import { getTemplatesAction } from '../store/actions/templatesActions';
import { getBankCreditsAction } from '../store/actions/bankCreditActions';
import { getTimeLineListAction } from '../store/actions/timeLineActions';
import { getArticlesAction } from "../store/actions/articlesAction";
import Loading from '../components/shared/Loading';
import { getBanksAction } from "../store/actions/bankActions";


function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();
  //Initialize Redux States
  useEffect(() => {
    if (auth != undefined) {
      dispatch(getBuildersAction());
      dispatch(getCategoriesAction());
      dispatch(getDivisionsAction());
      dispatch(getPropertiesAction());
      dispatch(getCustomersAction());
      dispatch(getUsersAction());
      dispatch(getRolesAction());
      dispatch(getTemplatesAction());
      dispatch(getBuildModelsAction());
      dispatch(getBankCreditsAction());
      dispatch(getTimeLineListAction());
      dispatch(getArticlesAction());
      dispatch(getBanksAction());
      setLoading(false);
    }
    // eslint-disable-next-line 
  }, [auth])

  //Detects if user is already log in
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        const response = await getUserData(token);
        const userData = await response.userData;
        if (userData) {
          await setAuth({
            token,
            idUser: await jwtDecode(token).uid,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            image: userData.image,
            participations: userData.participations,
            totalAmount: userData.totalAmount
          })
        }
      } else {
        setAuth(null);
        router.push('/login')
      }
      setReloadUser(false);
    }
    fetchData();
    // eslint-disable-next-line 
  }, [reloadUser]);

  //login Context
  const login = async (token) => {
    setLoading(true);
    const idUser = await jwtDecode(token).uid;
    const response = await getUserData(token);
    const userData = await response.userData;
    await setToken(token);
    if (userData) {
      await setAuth({
        token,
        idUser,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        image: userData.image
      })
      router.push('/')
    }
  }
  //logout Context
  const logout = async () => {
    if (auth) {
      await removeToken();
      await setAuth(null);
      router.push('/login');
    }
  }

  //authData of Context
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser
      // eslint-disable-next-line
    }), [auth]
  )

  if (auth === undefined) return null;
  if (loading === true) return <Loading />
  return (
    <AuthContext.Provider value={authData}>
      <Provider store={store}>
        <Head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover />
      </Provider>
    </AuthContext.Provider>
  )
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)