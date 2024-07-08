interface SuccessResponse {
    status: number;
    message: string;
    data: Record<string, any>;
  }
  
  interface ErrorResponse {
    status: number;
    error: string;
    message: string;
  }
  
  const success: SuccessResponse = {
    status: 200,
    message: "Success!",
    data: {},
  };
  
  export const responseSuccess = (def: Partial<SuccessResponse> = success) => ({
    type: "object",
    properties: {
      status: {
        type: "number",
        default: def.status ?? success.status,
      },
      statusCode: {
        type: "number",
        default: def.status ?? success.status,
      },
      message: {
        type: "string",
        default: def.message ?? success.message,
      },
      data: def.data ?? success.data,
    },
  });
  
  const error: ErrorResponse = {
    status: 400,
    error: "error",
    message: "Something went wrong, please try again later.",
  };
  
  export const responseError = (def: Partial<ErrorResponse> = error) => ({
    type: "object",
    properties: {
      status: {
        type: "number",
        default: def.status ?? error.status,
      },
      statusCode: {
        type: "number",
        default: def.status ?? error.status,
      },
      error: {
        type: "string",
        default: def.error ?? error.error,
      },
      message: {
        type: "string",
        default: def.message ?? error.message,
      },
    },
  });
  