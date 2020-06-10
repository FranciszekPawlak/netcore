import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import { activityContext } from "../store/activityStore";
import { observer } from "mobx-react-lite";

const App: React.FC = () => {
  const activityStore = useContext(activityContext);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </>
  );
};

export default observer(App);
