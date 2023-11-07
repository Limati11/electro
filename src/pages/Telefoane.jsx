import React, { useState, useEffect } from "react";
import { Link, useSearchParams} from "react-router-dom";
import "./telefoane.scss";
import { getPhones } from "/src/components/api.js";
//  Icons
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

export default function Telefoane() {
    const [phones, setPhones] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtersChanged, setFiltersChanged] = useState(false);


    // Filter state variables
    const filterStates = {
        isFilterOpen: false,
        isFilterSortareOpen: false,
        isFilterPretOpen: false,
        isFilterCategoriiOpen: false,
        isFilterProducatorOpen: false,
        isFilterModelOpen: false,
        isFilterCuloareOpen: false,
        isFilterMemorieOpen: false,
        isFilterRamOpen: false,
    };

    // Combine the filter states into a single state object
    const [filterOpenStates, setFilterOpenStates] = useState(filterStates);


    useEffect(() => {
        // Fetch phone data when the component mounts
        async function loadPhones() {
          try {
            const data = await getPhones();
            setPhones(data);
            setLoading(false); // Set loading to false after data is loaded
          } catch (err) {
            setError(err);
          }
        }
    
        loadPhones();
    }, []);

    

     // Define a function to toggle filter open state
    const toggleFilterOpen = (filterName) => {
        setFilterOpenStates((prevOpenStates) => ({
        ...prevOpenStates,
        [filterName]: !prevOpenStates[filterName],
        }));
    };

    const toggleFilter = (category, value) => {
        setSearchParams((prevParams) => {
          const updatedParams = new URLSearchParams(prevParams);
      
          // Check if the filter is already selected, and if so, remove it
          if (selectedFilters[category] === value) {
            delete selectedFilters[category];
            updatedParams.delete(category);
          } else {
            // Add the filter
            selectedFilters[category] = value;
            updatedParams.set(category, value);
          }
      
          // Set filtersChanged to true
          setFiltersChanged(true);
      
          // Update selected filters state
          setSelectedFilters({ ...selectedFilters });
      
          return updatedParams;
        });
      };

      useEffect(() => {
        // Reset filtersChanged state after a brief delay
        const resetFiltersChanged = setTimeout(() => {
          setFiltersChanged(false);
        }, 1000); // Adjust the delay time as needed
    
        return () => {
          // Clear the timeout if the component unmounts
          clearTimeout(resetFiltersChanged);
        };
      }, [filtersChanged]);
      
      


    const priceFilter = parseFloat(searchParams.get("price"));
    const companyFilter = searchParams.get("company");
    const nameFilter = searchParams.get("name");
    const modelFilter = searchParams.get("model");
    const colorFilter = searchParams.get("color");
    const memoryFilter = searchParams.get("memory");
    const ramFilter = searchParams.get("ram");

    const filteredPhones = phones.filter((phone) => {
        if (companyFilter && phone.company.toLowerCase() !== companyFilter.toLowerCase()) {
          return false; 
        }
      
        if (colorFilter && phone.color.toLowerCase() !== colorFilter.toLowerCase()) {
          return false; 
        }
      
        if (!isNaN(priceFilter) && phone.price > priceFilter) {
          return false; 
        }
      
        if (nameFilter && !phone.name.toLowerCase().includes(nameFilter.toLowerCase())) {
          return false; 
        }
      
        if (modelFilter && !phone.model.toLowerCase().includes(modelFilter.toLowerCase())) {
          return false; 
        }
      
        if (memoryFilter && phone.memory.toLowerCase() !== memoryFilter.toLowerCase()) {
          return false; 
        }
      
        if (ramFilter && phone.ram.toLowerCase() !== ramFilter.toLowerCase()) {
          return false; 
        }
      
        return true; // The phone matches all applied filters
      });
      


  const phoneElements = filteredPhones.map((phone) => (
    <div key={phone.id} className="phone-title">
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
      </Link>
    </div>
  ));


  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }


  return (
    <div className="container">
      <div className="phones-container" >
        <div className="filter-container">
          <div className="filter-top" onClick={() => toggleFilterOpen("isFilterOpen")}>
            <p>Filtre</p>
            {filterOpenStates.isFilterOpen ? (
              <IoChevronUp className="chevron-up" />
            ) : (
              <IoChevronDown className="chevron-down" />
            )}
          </div>
          <div className="filter-bottom" onClick={() => toggleFilterOpen("isFilterSortareOpen")}>
            <div>
              <p>Sortare</p>
              {filterOpenStates.isFilterSortareOpen ? (
                <HiMiniChevronUp className="chevrontwo-up" />
              ) : (
                <HiMiniChevronDown className="chevrontwo-down" />
              )}
            </div>
          </div>
          <div className={`filter-top-filters-container ${filterOpenStates.isFilterOpen ? "open" : ""} ${filtersChanged ? "blink-animation" : ""} `}>
            <div className="filter-top-filters">

                <div className="top-filters-pret filters" onClick={() => toggleFilterOpen("isFilterPretOpen")}>
                    Preț
                    {filterOpenStates.isFilterPretOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`top-filters-pret-subfilters ${filterOpenStates.isFilterPretOpen ? "open" : ""}`}>
                    </div>
                    
                <div className="top-filters-producator filters" onClick={() => toggleFilterOpen("isFilterProducatorOpen")}>
                    Producător
                    {filterOpenStates.isFilterProducatorOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterProducatorOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleFilter("company", "Apple")} 
                                className={selectedFilters.company === "Apple" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Apple
                                    
                        </div>
                        <div    onClick={() => toggleFilter("company", "Samsung")} 
                                className={selectedFilters.company === "Samsung" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Samsung
                        </div>
                        <div    onClick={() => toggleFilter("company", "Oppo")} 
                                className={selectedFilters.company === "Oppo" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Oppo
                        </div>
                        <div    onClick={() => toggleFilter("company", "Xiaomi")} 
                                className={selectedFilters.company === "Xiaomi" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Xiaomi
                        </div>
                        <div    onClick={() => toggleFilter("company", "OnePlus")} 
                                className={selectedFilters.company === "OnePlus" ? "selected-subfilter" : "unselected-subfilter"}>
                                    OnePlus
                        </div>
                    </div> 


                <div className="top-filters-culoare filters" onClick={() => toggleFilterOpen("isFilterCuloareOpen")}>
                    Culoare
                    {filterOpenStates.isFilterCuloareOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterCuloareOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleFilter("color", "black")} 
                                className={selectedFilters.color === "black" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Black
                        </div>
                        <div    onClick={() => toggleFilter("color", "gray")} 
                                className={selectedFilters.color === "gray" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Gray
                        </div>
                        <div    onClick={() => toggleFilter("color", "blue")} 
                                className={selectedFilters.color === "blue" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Blue
                        </div>
                        <div    onClick={() => toggleFilter("color", "white")} 
                                className={selectedFilters.color === "white" ? "selected-subfilter" : "unselected-subfilter"}>
                                    White
                        </div>
                    </div>

                <div className="top-filters-memorie filters" onClick={() => toggleFilterOpen("isFilterMemorieOpen")}>
                    Memorie internă (GB)
                    {filterOpenStates.isFilterMemorieOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterMemorieOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleFilter("memory", "125GB")} 
                                className={selectedFilters.memory === "125GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    125GB
                        </div>
                        <div    onClick={() => toggleFilter("memory", "256GB")} 
                                className={selectedFilters.memory === "256GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    256GB
                        </div>
                        <div    onClick={() => toggleFilter("memory", "512GB")} 
                                className={selectedFilters.memory === "512GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    512GB
                        </div>
                        <div    onClick={() => toggleFilter("memory", "1TB")} 
                                className={selectedFilters.memory === "1TB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    1TB
                        </div>
                    </div>

                <div className="top-filters-ram filters" onClick={() => toggleFilterOpen("isFilterRamOpen")}>
                     Memorie RAM (GB)
                    {filterOpenStates.isFilterRamOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterRamOpen ? "open" : ""}`}>
                        <div    onClick={() => toggleFilter("ram", "6GB")} 
                                className={selectedFilters.ram === "6GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    6GB
                        </div>
                        <div    onClick={() => toggleFilter("ram", "8GB")} 
                                className={selectedFilters.ram === "8GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    8GB
                        </div>
                        <div    onClick={() => toggleFilter("ram", "12GB")} 
                                className={selectedFilters.ram === "12GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    12GB
                        </div>
                    </div>

            </div>
            <div className="filter-list-buttons">
              <button>ANULARE FILTRE</button>
              <button onClick={() => toggleFilterOpen("isFilterOpen")}>ÎNCHIDE</button>

            </div>
          </div>
        </div>
        <div className="phone-list">{phoneElements}</div>
      </div>
    </div> 

  );
}
