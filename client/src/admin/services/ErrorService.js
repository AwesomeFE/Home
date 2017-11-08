export default error => {
  const isRemoteError = !!error.code

  if (isRemoteError) {
    const { ErrorType, message, code } = error
    return message
  
  } else {
    return error
  }
}