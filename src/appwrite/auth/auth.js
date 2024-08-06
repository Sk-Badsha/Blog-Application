import conf from "../../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();

  account;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("auth signup useraccount:", userAccount);
      if (userAccount) {
        // call another method to login direct
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("auth login session: ", session);
      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      // console.log("currentUser in auth.js: ", currentUser);
      return currentUser;
    } catch (error) {
      console.log(
        "Failed to get current user: AppwriteService: auth/auth.js " +
          error.message
      );
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new error("failed to logout: " + error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
