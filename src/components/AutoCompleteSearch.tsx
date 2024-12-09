import React, { useCallback, useEffect, useRef, useState } from "react";

interface AutoCompleteSearchProps {
  list: [];
  onSelect: (val: any) => void;
}

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("useDebounce callback called");
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const AutoCompleteSearch = ({
  list,
  onSelect,
}: AutoCompleteSearchProps) => {
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const debouncedValue = useDebounce(searchText);

  const filterList = (text: string) => {
    if (text) {
      const templist = list?.filter((value) =>
        value.name.toLowerCase().includes(text)
      );
      setFilteredList(templist);
    } else {
      setFilteredList([]);
    }
  };

  // const debounce = (cb, delay = 500) => {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       console.log("callback called");
  //       cb(...args);
  //     }, delay);
  //   };
  // };

  // const debouncedFilter = useCallback(debounce(filterList), [filterList]);

  // useEffect(() => {
  //   debounce(filterList, 1000)(searchText);
  // }, [searchText]);

  useEffect(() => {
    filterList(debouncedValue);
  }, [debouncedValue]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     filterList(searchText);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchText]);

  return (
    <div className="flex flex-col w-[300px] gap-y-2 mt-2">
      <input
        type="search"
        className="w-full h-12 border rounded-lg px-2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>
        {filteredList.length > 0 &&
          filteredList.map((value, index) => {
            return (
              <div
                onClick={() => {
                  onSelect(value);
                  setSearchText(value.name);
                }}
                key={index}
                className="my-2 hover:bg-blue-300/60 p-1"
              >
                <p>{value.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
