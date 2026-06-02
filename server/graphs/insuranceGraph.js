const {

  StateGraph,
  END

} = require(
  "@langchain/langgraph"
);

const {

  validationNode

} = require(
  "../nodes/validationNode"
);

const {

  ownershipQuestionNode

} = require(
  "../nodes/ownershipQuestionNode"
);

const {

  insuranceNode

} = require(
  "../nodes/insuranceNode"
);

/* =========================================
   GRAPH STATE
========================================= */

const graphState = {

  vehicleData: {

    value:
      (x, y) => y,

    default:
      () => ({})
  },

  validationResult: {

    value:
      (x, y) => y,

    default:
      () => ({})
  },

  insuranceResult: {

    value:
      (x, y) => y,

    default:
      () => ({})
  },

  nextStep: {

    value:
      (x, y) => y,

    default:
      () => ""
  }
};

/* =========================================
   CREATE GRAPH
========================================= */

const insuranceWorkflow =

  new StateGraph({

    channels:
      graphState
  });

/* =========================================
   ADD NODES
========================================= */

insuranceWorkflow.addNode(

  "validationNode",

  validationNode
);

insuranceWorkflow.addNode(

  "ownershipQuestionNode",

  ownershipQuestionNode
);

insuranceWorkflow.addNode(

  "insuranceNode",

  insuranceNode
);

/* =========================================
   ENTRY POINT
========================================= */

insuranceWorkflow.setEntryPoint(
  "validationNode"
);

/* =========================================
   CONDITIONAL ROUTING
========================================= */

insuranceWorkflow.addConditionalEdges(

  "validationNode",

  (state) => {

    /* =====================================
       VALID VEHICLE
    ===================================== */

    if (

      state.nextStep ===
      "VALID"

    ) {

      return "insuranceNode";
    }

    /* =====================================
       OWNERSHIP QUESTION
    ===================================== */

    if (

      state.nextStep ===
      "ASK_OWNER"

    ) {

      return "ownershipQuestionNode";
    }

    /* =====================================
       INVALID OR MISMATCH
    ===================================== */

    return END;
  },

  {

    insuranceNode:
      "insuranceNode",

    ownershipQuestionNode:
      "ownershipQuestionNode",

    [END]:
      END
  }
);

/* =========================================
   INSURANCE NODE → END
========================================= */

insuranceWorkflow.addEdge(

  "insuranceNode",

  END
);

/* =========================================
   OWNERSHIP NODE → END
========================================= */

insuranceWorkflow.addEdge(

  "ownershipQuestionNode",

  END
);

/* =========================================
   COMPILE GRAPH
========================================= */

const insuranceGraph =

  insuranceWorkflow.compile();

/* =========================================
   EXPORT
========================================= */

module.exports = {
  insuranceGraph
};