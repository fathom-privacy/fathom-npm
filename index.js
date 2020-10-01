module.exports = function fathomApi(apiKey) {
    if (typeof apiKey !== "string") throw new TypeError("api key is required");
        return apiKey;
  };