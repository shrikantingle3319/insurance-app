const {

  app

} = require(
  "./insuranceGraph"
);

const runGraph =
  async () => {

    const result =

      await app.invoke({

        vehicleData: {

          vehicleNumber:
            "MH12AB1234",

          vehicleModel:
            "Altroz"
        }
      });

    console.log(result);
};

runGraph();