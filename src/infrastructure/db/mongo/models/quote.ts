import { IQuote } from '@domain/quote/IQuote';
import mongoose, { Schema } from 'mongoose';

const QuoteSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		service: { type: String, required: true },
		deadline: { type: Number, required: true },
		price: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<IQuote>('Quote', QuoteSchema);
