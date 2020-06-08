import React from "react";
import { IDataItem } from "./types/types";
interface IProps {
  item: IDataItem;
}
export const DataItem: React.FC<IProps> = (props) => {
  return (
    <>
      <h1>{props.item.name}</h1>
    </>
  );
};
