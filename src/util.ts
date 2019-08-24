
export const getBEHRError = (err: Error | null, functionName?: string) => {
  if (err) return err

  const errorMessage = functionName
    ? `${functionName} return no error without value`
    : `Unexpected error. Got no error without value as TypeBetterErrorHandleReturn`
  const ErrorObj = { statusCode: 500, errorMessage }
  return ErrorObj
}
