import React from "react";

const TableRow = ({ data }) => {
    return (
        <tr>
            {data.map((item) => {
                return (
                    <td className="px-6 py-4" key={item}>
                        {item}
                    </td>);
            })}
        </tr>
    );
};

export default TableRow;