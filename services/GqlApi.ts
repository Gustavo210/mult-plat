import axios from "axios";

export const GqlApi = axios.create({
  baseURL: "https://rickandmortyapi.com/graphql",
});
