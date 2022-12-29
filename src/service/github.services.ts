import axios from "axios";
import { IRepo, IUser } from "../types/User.type";

interface IGetUserListParams {
  since: number;
  per_page: number;
}

class GithubService {
  private readonly baseUrl = "https://api.github.com/users";

  public async getUserList({
    since,
    per_page,
  }: IGetUserListParams): Promise<IUser[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}?since=${since}&per_page=${per_page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserDetails(username: string): Promise<IUser> {
    try {
      const response = await axios.get(`${this.baseUrl}/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserRepos(username: string): Promise<IRepo> {
    try {
      const response = await axios.get(`${this.baseUrl}/${username}/repos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new GithubService();
