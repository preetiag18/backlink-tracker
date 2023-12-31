export enum StatusCode_Err {
  RESOURCE_NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  BAD_REQUEST_INVALID_SYNTAX = 400,
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN = 403,
}

export enum StatusCode_Success {
  NEW_DATA_CREATED = 201,
  REQUEST_CREATED_NO_CONTENT = 204,
  REQUEST_CREATED = 200,
}
