import React from "react";

const TableHeadItem = ({ item }) => {
    return (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" title={item}>
            {item}
        </th>
    );
};

export default TableHeadItem;