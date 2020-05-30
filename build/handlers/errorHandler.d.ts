import { Response } from "express";
/**
 * Handle error by displaying the error message or showing 404 error if EXPRESS_WIZ_404_IMAGE is set
 * @param response: Express handler's response object
 * @param error: Error object
 * @return void
 */
export declare function handleError(response: Response, error: Error): Promise<void>;
