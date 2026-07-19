const mongoose = require('mongoose');
const { PAYMENT_STATUSES } = require('../utils/paymentConstants');
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'khalti',
      trim: true,
    },
    transactionId: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: PAYMENT_STATUSES,
        message: `status must be one of: ${PAYMENT_STATUSES.join(', ')}`,
      },
      default: 'Pending',
    },
    paidAt: {
      type: Date,
    },
    pidx: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ order: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
