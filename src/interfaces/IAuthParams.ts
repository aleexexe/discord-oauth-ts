/**
 * @interface IAuthParams
 * @description Interface for the token request body field structure.
 * @property {string} clientId - The client id.
 * @property {string} clientSecret - The client secret.
 * @property {string} redirectUri - The redirect uri.
 * @property {string} endpoint - The Discord API base url endpoint.
 */
export interface IAuthParams {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    endpoint?: string;
}