import React, { useEffect } from 'react';

import { Account } from '../../App';
import Footer from '../generic/footer/Footer';
import Header from '../generic/header/Header';
import CategoryContainer from '../post/categoryContainer/CategoryContainer';

type AccountProps = {
  account: Account | null
  setAccount: (account: Account | null) => void
}
function MainPage({account, setAccount}: AccountProps) {

  useEffect(() => {

    console.log(account?.gmail + " gmail in mainpage")
  }, [account])

  return (
    <div>
      <Header account={account} setAccount={setAccount}/>
      <CategoryContainer />
      <Footer />
    </div>
  );
}

export default MainPage;
