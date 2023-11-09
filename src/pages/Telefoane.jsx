import React from "react"
import { Link } from "react-router-dom"
import ProductListing from "/src/components/ProductListing.jsx"
import { getPhones } from "/src/components/api.js";
// import UnderConstr from "/src/components/UnderConstr.jsx"

const phoneCompanyOptions = ["Apple", "Samsung", "Oppo", "OnePlus", "Xiaomi"];
const phoneColorOptions = ["Black", "White", "Gray", "Blue"];
const phoneMemoryOptions = ["125", "256", "512", "1000"];
const phoneRamOptions = ["6", "8", "12"];

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


export default function Telefoane() {
  return (
    <ProductListing
      category="phones"
      fetchData={getPhones}
      filterOptions={filterOptions}
      filterConfig={filterConfig}
      sortConfig={sortConfig}
      companyOptions={phoneCompanyOptions}
      colorOptions={phoneColorOptions}
      memoryOptions={phoneMemoryOptions}
      ramOptions={phoneRamOptions}
    />
  );
}

