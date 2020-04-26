class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(messge: string, statusCode = 400) {
    this.message = messge;
    this.statusCode = statusCode;
  }
}

export default AppError;
