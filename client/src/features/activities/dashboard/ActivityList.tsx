import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/store/rootStore";
import ActivityListItem from "./ActivityListItem";
const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { activityStore } = rootStore;

  const { activitiesByDate } = activityStore;
  return (
    <>
      {activitiesByDate.map(([group, activites]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {activites.length > 0
              ? activites.map((activity) => (
                  <ActivityListItem key={activity.id} activity={activity} />
                ))
              : null}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};
export default observer(ActivityList);
