import { createContext, SyntheticEvent } from "react";
import { observable, action, computed, configure, runInAction } from "mobx";
import { IActivity } from "../models/activity";
import { Activities } from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable loadingInitial: boolean = false;
  @observable activity: IActivity | null = null;
  @observable submitting: boolean = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
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
      console.log(err);
    }
  };
  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (err) {
        runInAction("get activity error", () => {
          this.loadingInitial = false;
        });
        console.error(err);
      }
    }
  };
  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => this.activityRegistry.get(id);

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await Activities.update(activity);
      runInAction("edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
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
}

export const activityContext = createContext(new ActivityStore());
