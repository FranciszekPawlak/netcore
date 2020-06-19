import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/store/rootStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { activityStore } = rootStore;
  const { loadActivities, loadingInitial } = activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;
  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList></ActivityList>
        </Grid.Column>
        <h2>Activity filters</h2>
      </Grid>
    </>
  );
};
export default observer(ActivityDashboard);
