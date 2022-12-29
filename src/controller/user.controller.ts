import { Router } from "express";
import githubServices from "../service/github.services";

class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.get("/", async (req, res) => {
      const { since, per_page } = req.query;
      try {
        const response = await githubServices.getUserList({
          since: Number(since),
          per_page: Number(per_page),
        });

        if (response.length === 0) {
          return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    this.router.get("/:username/details", async (req, res) => {
      const { username } = req.params;
      try {
        const response = await githubServices.getUserDetails(username);

        if (!response) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    this.router.get("/:username/repos", async (req, res) => {
      const { username } = req.params;
      try {
        const response = await githubServices.getUserRepos(username);

        if (!response) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  }
}

export const userRoutes = new UserController();
