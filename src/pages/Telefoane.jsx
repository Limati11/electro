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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtersChanged, setFiltersChanged] = useState(false); // 

    // Filters state
    const [selectedFilters, setSelectedFilters] = useState({
        minPrice: "",
        maxPrice: "",
        company: "",
        name: "",
        model: "",
        color: "",
        memory: "",
        ram: "",
    });

    // Subfilters Open states
    const [filterOpenStates, setFilterOpenStates] = useState({
        isFilterOpen: false,
        isFilterSortareOpen: false,
        isFilterPretOpen: true,
        isFilterProducatorOpen: false,
        isFilterModelOpen: false,
        isFilterCuloareOpen: false,
        isFilterMemorieOpen: false,
        isFilterRamOpen: false,
    });

    // Sorting state
    const [sortCriteria, setSortCriteria] = useState("name"); // Default sort criteria
    const [sortOrder, setSortOrder] = useState("asc"); // Default sort order


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
    
    const isPriceFilter = () => {
        return sortCriteria === "price" || selectedFilters.minPrice !== "" || selectedFilters.maxPrice !== "";
    };
    


    // Subfilters Open state
    const toggleFilterOpen = (filterName) => {
        setFilterOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [filterName]: !prevOpenStates[filterName],
        }));
        };

    
    // Handle filter changes
    const handleFilterChange = (key, value) => {
        const updatedValue = selectedFilters[key] === value ? '' : value;
    
        setSelectedFilters({
            ...selectedFilters,
            [key]: updatedValue,
        });
        setFiltersChanged(true);
    };
    

    // Reset all filters
    const resetFilters = () => {
        setSelectedFilters({
        minPrice: "",
        maxPrice: "",
        company: "",
        name: "",
        model: "",
        color: "",
        memory: "",
        ram: "",
        });
        setSearchParams(new URLSearchParams());
        setFiltersChanged(true);
    };

      // Function to filter phones based on selected criteria
    const filterPhone = (phone) => {
        const {
          minPrice,
          maxPrice,
          company,
          name,
          model,
          color,
          memory,
          ram,
        } = selectedFilters;
    
        return (
          (minPrice === "" || phone.price >= parseFloat(minPrice)) &&
          (maxPrice === "" || phone.price <= parseFloat(maxPrice)) &&
          (!company || phone.company.toLowerCase() === company.toLowerCase()) &&
          (!name || phone.name.toLowerCase().includes(name.toLowerCase())) &&
          (!model || phone.model.toLowerCase().includes(model.toLowerCase())) &&
          (!color || phone.color.toLowerCase() === color.toLowerCase()) &&
          (!memory || phone.memory.toLowerCase() === memory.toLowerCase()) &&
          (!ram || phone.ram.toLowerCase() === ram.toLowerCase())
        );
    };

    const filteredPhones = phones.filter(filterPhone);

    // Function to sort the phones based on the selected criteria and order
    const sortPhones = (a, b) => {
        if (sortCriteria === "name") {
        return sortOrder === "asc"
            ? a.company.localeCompare(b.company)
            : b.company.localeCompare(a.company);
        } else if (sortCriteria === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        }
        // Add more criteria as needed

        return 0;
    };

    // Function to handle sorting criteria change
    const handleSortChange = (criteria) => {
        if (criteria === "default") {
            // Reset sorting to default criteria and order
            setSortCriteria("name");
            setSortOrder("asc");
        } else if (criteria === sortCriteria) {
            // Toggle the sort order if the same criteria is selected
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Change the sorting criteria and set the default order to ascending
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
        setFiltersChanged(true);
    };
    

    const sortedPhones = [...filteredPhones].sort(sortPhones);
  

    const phoneElements = sortedPhones.map((phone) => (
    <div key={phone.id} className="phone-title">
        <Link to={`/phones/${phone.id}`}
            state={{
            search: `?${searchParams.toString()}`,
            type: selectedFilters // What Data should be passed to link direction?
            }}
        >
        <div className="phone-info">
            <img src={phone.imageUrl} />
            <h3>{phone.company} {phone.name} {phone.model}</h3>
            <h4>{phone.memory}/{phone.ram} GB</h4>
            <p>{phone.price}<span> mdl</span></p>
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


                <div className="filter-bottom filters" onClick={() => toggleFilterOpen("isFilterSortareOpen")}>
                    <div className="filter-bottom-inner">
                        <p>Sortare</p>
                        {filterOpenStates.isFilterSortareOpen ? (<HiMiniChevronUp className="sortare-chevs"/>) : (<HiMiniChevronDown className="sortare-chevs"/>)}
                    </div>
                </div>
                    <div className={`subfilters-sortare ${filterOpenStates.isFilterSortareOpen ? "open" : ""} ${filtersChanged ? "blink-animation" : ""} `}>
                            <div onClick={() => handleSortChange("name")}>
                                Nume {sortCriteria === "name" && sortOrder === "asc" && "↑"}
                                {sortCriteria === "name" && sortOrder === "desc" && "↓"}
                            </div>
                            <div onClick={() => handleSortChange("price")}>
                                Preț {sortCriteria === "price" && sortOrder === "asc" && "↑"}
                                {sortCriteria === "price" && sortOrder === "desc" && "↓"}
                            </div>
                            <div onClick={() => handleSortChange("default")}>
                                Resetare
                            </div>
                    </div>
                

          <div className={`filter-top-filters-container ${filterOpenStates.isFilterOpen ? "open" : ""} ${filtersChanged && !isPriceFilter() ? "blink-animation" : ""} `}>
                <div className="filter-top-filters">

                    <div className="top-filters-pret filters" onClick={() => toggleFilterOpen("isFilterPretOpen")}>
                        <h4>Preț</h4>
                        {filterOpenStates.isFilterPretOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                    </div>
                        <div className={`subfilters ${filterOpenStates.isFilterPretOpen ? "open" : ""}`}>
                            <div className="sortare-pret-inner">
                                <label>Preț minim:</label>
                                <input
                                type="number"
                                value={selectedFilters.minPrice || ""}
                                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                                />
                            </div>
                            <div className="sortare-pret-inner second">
                                <label>Preț maxim:</label>
                                <input
                                type="number"
                                value={selectedFilters.maxPrice || ""}
                                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                                />
                            </div>
                        </div>



                    <div className="top-filters-producator filters" onClick={() => toggleFilterOpen("isFilterProducatorOpen")}>
                        <h4>Producător</h4>
                        {filterOpenStates.isFilterProducatorOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                    </div>
                        <div className={`subfilters ${filterOpenStates.isFilterProducatorOpen ? "open" : ""}`}>
                            <div    onClick={() => handleFilterChange("company", "Apple")} 
                                    className={selectedFilters.company === "Apple" ? "selected-subfilter" : "unselected-subfilter"}>
                                        Apple
                                        
                            </div>
                            <div    onClick={() => handleFilterChange("company", "Samsung")} 
                                    className={selectedFilters.company === "Samsung" ? "selected-subfilter" : "unselected-subfilter"}>
                                        Samsung
                            </div>
                            <div    onClick={() => handleFilterChange("company", "Oppo")} 
                                    className={selectedFilters.company === "Oppo" ? "selected-subfilter" : "unselected-subfilter"}>
                                        Oppo
                            </div>
                            <div    onClick={() => handleFilterChange("company", "Xiaomi")} 
                                    className={selectedFilters.company === "Xiaomi" ? "selected-subfilter" : "unselected-subfilter"}>
                                        Xiaomi
                            </div>
                            <div    onClick={() => handleFilterChange("company", "OnePlus")} 
                                    className={selectedFilters.company === "OnePlus" ? "selected-subfilter" : "unselected-subfilter"}>
                                        OnePlus
                            </div>
                        </div> 


                <div className="top-filters-culoare filters" onClick={() => toggleFilterOpen("isFilterCuloareOpen")}>
                    <h4>Culoare</h4>
                    {filterOpenStates.isFilterCuloareOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterCuloareOpen ? "open" : ""}`}>
                        <div    onClick={() => handleFilterChange("color", "black")} 
                                className={selectedFilters.color === "black" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Black
                        </div>
                        <div    onClick={() => handleFilterChange("color", "gray")} 
                                className={selectedFilters.color === "gray" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Gray
                        </div>
                        <div    onClick={() => handleFilterChange("color", "blue")} 
                                className={selectedFilters.color === "blue" ? "selected-subfilter" : "unselected-subfilter"}>
                                    Blue
                        </div>
                        <div    onClick={() => handleFilterChange("color", "white")} 
                                className={selectedFilters.color === "white" ? "selected-subfilter" : "unselected-subfilter"}>
                                    White
                        </div>
                    </div>

                <div className="top-filters-memorie filters" onClick={() => toggleFilterOpen("isFilterMemorieOpen")}>
                    <h4>Memorie internă (GB)</h4>
                    {filterOpenStates.isFilterMemorieOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterMemorieOpen ? "open" : ""}`}>
                        <div    onClick={() => handleFilterChange("memory", "125GB")} 
                                className={selectedFilters.memory === "125GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    125GB
                        </div>
                        <div    onClick={() => handleFilterChange("memory", "256GB")} 
                                className={selectedFilters.memory === "256GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    256GB
                        </div>
                        <div    onClick={() => handleFilterChange("memory", "512GB")} 
                                className={selectedFilters.memory === "512GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    512GB
                        </div>
                        <div    onClick={() => handleFilterChange("memory", "1TB")} 
                                className={selectedFilters.memory === "1TB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    1TB
                        </div>
                    </div>

                <div className="top-filters-ram filters" onClick={() => toggleFilterOpen("isFilterRamOpen")}>
                     <h4>Memorie RAM (GB)</h4>
                    {filterOpenStates.isFilterRamOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                </div>
                    <div className={`subfilters ${filterOpenStates.isFilterRamOpen ? "open" : ""}`}>
                        <div    onClick={() => handleFilterChange("ram", "6GB")} 
                                className={selectedFilters.ram === "6GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    6GB
                        </div>
                        <div    onClick={() => handleFilterChange("ram", "8GB")} 
                                className={selectedFilters.ram === "8GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    8GB
                        </div>
                        <div    onClick={() => handleFilterChange("ram", "12GB")} 
                                className={selectedFilters.ram === "12GB" ? "selected-subfilter" : "unselected-subfilter"}>
                                    12GB
                        </div>
                    </div>

            </div>
            <div className="filter-list-buttons">
              <button onClick={resetFilters} >ANULARE FILTRE</button>
              <button onClick={() => setFilterOpenStates("isFilterOpen")}>ÎNCHIDE</button>

            </div>
          </div>
        </div>
        <div className="phone-list">{phoneElements}</div>
      </div>
    </div> 

  );
}
