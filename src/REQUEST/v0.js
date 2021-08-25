import axios from "axios";

const shared_url = "/v0/api"

// Gateways
async function GENERAL_GET_GATEWAYS() {
  const API_REQUEST = {
    method: "GET",
    url: shared_url + "/general/gateways",
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

async function GENERAL_ADD_GATEWAY({name, latitude, longitude}) {
  const API_REQUEST = {
    method: "PUT",
    url: shared_url + "/general/gateway",
    data: {
      name: "LabGateways(USPR)",
      latitude: 35.235102456647034,
      longitude: 129.0828258896565
    },
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
  general: {
    getGateways: GENERAL_GET_GATEWAYS,
    addGateway: GENERAL_ADD_GATEWAY
  }
};

export default REQUEST;


