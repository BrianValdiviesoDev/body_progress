import { Model, Schema, model } from 'mongoose';
import { MeasureDocument } from './measure.interface';

const MeasureSchema = new Schema<MeasureDocument>(
	{
		user: { type: String, required: true },
		date: { type: Date, required: true },
		height: { type: Number },
		weight: { type: Number },
		muscle: { type: Number },
		fat: { type: Number },
		water: { type: Number }, // Assuming water measurement is optional
		bones: { type: Number },
		visceral: { type: Number },
		shoulder: { type: Number },
		bust: { type: Number },
		waist: { type: Number },
		hips: { type: Number },
		thigh: { type: Number },
		arm: { type: Number },
		contractedArm: { type: Number },
		subscapularFold: { type: Number },
		tricipitalFold: { type: Number },
		bicipitalFold: { type: Number },
		chestFold: { type: Number },
		iliocrestalFold: { type: Number },
		supraespinalFold: { type: Number },
		abdominalFold: { type: Number },
		thighFold: { type: Number },
		legFold: { type: Number },
		observations: { type: String },
		images: [{type: Object}],
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
		active: { type: Boolean, default: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const MeasureModel: Model<MeasureDocument> = model('Measure', MeasureSchema);
export default MeasureModel;