import { createContext, useState } from "react";

export const RecipesContext = createContext({});

export function RecipesContextProvider({ children }) {
    const { Provider } = RecipesContext;
    const [recipes, setRecipes] = useState();

    const value = {
        recipes, setRecipes
    };

    return <Provider value={value}>{children}</Provider>;
}
