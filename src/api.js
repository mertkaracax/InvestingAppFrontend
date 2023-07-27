class Api {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL;
  }
}

//"https://y2hpu3ursk.execute-api.us-east-1.amazonaws.com/api/"

const baseUrl = new Api("http://127.0.0.1:8000");

export const getBaseUrl = () => {
  return baseUrl.BASE_URL;
};
