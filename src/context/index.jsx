import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favouritesList, setFavouritesList] = useState([])

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParams("");
        navigate('/')
      }

      //   console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParams("");
    }
  }

  function handleAddToFavourite(getCurrentItem){
    let cpyFavouritesList = [...favouritesList];
    const index = cpyFavouritesList.findIndex(item => item.id === getCurrentItem.id);
    if (index === -1) {
      cpyFavouritesList.push(getCurrentItem)
    } else {
      cpyFavouritesList.splice(index)
    }
    setFavouritesList(cpyFavouritesList)
  }

  // console.log(favouritesList);

  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        loading,
        recipeList,
        setSearchParams,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavourite,
        favouritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
