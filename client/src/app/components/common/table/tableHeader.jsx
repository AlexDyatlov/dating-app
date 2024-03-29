import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
        icon: selectedSort.icon === 'up' ? 'down' : 'up'
      });
    } else {
      onSort({
        path: item,
        order: 'asc',
        icon: 'up'
      });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            scope="col"
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            key={column}
          >
            {columns[column].name}
            {selectedSort.path === columns[column].path
              ? <i className={`bi bi-caret-${selectedSort.icon}-fill`}></i>
              : null
            }
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
