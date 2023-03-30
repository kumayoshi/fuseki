import React from "react";
import FilterDate from "./FilterDate";
import FilterCategory from "./FilterCategory";

const Filter = ({
  categoryList,
  filterCategoryChanged,
  modalType,
  filterYearChanged,
  filterYearLabel,
  filterMonthChanged,
  filterClose,
  filterDateArray,
  filterYear,
  filterMonth,
}) => {
  if (modalType === "category") {
    return (
      <FilterCategory
        categoryList={categoryList}
        filterCategoryChanged={filterCategoryChanged}
        filterClose={filterClose}
      />
    );
  } else if (modalType === "date") {
    return (
      <FilterDate
        filterYearChanged={filterYearChanged}
        filterYearLabel={filterYearLabel}
        filterMonthChanged={filterMonthChanged}
        filterClose={filterClose}
        filterDateArray={filterDateArray}
        filterYear={filterYear}
        filterMonth={filterMonth}
      />
    );
  }
};

export default Filter;
