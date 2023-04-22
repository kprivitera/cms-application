import React from "react";
import TableRow from "./components/table-row";
import TableHeadItem from "./components/table-head-item";

const Table = ({ theadData, tbodyData }) => {
    return (
        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {theadData.map((h) => {
                                        return <TableHeadItem key={h} item={h} />;
                                    })}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tbodyData.map((item) => {
                                    return <TableRow key={item.id} data={item.items} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
