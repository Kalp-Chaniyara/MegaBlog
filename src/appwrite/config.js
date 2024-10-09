//Main configuartion of the App

import conf from "../conf.js";
import { Client, Databases, Storage } from "appwrite"

export class Services{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImamge,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  //Here we assume the slug value as the document id
                {
                    title,
                    content,
                    featuredImamge,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: createPost error :: ", error);
        }
    }

    async updtaePost(slug,{title,content,featuredImamge,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImamge,
                    status,
                }
            )
        } catch(error){
            console.log("Appwrite :: updatePost error :: ", error);
        }

    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImamge,
                    status,
                }
            )
            return true; //If we write return before await means it return that documents but we delete the documents so we just return true or false --------- deleteDocumnets return metadata or any succefull/failure type things which not matter here
        } catch(error){
            console.log("Appwrite :: deletePost error :: ", error);
            return false;
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            ) 
        } catch(error){
            console.log("Appwrite :: getPost error :: ", error);
            return false;
        }
    }
}

const services = new Services()

export default services