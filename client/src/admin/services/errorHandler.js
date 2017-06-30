export default (error) => {
  const isRemoteError = !!error.response
  return {
    isRemoteError,
    ErrorID: isRemoteError ? error.response.data.ErrorType : undefined,
    message: isRemoteError ? error.response.data.message : error.message,
    stack: error.stack
  }
}