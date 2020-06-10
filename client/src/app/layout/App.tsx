import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { IActivity } from "../models/activity";
import { Activities } from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

export const App: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [target, setTarget] = useState<string>("");

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);

    Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    Activities.delete(id)
      .then(() => setActivities([...activities.filter((a) => a.id !== id)]))
      .then(() => setSubmitting(false));
  };

  const getData = async () => {
    const data = await Activities.list();
    let activitiesList: IActivity[] = [];
    data.forEach((activity: any) => {
      activity.date = activity.date.split(".")[0];
      activitiesList.push(activity);
    });
    setActivities(activitiesList);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <LoadingComponent content="Loading activities..." />;

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity!}
          selectActivity={handleSelectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        ></ActivityDashboard>
      </Container>
    </>
  );
};
