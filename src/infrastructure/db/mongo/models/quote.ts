import mongoose, { Schema } from 'mongoose';

import IQuote from 'domain/quote/IQuote';

const QuoteSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        service: { type: String, required: true, unique: true },
        deadline: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IQuote>('Quote', QuoteSchema);
