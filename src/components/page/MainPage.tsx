import React, {useEffect} from "react";
import CategoryContainer from "../post/categoryContainer/CategoryContainer";
import Footer from "../generic/footer/Footer";
import Header from "../generic/header/Header";
import MainBackground from "../generic/mainBackground/MainBackground";
import CategoryPost from "../post/postCategory/CategoryPost";
import { Account } from "../../App";

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
      <MainBackground />

      <CategoryContainer />
      <Footer />
    </div>
  );
}

export default MainPage;
