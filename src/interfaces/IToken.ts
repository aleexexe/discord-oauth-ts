/**
 * @interface ITokenRequest
 * @description Neeeded attributes to request a token to the Discord API.
 * @property {string} client_id - Your application's client id
 * @property {string} client_secret - Your application's client secret
 * @property {string} code - The access code returned by the OAuth process
 * @property {string} grant_type - The grant type. Must be set to "authorization_code"
 * @property {string} redirect_uri - The redirect uri associated with this authorization
 */
export interface ITokenRequest {
    client_id?: string;
    client_secret?: string;
    code: string;
    grant_type: string;
    redirect_uri?: string;
}

/**
 * @interface ITokenRevoke
 * @description Needed attributes to revoke a token from the Discord API
 * @property {string} client_id - Your application's client id
 * @property {string} client_secret - Your application's client secret
 * @property {string} token - The Discord access token to revoke
 */
export interface ITokenRevoke {
    client_id?: string;
    client_secret?: string;
    token: string;
}