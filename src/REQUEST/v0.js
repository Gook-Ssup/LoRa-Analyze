import axios from "axios";

const shared_url = "/v0/api";

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

async function GENERAL_ADD_GATEWAY({ name, latitude, longitude }) {
  const API_REQUEST = {
    method: "PUT",
    url: shared_url + "/general/gateway",
    data: {
      name,
      latitude,
      longitude,
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

// !Gateways

// Signal
async function GENERAL_GET_SIGNALS({timeSince}) {
  const API_REQUEST = {
    method: "GET",
    url: shared_url + "/general/signals",
    headers: {
      // 'x-access-token': accessToken,
    },
    params: {
      timeSince:timeSince.toString()
    }
  };
  try {
    const result = await axios(API_REQUEST);
    return result.data;
  } catch (error) {
    throw error;
  }
}
// !Signal

const REQUEST = {
  general: {
    getGateways: GENERAL_GET_GATEWAYS,
    addGateway: GENERAL_ADD_GATEWAY,
    getSignals: GENERAL_GET_SIGNALS,
  },
};

export default REQUEST;
