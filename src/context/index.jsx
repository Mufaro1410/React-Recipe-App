import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false)
  const [recipeList, setRecipeList] = useState([])

  async function handleSubmit(event) {
    event.preventDefault()
    try {
        setLoading(true)
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
      );
      const data = await res.json();
      if (data?.data?.recipes){
        setRecipeList(data?.data?.recipes)
        setLoading(false)
        setSearchParams('')
      }

    //   console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false)
      setSearchParams('')
    }
  }

//   console.log(loading, recipeList);

  return (
    <GlobalContext.Provider
      value={{ searchParams, loading, recipeList, setSearchParams, handleSubmit }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
