import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { activityContext } from "../../../app/store/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(activityContext);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity..."></LoadingComponent>;

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
          <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
          <ActivityDetailedChat></ActivityDetailedChat>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar></ActivityDetailedSidebar>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default observer(ActivityDetails);
