import conf from "../../conf/conf.js";
import {
  Client,
  ID,
  Databases,
  Query,
  Storage,
  ImageFormat,
  ImageGravity,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  storage;

  constructor() {
    console.log("conf in config.js: ", conf);

    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.storage = new Storage(this.client);
  }

  // make the services [TimeStamps: 21/6:58]

  async createPost({ title, slug, content, featuredImage, status, user_id }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          user_id,
        }
      );
    } catch (error) {
      throw new Error("Failed to create Post: " + error.message);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Failed to update Post: " + error.message);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Failed to delete Post: " + error.message);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Failed to get Post: " + error.message);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );

      return posts;
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error.message);
      return false;
    }
  }

  //file-upload service

  //change-in-my-code
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Failed to upload file: " + error.message);
      return false;
    }
  }

  async deleteFile(file) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, file);
      return true;
    } catch (error) {
      console.log("Failed to delete file: " + error.message);
      return false;
    }
  }

  getFilePreview(fileId) {
    const resultUrl = this.storage.getFilePreview(
      conf.appwriteBucketId,
      fileId,
      200, // width (optional)
      200, // height (optional)
      ImageGravity.Center // gravity (optional)
    );

    return resultUrl.href;
  }
}

const service = new Service();
export default service;
