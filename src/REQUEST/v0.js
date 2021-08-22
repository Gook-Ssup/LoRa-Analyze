import axios from "axios";

const shared_url = "/v0/api"

// TESTING
async function MAP_GET_GATEWAYS() {
  const API_REQUEST = {
    method: "GET",
    url: shared_url + "/map/gateways",
    headers: {
      // 'x-access-token': accessToken,
    },
  };
  try {
    const result = await axios(API_REQUEST);
    return result.data;
  } catch (error) {
    throw error;
  }
}

// !AUTH

const REQUEST = {
  map: {
      getGateways: MAP_GET_GATEWAYS
  }
};

export default REQUEST;
