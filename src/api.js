class Api {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL;
  }
}

const baseUrl = new Api(
  "https://y2hpu3ursk.execute-api.us-east-1.amazonaws.com/api/"
);

export const getBaseUrl = () => {
  return baseUrl.BASE_URL;
};
