import React from 'react';

const EmptySearchResults = ({searchText}) => {
  return <p>No hay resultados para {searchText} </p>;
};

export {EmptySearchResults};