const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BorrowRecordSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: Date,
  dueDate: Date,
  lateFees: { type: Number, default: 0 },
});

const BorrowRecord = mongoose.model("BorrowRecord", BorrowRecordSchema);
module.exports = BorrowRecord;
