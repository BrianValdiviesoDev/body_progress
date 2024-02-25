import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MeasureService } from './measure.services';
import MeasureModel from './measure.schema';
import { JWTPayload } from 'express-oauth2-jwt-bearer';
import { CreateMeasureDto } from './measure.interface';

let mongoServer: MongoMemoryServer;
let measureService: MeasureService;

const mockPayload: JWTPayload = {
	sub: '123456789abc',
};

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri);
	measureService = new MeasureService();
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	await MeasureModel.deleteMany({});
});

describe('createUser', () => {
	afterEach(async () => {
		await MeasureModel.deleteMany({});
	});

	it('should create a new measure', async () => {
		const data: CreateMeasureDto = {
			date: new Date(),
			weight: 80,
			height: 180,
		};
		const measure = await measureService.createMeasure(data, mockPayload);
		expect(measure.weight).toEqual(data.weight);
		expect(measure.height).toEqual(data.height);
	});
});
