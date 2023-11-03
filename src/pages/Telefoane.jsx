import React, { useState } from "react";
import { Link, useSearchParams} from "react-router-dom";
import "./telefoane.scss";
import { getPhones } from "/src/components/api.js";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

export default function Telefoane() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phones, setPhones] = useState([]);
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

//   const typeFilter = searchParams.get("type");
  const priceFilter = parseFloat(searchParams.get("price"));
  const companyFilter = searchParams.get("company");
  const nameFilter = searchParams.get("name");
  const modelFilter = searchParams.get("model");
  const colorFilter = searchParams.get("color");
  const memoryFilter = searchParams.get("memorie");
  const ramFilter = searchParams.get("ram");


  const filteredPhones = phones.filter((phone) => {
    return (
    //   (!typeFilter || phone.company.toLowerCase() === typeFilter) &&
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
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(category);
      } else {
        prevParams.set(category, value);
      }
      return prevParams;
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
        <div className="phones-filter-container">
          <div className="filter-up" onClick={() => handleFilterToggle("isFilterOpen")}>
            <p>Filtre</p>
            {isFilterOpen ? (
              <IoChevronUp className="chevron-up" />
            ) : (
              <IoChevronDown className="chevron-down" />
            )}
          </div>
          <div className="filter-middle" onClick={() => handleFilterToggle("isFilterSortareOpen")}>
            <div>
              <p>Sortare</p>
              {isFilterSortareOpen ? (
                <HiMiniChevronUp className="chevrontwo-up" />
              ) : (
                <HiMiniChevronDown className="chevrontwo-down" />
              )}
            </div>
          </div>
          <div className={`filter-up-inner ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-up-inner-filterlist">
              <div className="ph-fl-pret" onClick={() => handleFilterToggle("isFilterPretOpen")}>
                Preț
                {isFilterPretOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
              </div>
              <div className="ph-up-fl-categorii" onClick={() => handleFilterToggle("isFilterCategoriiOpen")}>
                Categorii
                {isFilterCategoriiOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
              </div>
              <div className={`ph-up-fl-categorii-inner ${isFilterCategoriiOpen ? "open" : ""}`}>
                <div onClick={() => toggleCategory("company", "Apple")}>Apple</div>
                <div onClick={() => toggleCategory("company", "Samsung")}>Samsung</div>
                <div onClick={() => toggleCategory("company", "Oppo")}>Oppo</div>
                <div onClick={() => toggleCategory("company", "Xiaomi")}>Xiaomi</div>
                <div onClick={() => toggleCategory("company", "OnePlus")}>Xiaomi</div>
              </div> 
              <div className="ph-up-fl-producator" onClick={() => handleFilterToggle("isFilterProducatorOpen")}>
                Producător
                {isFilterProducatorOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
              </div>
              <div className="ph-up-fl-model" onClick={() => handleFilterToggle("isFilterModelOpen")}>
                Model
                {isFilterModelOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
              </div>
              <div className="ph-up-fl-culoare" onClick={() => handleFilterToggle("isFilterCuloareOpen")}>
                Culoare
                {isFilterCuloareOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
              </div>
              <div className="fe-memorie" onClick={() => handleFilterToggle("isFilterMemorieOpen")}>
                Memorie internă (GB)
                {isFilterMemorieOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
              </div>
              <div className="fe-ram" onClick={() => handleFilterToggle("isFilterRamOpen")}>
                Memorie RAM (GB)
                {isFilterRamOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
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
