import axios, { AxiosInstance } from "axios";
import { z } from "zod";

import { BASE_URL } from "../common.constants";

export let baseInstance: AxiosInstance;

export function initAxios() {
    try {
        z.string().url().parse(BASE_URL)

        baseInstance = axios.create({
            baseURL: BASE_URL
        });
    } catch (error) {
        console.error("Failed to initialize axios instance", error);

        throw error;
    }
}