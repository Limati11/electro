import React from "react"
import { Link } from "react-router-dom"
import ProductListing from "/src/components/ProductListing.jsx"
import { getTablets } from "/src/components/api.js";
// import UnderConstr from "/src/components/UnderConstr.jsx"

const tabletCompanyOptions = ["Samsung", "Xiaomi"];
const tabletColorOptions = ["Black", "White", "Gray", "Blue"];
const tabletMemoryOptions = ["32", "128", "512"];
const tabletRamOptions = ["4", "6", "8", "12"];

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


export default function Tablete() {
  return (
    <ProductListing
      category="tablets"
      fetchData={getTablets}
      filterOptions={filterOptions}
      filterConfig={filterConfig}
      sortConfig={sortConfig}
      companyOptions={tabletCompanyOptions}
      colorOptions={tabletColorOptions}
      memoryOptions={tabletMemoryOptions}
      ramOptions={tabletRamOptions}
    />
  );
}

