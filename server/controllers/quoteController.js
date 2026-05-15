const calculateQuote = async (req, res) => {

  try {

    const {

      vehicleModel,
      registrationYear,
      fuelType,
      insuranceType,
      previousInsurance,
      ncb

    } = req.body;

    let premium = 5000;

    // VEHICLE TYPE DETECTION

    let vehicleCategory = "LMV-NT";

    const model =
      vehicleModel.toLowerCase();

    if (
      model.includes("activa") ||
      model.includes("splendor") ||
      model.includes("bike") ||
      model.includes("scooter")
    ) {

      vehicleCategory = "2W";
      premium += 1500;
    }

    else if (
      model.includes("auto") ||
      model.includes("rickshaw")
    ) {

      vehicleCategory = "3W";
      premium += 3000;
    }

    else if (
      model.includes("truck") ||
      model.includes("bus")
    ) {

      vehicleCategory = "HMV";
      premium += 8000;
    }

    else {

      vehicleCategory = "LMV";
      premium += 4000;
    }

    // VEHICLE AGE

    const currentYear =
      new Date().getFullYear();

    const vehicleAge =
      currentYear -
      Number(registrationYear);

    if (vehicleAge > 10) {

      premium += 4000;

    } else if (vehicleAge > 5) {

      premium += 2000;
    }

    // FUEL TYPE

    if (fuelType === "Diesel") {

      premium += 2000;
    }

    if (fuelType === "Electric") {

      premium -= 1000;
    }

    // INSURANCE TYPE

    if (
      insuranceType ===
      "Comprehensive"
    ) {

      premium += 3500;

    } else {

      premium += 1500;
    }

    // PREVIOUS INSURANCE STATUS

    if (
      previousInsurance ===
      "ExpiredWithin90"
    ) {

      premium += 2000;
    }

    if (
      previousInsurance ===
      "ExpiredMoreThan90"
    ) {

      premium += 4000;
    }

    // NO CLAIM BONUS

    let ncbDiscount = 0;

    if (ncb === "20") {

      ncbDiscount = 1000;
    }

    if (ncb === "35") {

      ncbDiscount = 2000;
    }

    if (ncb === "50") {

      ncbDiscount = 3500;
    }

    premium -= ncbDiscount;

    // MINIMUM PREMIUM SAFETY

    if (premium < 3000) {

      premium = 3000;
    }

    // RISK LEVEL

    let riskLevel = "LOW";

    if (premium > 12000) {

      riskLevel = "HIGH";

    } else if (premium > 8000) {

      riskLevel = "MEDIUM";
    }

    // AI RECOMMENDATION

    let recommendation =
      "Comprehensive coverage recommended.";

    if (vehicleAge > 10) {

      recommendation =
        "Third-party insurance may be economical for older vehicles.";
    }

    res.json({

      success: true,

      premium,

      vehicleCategory,

      vehicleAge,

      riskLevel,

      recommendation
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message
    });
  }
};

module.exports = {
  calculateQuote
};