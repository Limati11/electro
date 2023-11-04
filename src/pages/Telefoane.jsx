import React, { useState } from "react";
import { Link, useSearchParams} from "react-router-dom";
import "./telefoane.scss";
import { getPhones } from "/src/components/api.js";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

export default function Telefoane() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phones, setPhones] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterSortareOpen, setIsFilterSortareOpen] = useState(false);
  const [isFilterPretOpen, setIsFilterPretOpen] = useState(false);
  const [isFilterCategoriiOpen, setIsFilterCategoriiOpen] = useState(false);
  const [isFilterProducatorOpen, setIsFilterProducatorOpen] = useState(false);
  const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
  const [isFilterCuloareOpen, setIsFilterCuloareOpen] = useState(false);
  const [isFilterMemorieOpen, setIsFilterMemorieOpen] = useState(false);
  const [isFilterRamOpen, setIsFilterRamOpen] = useState(false);


  React.useEffect(() => {
    async function loadPhones() {
      setLoading(true);
      try {
        const data = await getPhones();
        setPhones(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadPhones();
  }, []);


  const priceFilter = parseFloat(searchParams.get("price"));
  const companyFilter = searchParams.get("company");
  const nameFilter = searchParams.get("name");
  const modelFilter = searchParams.get("model");
  const colorFilter = searchParams.get("color");
  const memoryFilter = searchParams.get("memory");
  const ramFilter = searchParams.get("ram");

  const filteredPhones = phones.filter((phone) => {
    return (
      (!companyFilter || phone.company.toLowerCase() === companyFilter.toLowerCase()) && 
      (!colorFilter || phone.color.toLowerCase() === colorFilter) &&
      (!isNaN(priceFilter) ? phone.price <= priceFilter : true) &&
      (!nameFilter || phone.name.toLowerCase().includes(nameFilter)) &&
      (!modelFilter || phone.model.toLowerCase().includes(modelFilter)) &&
      (!memoryFilter || phone.memory.toLowerCase().includes(memoryFilter)) &&
      (!ramFilter || phone.ram.toLowerCase().includes(ramFilter))
    );
  });



  function toggleCategory(category, value) {
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters[category] === value) {
        const updatedFilters = { ...prevSelectedFilters };
        delete updatedFilters[category];
        return updatedFilters;
      } else {
        return { ...prevSelectedFilters, [category]: value };
      }
    });

    setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams);
        updatedParams.set(category, value);
        return updatedParams;
      });
    }
  

if (loading) {
    return <h1>Loading...</h1>
}

