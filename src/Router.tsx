import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DiscoveryPage from './page/discovery/DiscoveryPage';
import HomelessPage from './page/homeless/HomelessPage';
import JoinPage from './page/join/JoinPage';
import LoginPage from './page/login/LoginPage';
import Main from './page/main/MainPage';
import UserPage from './page/user/UserPage';
import { Cookies } from 'react-cookie';
import Header from './component/header/header';
import LostPetPage from './page/lostPet/LostPetPage';

const Router = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get('access_token');

  return (
    <>
      <Header accessToken={accessToken}></Header>
      <Routes>
        {accessToken ? (
          <>
            <Route path='/' element={<Main />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/discovery' element={<DiscoveryPage />} />
            <Route path='/lostPet' element={<LostPetPage />} />
            <Route path='/homeless' element={<HomelessPage />} />
            <Route path='*' element={<Main />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/join' element={<JoinPage />} />
            <Route path='/homeless' element={<HomelessPage />} />
            <Route path='*' element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;

// const Router = () => {
//     const { accessToken } = useContext(AccessTokenContext);

//     return (
//       <Routes>
//         {accessToken ? (
//           <Route element={<NavLayout />}>
//             <Route path="/reservation" element={<ReservationPage />} />
//             <Route path="/member" element={<MemberPage />} />
//             <Route path="/sales" element={<SalesPage />} />
//             <Route path="/voucher" element={<VoucherPage />} />
//             <Route path="*" element={<Navigate to="/reservation" />} />
//           </Route>
//         ) : (
//           <>
//             <Route path="/signin" element={<SignInPage />} />
//             <Route path="*" element={<Navigate to="/signin" />} />
//           </>
//         )}
//       </Routes>
//     );
//   };

//   export default Router;
