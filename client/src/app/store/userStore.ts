import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import { User } from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (err) {
      throw err;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (err) {
      throw err;
    }
  };

  @action getUser = async () => {
    try {
      const user = await User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (err) {
      console.error(err);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
