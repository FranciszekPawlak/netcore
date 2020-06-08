import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/App.css";
import { DataItem } from "./DataItem";
import { Header, Icon, List } from "semantic-ui-react";
import { IDataItem } from "./types/types";

interface IData {
  id: number;
  name: string;
}

export const App: React.FC = () => {
  const [data, setData] = useState<[IData] | undefined>();

  const getData = async () => {
    const data = await axios.get("http://localhost:5000/api/values");
    setData(data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {data
          ? data.map((item: IDataItem) => (
              <List.Item key={item.id}>{item.name}</List.Item>
            ))
          : null}
      </List>
      <ul>
        {data
          ? data.map((item: IDataItem) => (
              <DataItem key={item.id} item={item} />
            ))
          : null}
      </ul>
    </div>
  );
};