if (error) {
    return <h1>There was an error: {error.message}</h1>
}


  const handleFilterToggle = (filterName) => {
    switch (filterName) {
      case "isFilterOpen":
        setIsFilterOpen(!isFilterOpen);
        break;
      case "isFilterSortareOpen":
        setIsFilterSortareOpen(!isFilterSortareOpen);
        break;
      case "isFilterPretOpen":
        setIsFilterPretOpen(!isFilterPretOpen);
        break;
      case "isFilterCategoriiOpen":
        setIsFilterCategoriiOpen(!isFilterCategoriiOpen);
        break;
      case "isFilterProducatorOpen":
        setIsFilterProducatorOpen(!isFilterProducatorOpen);
        break;
      case "isFilterModelOpen":
        setIsFilterModelOpen(!isFilterModelOpen);
        break;
      case "isFilterCuloareOpen":
        setIsFilterCuloareOpen(!isFilterCuloareOpen);
        break;
      case "isFilterMemorieOpen":
        setIsFilterMemorieOpen(!isFilterMemorieOpen);
        break;
      case "isFilterRamOpen":
        setIsFilterRamOpen(!isFilterRamOpen);
        break;
      default:
        break;
    }
  };

  const phoneElements = filteredPhones.map((phone) => (
    <div key={phone.id} className="phone-tile">
      <Link to={phone.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: companyFilter, // What Data should be passed to link direction?
        }}
      >
        <img src={phone.imageUrl} />
        <div className="phone-info">
          <h3>{phone.company} {phone.name} {phone.model}</h3>
          <p>${phone.price}<span>/day</span></p>
        </div>
        {/* <i className={`phone-type ${phone.type} selected`}>{phone.type}</i>  */}
      </Link>
    </div>
  ));

  return (
    <div className="container">
      <div className="phones-container">
        <div className="filter-container">
          <div className="filter-top" onClick={() => handleFilterToggle("isFilterOpen")}>
            <p>Filtre</p>
            {isFilterOpen ? (
              <IoChevronUp className="chevron-up" />
            ) : (
              <IoChevronDown className="chevron-down" />
            )}
          </div>
          <div className="filter-bottom" onClick={() => handleFilterToggle("isFilterSortareOpen")}>
            <div>
              <p>Sortare</p>
              {isFilterSortareOpen ? (
                <HiMiniChevronUp className="chevrontwo-up" />
              ) : (
                <HiMiniChevronDown className="chevrontwo-down" />
              )}
            </div>
          </div>
          <div className={`filter-top-filters-container ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-top-filters">

                <div className="top-filters-pret filters" onClick={() => handleFilterToggle("isFilterPretOpen")}>
                    Preț
                    {isFilterPretOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`top-filters-pret-subfilters ${isFilterPretOpen ? "open" : ""}`}>
                    </div>
                    
                <div className="top-filters-producator filters" onClick={() => handleFilterToggle("isFilterProducatorOpen")}>
                    Producător
                    {isFilterProducatorOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${isFilterProducatorOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleCategory("company", "Apple")} 
                                className={selectedFilters.company === "Apple" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Apple
                        </div>
                        <div    onClick={() => toggleCategory("company", "Samsung")} 
                                className={selectedFilters.company === "Samsung" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Samsung
                        </div>
                        <div    onClick={() => toggleCategory("company", "Oppo")} 
                                className={selectedFilters.company === "Oppo" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Oppo
                        </div>
                        <div    onClick={() => toggleCategory("company", "Xiaomi")} 
                                className={selectedFilters.company === "Xiaomi" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Xiaomi
                        </div>
                        <div    onClick={() => toggleCategory("company", "OnePlus")} 
                                className={selectedFilters.company === "OnePlus" ? "selected-subfilter" : "unselected-subfilter"}>
                                    OnePlus
                        </div>
                    </div> 


                <div className="top-filters-culoare filters" onClick={() => handleFilterToggle("isFilterCuloareOpen")}>
                    Culoare
                    {isFilterCuloareOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${isFilterCuloareOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleCategory("color", "black")} 
                                className={selectedFilters.color === "black" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Black
                        </div>
                        <div    onClick={() => toggleCategory("color", "gray")} 
                                className={selectedFilters.color === "gray" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Gray
                        </div>
                        <div    onClick={() => toggleCategory("color", "blue")} 
                                className={selectedFilters.color === "blue" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Blue
                        </div>
                        <div    onClick={() => toggleCategory("color", "white")} 
                                className={selectedFilters.color === "white" ? "selected-subfilter" : "unselected-subfilter"}>
                                    White
                        </div>
                    </div>

                <div className="top-filters-memorie filters" onClick={() => handleFilterToggle("isFilterMemorieOpen")}>
                    Memorie internă (GB)
                    {isFilterMemorieOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${isFilterMemorieOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleCategory("memory", "125GB")} 
                                className={selectedFilters.memory === "125GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    125GB
                        </div>
                        <div    onClick={() => toggleCategory("memory", "256GB")} 
                                className={selectedFilters.memory === "256GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    256GB
                        </div>
                        <div    onClick={() => toggleCategory("memory", "512GB")} 
                                className={selectedFilters.memory === "512GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    512GB
                        </div>
                        <div    onClick={() => toggleCategory("memory", "1TB")} 
                                className={selectedFilters.memory === "1TB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    1TB
                        </div>
                    </div>

                <div className="top-filters-ram filters" onClick={() => handleFilterToggle("isFilterRamOpen")}>
                     Memorie RAM (GB)
                    {isFilterRamOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${isFilterRamOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleCategory("ram", "6GB")} 
                                className={selectedFilters.ram === "6GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    6GB
                        </div>
                        <div    onClick={() => toggleCategory("ram", "8GB")} 
                                className={selectedFilters.ram === "8GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    8GB
                        </div>
                        <div    onClick={() => toggleCategory("ram", "12GB")} 
                                className={selectedFilters.ram === "12GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    12GB
                        </div>
                    </div>

            </div>
            <div className="filter-list-buttons">
              <button>ANULARE FILTRE</button>
              <button onClick={() => setIsFilterOpen(false)}>ÎNCHIDE</button>
            </div>
          </div>
        </div>
        <div className="phone-list">{phoneElements}</div>
      </div>
    </div> 

  );
}
