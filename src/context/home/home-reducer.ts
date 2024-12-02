import { HomeActions } from "../../domain/home-actions";
import { Category, Product } from "../../domain/interfaces";

export interface DispatchObject<A, T = any> {
  type: A,
  payload?: T,
}

export interface HomeState {
  initialProducts: Product[],
  productsData: Product[],
  filteredProducts: Product[],
  categoriesList: Category[],
  productsCategories: string[],
}

export const initialHomeState: HomeState = {
  initialProducts: [],
  productsData: [],
  filteredProducts: [],
  categoriesList: [],
  productsCategories: [],
}

export const homeReducer = <T>(
  state: HomeState,
  {type, payload}: DispatchObject<T>
) => {
  switch (type){
    case HomeActions.SetProductsData:
      return {
        ...state,
        productsData: payload as Product[],
      }
    case HomeActions.SetInitialProducts:
      return {
        ...state,
        initialProducts: payload as Product[],
      }
    case HomeActions.SetFilteredProducts:
      return{
        ...state,
        filteredProducts: payload as Product[],
      }
    case HomeActions.SetCategories:
      return{
        ...state,
        categoriesList: payload as Category[],
      }
    case HomeActions.SetProductsCategories:
      return{
        ...state,
        productsCategories: payload as string[],
      }
    default:
      console.log("Invalid Home Actions option");
      return state
  }
}