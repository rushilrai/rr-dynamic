import { baseInstance } from "../common/configs/axios.config";
import { Sample, SampleSchema } from "./sample.model";

export class SampleService {
    async createSample(name: Sample["name"]) {
        try {
            SampleSchema.shape.name.parse(name);

            const result = await baseInstance.get("/sample");

            console.debug(result);

            return result;
        } catch (error) {
            console.error("Could not create sample", error);

            throw error;
        }
    }
}
