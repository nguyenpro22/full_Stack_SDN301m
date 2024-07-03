export interface IResCommon<T> {
  data: T;
  success: boolean;
  message: "Successfully";
  errorMessages: null;
  code?: number;
  status?: number;
}

export interface IParamsCommon {
  [k: string]: number | string | boolean | undefined | null;
}
