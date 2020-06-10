import { createContext, SyntheticEvent } from "react";
import { observable, action, computed, configure, runInAction } from "mobx";
import { IActivity } from "../models/activity";
import { Activities } from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial: boolean = false;
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable editMode: boolean = false;
  @observable submitting: boolean = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const data = await Activities.list();
      runInAction("loading activities", () => {
        data.forEach((activity: IActivity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (err) {
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
      console.error(err);
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await Activities.update(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      runInAction("error edit action", () => {
        this.submitting = false;
      });
      console.error(err);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await Activities.create(activity);
      runInAction("create activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      runInAction("error create activity", () => {
        this.submitting = false;
      });
      console.error(err);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await Activities.delete(id);
      runInAction("delete action", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (err) {
      runInAction("error delete activity", () => {
        this.submitting = false;
      });
      this.target = "";

      console.error(err);
    }
  };

  @action operCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export const activityContext = createContext(new ActivityStore());
