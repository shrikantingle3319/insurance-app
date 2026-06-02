const axios = require("axios");

const fetchVehicleDetails =
  async (vehicleNumber) => {

    try {

      const response =
        await axios.get(

          `${API_URL}/${vehicleNumber}`,

          {
            headers: {

              Authorization:
                `Bearer ${TOKEN}`
            }
          }
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw new Error(
        "Vehicle API failed"
      );
    }
};

module.exports = {
  fetchVehicleDetails
};