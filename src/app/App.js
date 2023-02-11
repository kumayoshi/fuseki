import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../screens/SignInPage";
import SignUpPage from "../screens/SignUpPage";
import MemoListPage from "../screens/MemoListPage";
import AuthPage from "../screens/AuthPage";
import ArticlePage from "../screens/ArticlePage";
import OnBord from "../screens/OnBord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<SignInPage></SignInPage>} />
        <Route path={"/signup/"} element={<SignUpPage></SignUpPage>} />
        <Route path={"/memolist/"} element={<MemoListPage></MemoListPage>} />
        <Route path={"/auth/"} element={<AuthPage></AuthPage>} />
        <Route path={"/article/:id"} element={<ArticlePage></ArticlePage>} />
        <Route path={"/onbord/"} element={<OnBord></OnBord>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
