import { Types } from 'mongoose';
import { CreateMeasureDto, MeasureDocument } from './measure.interface';
import MeasureModel from './measure.schema';
import { JWTPayload } from 'express-oauth2-jwt-bearer';

export class MeasureService {
	async createMeasure(measure: CreateMeasureDto, user:JWTPayload): Promise<MeasureDocument> {
		if(!user.sub){
			throw new Error('User is required');
		}
        
		if(!measure.date){
			throw new Error('Date is required');
		}

		if(measure.date > new Date()){
			throw new Error('Date can not be in the future');
		}

		const data = {
			...measure,
			active: true,
			user: user.sub,
		};
		return await MeasureModel.create(data);
	}

	async updateMeasure(id:string, measure: CreateMeasureDto, user:JWTPayload): Promise<MeasureDocument> {
		if(!user.sub){
			throw new Error('User is required');
		}

		const updated = await MeasureModel.findOneAndUpdate({ _id: new Types.ObjectId(id), user: user.sub },
			{ $set: measure },
			{new: true});

		if(!updated){
			throw new Error('Measure not found');
		}

		return updated;
	}

	async softDeleteMeasure(id:string, user:JWTPayload): Promise<MeasureDocument> {
		if(!user.sub){
			throw new Error('User is required');
		}

		const updated = await MeasureModel.findOneAndUpdate({ _id: new Types.ObjectId(id), user: user.sub },
			{ $set: { active: false } },
			{new: true});
		
		if(!updated){
			throw new Error('Measure not found');
		}

		return updated;
	}

	async recoverMeasure(id:string, user:JWTPayload): Promise<MeasureDocument> {
		if(!user.sub){
			throw new Error('User is required');
		}

		const updated = await MeasureModel.findOneAndUpdate({ _id: new Types.ObjectId(id), user: user.sub },
			{ $set: { active: true } },
			{new: true});
		
		if(!updated){
			throw new Error('Measure not found');
		}
		return updated;
	}

	async getMeasure(id:string, user:JWTPayload): Promise<MeasureDocument | null> {
		return await MeasureModel.findOne({ _id: new Types.ObjectId(id), user: user.sub });
	}

	async listMeasures(user:JWTPayload, initDate?:string, endDate?:string): Promise<MeasureDocument[]> {
		const filter:any = { user: user.sub };
		if(initDate && endDate){
			filter.date = { $gte: new Date(initDate), $lte: new Date(endDate) };
		}

		return await MeasureModel.find(filter).sort({ date: 1 });

	}

	async deleteMeasure(id:string, user:JWTPayload): Promise<MeasureDocument> {
		if(!user.sub){
			throw new Error('User is required');
		}

		const deleted = await MeasureModel.findOneAndDelete({ _id: new Types.ObjectId(id), user: user.sub });
		if(!deleted){
			throw new Error('Measure not found');
		}
		return deleted;
	}

}