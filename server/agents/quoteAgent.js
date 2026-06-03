const axios = require("axios");

const generateInsuranceQuotes = async (vehicleData) => {
  try {
    const response = await axios.post(
      process.env.INSUR_AGENT_RESPONSES_ENDPOINT,
      {
        input: JSON.stringify(vehicleData)
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.FOUNDRY_API_KEY
        }
      }
    );

    console.log(
      "RAW INSURANCE RESPONSE:"
    );

    console.log(
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    let rawText = "";

    try {
      const output =
        response.data.output || [];

      const message =
        output.find(
          item =>
            item.type === "message"
        );

      rawText =
        message?.content?.[0]?.text ||
        "";
    } catch (err) {
      console.log(
        "Unable to extract insurance response text"
      );

      return {
        success: false,
        message:
          "Insurance response extraction failed"
      };
    }

    try {
      const start =
        rawText.indexOf("{");

      const end =
        rawText.lastIndexOf("}");

      if (
        start === -1 ||
        end === -1
      ) {
        throw new Error(
          "No JSON found in response"
        );
      }

      const jsonString =
        rawText.substring(
          start,
          end + 1
        );

      const insuranceData =
        JSON.parse(jsonString);

      return {
        success: true,
        policies:
          insuranceData.recommended_policies || []
      };
    } catch (parseError) {
      console.log(
        "INSURANCE JSON PARSE ERROR:"
      );

      console.log(parseError);

      console.log(
        "RAW INSURANCE RESPONSE:"
      );

      console.log(rawText);

      return {
        success: false,
        message:
          "Invalid insurance response format"
      };
    }
  } catch (error) {
    console.log(
      "INSURANCE AGENT ERROR:"
    );

    console.log(error);

    return {
      success: false,
      message:
        "Insurance agent failed"
    };
  }
};

module.exports = {
  generateInsuranceQuotes
};