import React from 'react';

const SearchBar = ({ onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            onChange={onChange}
        />
    );
};

export default SearchBar;
