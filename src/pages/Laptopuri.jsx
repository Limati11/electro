import React from "react"
import { Link } from "react-router-dom"
import ProductListing from "/src/components/ProductListing.jsx"
import { getLaptops } from "/src/components/api.js";
// import UnderConstr from "/src/components/UnderConstr.jsx"

const laptopCompanyOptions = ["Apple", "Acer", "Lenova", "Asus"];
const laptopColorOptions = ["Black", "White", "Gray", "Blue"];
const laptopMemoryOptions = ["256", "512"];
const laptopRamOptions = ["4", "8", "16"];

const filterOptions = {
  minPrice: "",
  maxPrice: "",
  company: "",
  name: "",
  model: "",
  color: "",
  memory: "",
  ram: "",
};

const filterConfig = {
  isFilterProducatorOpen: false,
  isFilterModelOpen: false,
  isFilterCuloareOpen: false,
  isFilterMemorieOpen: false,
  isFilterRamOpen: false,
};

const sortConfig = {
  criteria: "name",
  order: "asc",
};


export default function Laptopuri() {
  return (
    <ProductListing
      category="laptops"
      fetchData={getLaptops}
      filterOptions={filterOptions}
      filterConfig={filterConfig}
      sortConfig={sortConfig}
      companyOptions={laptopCompanyOptions}
      colorOptions={laptopColorOptions}
      memoryOptions={laptopMemoryOptions}
      ramOptions={laptopRamOptions}
    />
  );
}

