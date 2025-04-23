// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "./constants";
import { getAuth } from "firebase/auth";

export const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
