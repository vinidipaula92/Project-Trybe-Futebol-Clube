// referencia: https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript

class ValidationError extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export default ValidationError;
