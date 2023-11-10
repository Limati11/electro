import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
//  Style & Icons
import "./ProductListing.scss";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";


export default function ProductListing({
        category,
        fetchData,
        filterOptions,
        filterConfig,
        sortConfig,
        companyOptions,
        colorOptions,
        memoryOptions,
        ramOptions,
        categoryOptions,
}) 
{

    ProductListing.propTypes = {
        category: PropTypes.string.isRequired,
        fetchData: PropTypes.func.isRequired,
        filterOptions: PropTypes.object.isRequired,
        filterConfig: PropTypes.object.isRequired,
        sortConfig: PropTypes.object.isRequired,
        companyOptions: PropTypes.array.isRequired,
        colorOptions: PropTypes.array.isRequired,
        memoryOptions: PropTypes.array.isRequired,
        ramOptions: PropTypes.array.isRequired,
        categoryOptions: PropTypes.array.isRequired,
      };
      
    const [products, setProducts] = useState([]); // Store the products
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtersChanged, setFiltersChanged] = useState(false);

    // Costumize filters based on category
    const [selectedFilters, setSelectedFilters] = useState({
        ...filterOptions,
        });

    const [filterOpenStates, setFilterOpenStates] = useState({
        isFilterOpen: false,
        ...filterConfig,
        isFilterSortareOpen: false,
        isFilterPretOpen: true,
        });

    const [sortCriteria, setSortCriteria] = useState(sortConfig.criteria);
    const [sortOrder, setSortOrder] = useState(sortConfig.order);
        

    // Pass fetchData as prop
    useEffect(() => {
        async function loadProducts() {
            try {
            const data = await fetchData();
            setProducts(data);
            setLoading(false);
            } catch (err) {
            setError(err);
            }
        }
        
        loadProducts();
    }, [fetchData]);
          

    useEffect(() => {
        const resetFiltersChanged = setTimeout(() => {
            setFiltersChanged(false);
        }, 1000);

        return () => {
            clearTimeout(resetFiltersChanged);
        };
    }, [filtersChanged]);

    
    const isPriceFilter = () => {
        return (
            sortCriteria === "price" ||
            selectedFilters.minPrice !== "" ||
            selectedFilters.maxPrice !== ""
        );
    };

    const toggleFilterOpen = (filterName) => {
        setFilterOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [filterName]: !prevOpenStates[filterName],
        }));
    };

    const handleFilterChange = (key, value) => {
        const updatedValue = selectedFilters[key] === value ? "" : value;
    
        setSelectedFilters({
            ...selectedFilters,
            [key]: updatedValue,
        });
        setFiltersChanged(true);
    };

    const resetFilters = () => {
        setSelectedFilters(filterOptions);
        setSearchParams(new URLSearchParams());
        setFiltersChanged(true);
        // setFilterOpenStates((prevOpenStates) => ({
        //     ...prevOpenStates,
        //     isFilterOpen: false, // Set isFilterOpen to false
        // }));
    };


    const filterProduct = (product) => {
        const {
            minPrice,
            maxPrice,
            category,
            company,
            name,
            model,
            color,
            memory,
            ram,
        } = selectedFilters;
    
        return (
            (minPrice === "" || product.price >= parseFloat(minPrice)) &&
            (maxPrice === "" || product.price <= parseFloat(maxPrice)) &&
            (!category || product.category.toLowerCase() === category.toLowerCase()) &&
            (!company || product.company.toLowerCase() === company.toLowerCase()) &&
            (!name || product.name.toLowerCase().includes(name.toLowerCase())) &&
            (!model || product.model.toLowerCase().includes(model.toLowerCase())) &&
            (!color || product.color.toLowerCase() === color.toLowerCase()) &&
            (!memory || product.memory.toLowerCase() === memory.toLowerCase()) &&
            (!ram || product.ram.toLowerCase() === ram.toLowerCase())
        );
    };

    const filteredProducts = products.filter(filterProduct);

    const sortProducts = (a, b) => {
        if (sortCriteria === "name") {
        return sortOrder === "asc"
            ? a.company.localeCompare(b.company)
            : b.company.localeCompare(a.company);
        } else if (sortCriteria === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        }

        return 0;
    };

    const handleSortChange = (criteria) => {
        if (criteria === "default") {
            setSortCriteria("name");
            setSortOrder("asc");
        } else if (criteria === sortCriteria) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortCriteria(criteria);
            setSortOrder("asc");
        }
        setFiltersChanged(true);
        };

    const sortedProducts = [...filteredProducts].sort(sortProducts);

    const productElements = sortedProducts.map((product) => (
        <div key={product.id} className="product-content">
            <Link
                to={`/${category}/${product.id}`}
                state={{
                search: `?${searchParams.toString()}`,
                type: selectedFilters,
                }}
            >
                <div className="product-info">
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>
                        {product.company} {product.name} {product.model}
                    </h3>
                    <h4>
                        {product.memory}/{product.ram} GB
                    </h4>
                    <p>
                        {product.price}
                        <span> mdl</span>
                    </p>
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
            <div className="page-content" >

                
                <div className="filter-container">
                    {/* FILTER CLOSED */}
                    <div className="filter-top" onClick={() => toggleFilterOpen("isFilterOpen")}>
                        <p>Filtre</p>
                            {filterOpenStates.isFilterOpen ? (
                            <IoChevronUp className="chevron-up" />
                            ) : (
                            <IoChevronDown className="chevron-down" />
                            )}
                    </div>
                    {/* SORTARE CLOSED */}
                    <div className="filter-bottom filters" 
                        onClick={() => toggleFilterOpen("isFilterSortareOpen")}>
                        <div className="filter-bottom-inner">
                            <p>Sortare</p>
                            {filterOpenStates.isFilterSortareOpen 
                            ? (<HiMiniChevronUp className="sortare-chevs"/>) 
                            : (<HiMiniChevronDown className="sortare-chevs"/>)}
                        </div>
                    </div>
                        {/* SORTARE OPENNED */}
                        <div className={`subfilters-sortare 
                            ${filterOpenStates.isFilterSortareOpen ? "open" : ""} 
                            ${filtersChanged ? "blink-animation" : ""} `}>
                            <div onClick={() => handleSortChange("name")}>
                                Nume {sortCriteria === "name" && sortOrder === "asc" && "↑"}
                                {sortCriteria === "name" && sortOrder === "desc" && "↓"}
                            </div>
                            <div onClick={() => handleSortChange("price")}>
                                <p>Preț</p> {sortCriteria === "price" && sortOrder === "asc" && "↑"}
                                {sortCriteria === "price" && sortOrder === "desc" && "↓"}
                            </div>
                            <div onClick={() => handleSortChange("default")}>
                                Resetare
                            </div>
                        </div>
                    
                        {/* FILTER OPENNED */}
                        <div className={`filter-top-filters-container 
                            ${filterOpenStates.isFilterOpen ? "open" : ""} 
                            ${filtersChanged && !isPriceFilter() ? "blink-animation" : ""} `}>
                            <div className="filter-top-filters">
                                {/* FILTER PRET */}
                                <div className="top-filters-pret filters" 
                                    onClick={() => toggleFilterOpen("isFilterPretOpen")}>
                                    <h4>Preț</h4>
                                    {filterOpenStates.isFilterPretOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                                </div>
                                    <div className={`subfilters ${filterOpenStates.isFilterPretOpen ? "open" : ""}`}>
                                        <div className="sortare-pret-inner">
                                            <label><p>Preț minim:</p></label>
                                            <input
                                            type="number"
                                            value={selectedFilters.minPrice || ""}
                                            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                                            />
                                        </div>
                                        <div className="sortare-pret-inner second">
                                            <label><p>Preț maxim:</p></label>
                                            <input
                                            type="number"
                                            value={selectedFilters.maxPrice || ""}
                                            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                {/* FILTER CATEGORY */}
                                {categoryOptions && (
                                    <>
                                    <div className="top-filters-category filters" 
                                        onClick={() => toggleFilterOpen("isFilterCategoryOpen")}>
                                        <h4>Categorii</h4>
                                        {filterOpenStates.isFilterCategoryOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                                    </div>
                                        <div className={`subfilters ${filterOpenStates.isFilterCategoryOpen ? "open" : ""}`}>
                                            {categoryOptions.map((category) => (
                                                <div
                                                    key={category}
                                                    onClick={() => handleFilterChange("company", category)}
                                                    className={selectedFilters.category === category 
                                                            ? "selected-subfilter" : "unselected-subfilter"}
                                                >
                                                    <p>{category}</p>
                                                </div>
                                            ))}
                                        </div> 
                                    </>
                                )}

                                {/* FILTER PRODUCATOR */}
                                <div className="top-filters-producator filters" 
                                    onClick={() => toggleFilterOpen("isFilterProducatorOpen")}>
                                    <h4>Producător</h4>
                                    {filterOpenStates.isFilterProducatorOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                                </div>
                                    <div className={`subfilters ${filterOpenStates.isFilterProducatorOpen ? "open" : ""}`}>
                                        {companyOptions.map((company) => (
                                            <div
                                                key={company}
                                                onClick={() => handleFilterChange("company", company)}
                                                className={selectedFilters.company === company 
                                                        ? "selected-subfilter" : "unselected-subfilter"}
                                            >
                                                <p>{company}</p>
                                            </div>
                                        ))}
                                    </div> 
                                {/* FILTER CULOARE */}
                                <div className="top-filters-culoare filters" onClick={() => toggleFilterOpen("isFilterCuloareOpen")}>
                                    <h4>Culoare</h4>
                                    {filterOpenStates.isFilterCuloareOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                                </div>
                                    <div className={`subfilters ${filterOpenStates.isFilterCuloareOpen ? "open" : ""}`}>
                                        {colorOptions.map((color) => (
                                            <div
                                                key={color}
                                                onClick={() => handleFilterChange("company", color)}
                                                className={selectedFilters.color === color ? "selected-subfilter" : "unselected-subfilter"}
                                            >
                                                <p>{color}</p>
                                            </div>
                                        ))}
                                    </div>
                                {/* FILTER MEMORIE */}
                                <div className="top-filters-memorie filters" onClick={() => toggleFilterOpen("isFilterMemorieOpen")}>
                                    <h4>Memorie internă (GB)</h4>
                                    {filterOpenStates.isFilterMemorieOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                                </div>
                                    <div className={`subfilters ${filterOpenStates.isFilterMemorieOpen ? "open" : ""}`}>
                                        {memoryOptions.map((memory) => (
                                            <div
                                                key={memory}
                                                onClick={() => handleFilterChange("company", memory)}
                                                className={selectedFilters.memory === memory ? "selected-subfilter" : "unselected-subfilter"}
                                            >
                                                <p>{memory} GB</p>
                                            </div>
                                        ))}
                                    </div>
                                {/* FILTER RAM */}
                                <div className="top-filters-ram filters ram" onClick={() => toggleFilterOpen("isFilterRamOpen")}>
                                    <h4>Memorie RAM (GB)</h4>
                                    {filterOpenStates.isFilterRamOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
                                </div>
                                    <div className={`subfilters ${filterOpenStates.isFilterRamOpen ? "open" : ""}`}>
                                        {ramOptions.map((ram) => (
                                            <div
                                                key={ram}
                                                onClick={() => handleFilterChange("company", ram)}
                                                className={selectedFilters.ram === ram ? "selected-subfilter" : "unselected-subfilter"}
                                            >
                                                <p>{ram} GB</p>
                                            </div>
                                        ))}
                                    </div>
            
                        </div>

                        <div className="filter-list-buttons">
                            <button onClick={resetFilters} >ANULARE FILTRE</button>
                            <button onClick={() => setFilterOpenStates("isFilterOpen")}>ÎNCHIDE</button>
                        </div>
                    </div>
                
                </div>

                <div className="product-container">{productElements}</div>
            </div>
        </div> 
    )
}
