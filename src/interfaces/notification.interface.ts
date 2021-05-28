export interface ValidateResponse {
    success: boolean
    personId: string
    role: string
    message: string
}

export interface TokenValidateResponse {
    active: boolean
    scope: string
    username: string
    exp: number
    iat: number
    sub: string
    aud: string
    iss: string
    jti: string
    token_type: string
    client_id: string
    uid: string
    userid: string
    orgid: string
}

export interface UserCredentials {
    username: string,
    password: string
  }
export interface AuthnResponse {
    expiresAt?: string,
    status: string,
    sessionToken: string,
    _embedded?: object,
    _links?: object
  }

export interface GetAuthCodeRequest {
    sessionToken: string,
    codeChallenge: string
  }
export interface GetAuthCodeResponse {
    code: string,
    state: string
  }
export interface GetTokenReq {
    code?: string,
    state?: string,
    codeVerifier?: string,
    refresh_token?: string,
  }
export interface TokenResponse {
    token_type: string,
    expires_in: number,
    access_token: string,
    scope: string,
    refresh_token?: string,
    id_token: string
  }

export interface AllTokens {
    access_token: string,
    refresh_token: string
  }
export interface RevokeTokenDetails {
    token : string,
    token_type_hint: string,
    client_id?: string
  }

export interface Email {
    email: string
  }
export interface AuthorizationHeader {
    authorization?: string
  }

export interface JwtTokenDecodedType {
    ver: number
    jti: string,
    iss: string,
    aud: string,
    iat: number,
    exp: number,
    cid: string,
    uid: string,
    scp: object,
    sub: string,
    userid: string,
    orgid: string
  }
