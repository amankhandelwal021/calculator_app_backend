const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calculationHistorySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    calculationName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    calculationPattern: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CalculationHistory = mongoose.model("CalculationHistory", calculationHistorySchema);
module.exports = CalculationHistory;
