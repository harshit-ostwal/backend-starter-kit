import { API_VERSION } from "../../constants/api.constants.js";
import ApiResponse from "../http/api.response.js";

const notFound = (_, res) => {
    return ApiResponse.redirect(res, `/api/${API_VERSION}/docs`);
};

export default notFound;
