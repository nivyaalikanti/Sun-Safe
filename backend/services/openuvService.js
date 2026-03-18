const axios = require('axios');

// Get the UV index from OpenUV API
const getUVIndex = async (lat, lon) => {
    const response = await axios.get(
        "https://api.openuv.io/api/v1/uv",
        {
            params: {lat, lng: lon},
            headers:{
                "x-access-token": process.env.OPENUV_API_KEY
            }
        }
    );
    return response.data.result.uv;
}
module.exports = {getUVIndex};