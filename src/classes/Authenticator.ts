import { IAuthParams } from "../interfaces/IAuthParams";
import { ITokenRequest, ITokenRevoke } from "../interfaces/IToken";
import fetch from 'node-fetch';

export class Authenticator {

    /* Constructor-set auth parameters */
    private authParams: IAuthParams;

    constructor(authParams: IAuthParams) {
        this.authParams = authParams;
    }

    /**
     * @method request
     * @description Handles the fetch request for the discord API.
     * @param {string} url - The url to fetch.
     * @param {object} opts - The fetch options.
     * @returns {Promise<Object>} - The response from the fetch request.
     */
    private request(url: string, payload: object) {
        return fetch(`${this.authParams.endpoint}${url}`, payload)
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    throw new Error(json.error);
                }
                return json;
            });
    }

    /**
     * @method getToken
     * @description Returns the Discord OAuth2 authorization token.
     * @param {ITokenRequest} reqParams - The request parameters.
     * @returns {Promise<Object>} - The response from the fetch request.
     */
    public async getToken(reqParams: ITokenRequest) {
        const opts = {
            client_id: reqParams.client_id || this.authParams.clientId,
            client_secret: reqParams.client_secret || this.authParams.clientSecret,
            redirect_uri: reqParams.redirect_uri || this.authParams.redirectUri,
            code: reqParams.code,
            grant_type: reqParams.grant_type
        }

        const payload = {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(opts)
        }

        if (!opts.client_id)        throw new Error('Missing code parameter.');
        if (!opts.client_secret)    throw new Error('Missing client_secret parameter.');
        if (!opts.redirect_uri)     throw new Error('Missing redirect_uri parameter.');
        if (!opts.code)             throw new Error('Missing code parameter.');
        if (!opts.grant_type)       throw new Error('Missing grant_type parameter.');

        return this.request('/oauth2/token', payload)
    }

    /**
     * @method delToken
     * @description Revokes the Discord OAuth2 authorization token.
     * @param {ITokenRevoke} reqParams - The request parameters.
     * @returns {Promise<Object>} - The response from the fetch request.
     */
    public async delToken(reqParams: ITokenRevoke) {
        const opts = {
            client_id: reqParams.client_id || this.authParams.clientId,
            client_secret: reqParams.client_secret || this.authParams.clientSecret,
            token: reqParams.token
        }
        
        const payload = {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(opts)
        }

        if (!opts.client_id)        throw new Error('Missing code parameter.');
        if (!opts.client_secret)    throw new Error('Missing client_secret parameter.');
        if (!opts.token)            throw new Error('Missing token parameter.');

        return this.request('/oauth2/token/revoke', payload)
    }

    /**
     * @method getUser
     * @description Returns the Discord User Profile Details.
     * @param {string} accessToken - The access token.
     * @returns {Promise<Object>} - The response from the fetch request.
     */
    public async getUser(accessToken: string) {
        const payload = {
            method: "GET",
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }

        if(!accessToken) throw new Error('Missing accessToken parameter.');
        
        return this.request('/users/@me', payload)
    }

}