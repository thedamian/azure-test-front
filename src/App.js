import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/Styles.css';
import Header from './components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import AddNew from './pages/AddNew';
import OneRecipe from './pages/OneRecipe';
import { UserChoiceContextProvider } from './context/UserChoiceContext';
import { RecipesContextProvider } from './context/RecipesContext';
import AllRecipes from './pages/AllRecipes';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <BrowserRouter>
      <UserChoiceContextProvider>
        <main >
          <Header />
          <RecipesContextProvider>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/seafood' element={<AllRecipes bestFor="seafood" />} />
              <Route path='/salads' element={< AllRecipes bestFor="salads" />} />
              <Route path='/dairy' element={<AllRecipes bestFor="dairy" />} />
              <Route path='/poultry' element={<AllRecipes bestFor="poultry" />} />
              <Route path='/meat' element={<AllRecipes bestFor="meat" />} />
              <Route path='/desserts' element={<AllRecipes bestFor="desserts" />} />
              <Route path='/add-new' element={<AddNew />} />
              <Route path='/recipe/:id' element={<OneRecipe />} />
              <Route path='/editrecipe/:id' element={<EditRecipe />} />
              <Route path='/sign-in' element={<Signin />} />
            </Routes>
          </RecipesContextProvider>
        </main>
      </UserChoiceContextProvider>
    </BrowserRouter>
  );
}

export default App;
