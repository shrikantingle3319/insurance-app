const ownershipQuestionNode =
  async (state) => {

    return {

      ...state,

      question:

        "Are you the first, second, third, or fourth owner of the vehicle?"
    };
};

module.exports = {
  ownershipQuestionNode
};