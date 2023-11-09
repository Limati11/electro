import React from "react"
import { Link } from "react-router-dom"
import ProductListing from "/src/components/ProductListing.jsx"
import { getGadgets } from "/src/components/api.js";
// import UnderConstr from "/src/components/UnderConstr.jsx"

const gadgetCompanyOptions = ["Apple", "Samsung", "Xbox", "Sony", "Nintendo"];
const gadgetColorOptions = ["Black", "White", "Gray", "Blue"];
const gadgetMemoryOptions = ["256", "512"];
const gadgetRamOptions = ["4", "8", "16"];
const gadgetCategoryOptions = ["Ceas", "Consolă"];

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
  isFilterCategoryOpen: false,
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


export default function Gadgeturi() {
  return (
    <ProductListing
      category="gadgets"
      fetchData={getGadgets}
      filterOptions={filterOptions}
      filterConfig={filterConfig}
      sortConfig={sortConfig}
      companyOptions={gadgetCompanyOptions}
      colorOptions={gadgetColorOptions}
      memoryOptions={gadgetMemoryOptions}
      ramOptions={gadgetRamOptions}
      categoryOptions={gadgetCategoryOptions}
    />
  );
}

