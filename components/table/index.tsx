import { TableBody } from '../../types';
import React from 'react';

type Props = {
  theadData: Array<string>;
  tbodyData: Array<TableBody>;
};

const Table = ({ theadData, tbodyData }: Props): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          {theadData.map((h) => {
            return (
              <th className="uppercase font-normal text-[13px] text-left border-[#434947] border-b px-12 py-4" key={h}>
                {h}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map(({ id, items }) => {
          return (
            <tr key={id}>
              {items.map((item) => (
                <td className="border-[#434947] text-[15px] border-b px-12 py-4" key={item}>
                  {item}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
