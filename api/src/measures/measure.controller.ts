import { ApiError } from '../framework/error-handling';
import { MeasureService } from './measure.services';
import { Request, Response } from 'express';

const createMeasure = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const measureService = new MeasureService();
		const result = await measureService.createMeasure(req.body, req.auth.payload);
		res.status(201);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

const updateMeasure = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const measureService = new MeasureService();
		const result = await measureService.updateMeasure(req.params.id, req.body, req.auth.payload);
		res.status(200);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

const softDeleteMeasure = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const measureService = new MeasureService();
		const result = await measureService.softDeleteMeasure(req.params.id, req.auth.payload);
		res.status(200);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

const recoverMeasure = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const measureService = new MeasureService();
		const result = await measureService.recoverMeasure(req.params.id, req.auth.payload);
		res.status(200);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

const getMeasure = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const measureService = new MeasureService();
		const result = await measureService.getMeasure(req.params.id, req.auth.payload);
		res.status(200);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

const listMeasures = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const initDate = req.query.initDate as string;
		const endDate = req.query.endDate as string;
		const measureService = new MeasureService();
		const result = await measureService.listMeasures(req.auth.payload, initDate, endDate);
		res.status(200);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

const deleteMeasure = async (req: Request, res: Response, next: any) => {
	if (!req.auth) {
		res.status(401);
		res.send({ message: 'Unauthorized' });
		return;
	}
    
	try {
		const measureService = new MeasureService();
		const result = await measureService.deleteMeasure(req.params.id, req.auth.payload);
		res.status(200);
		res.send(result);
	} catch (e: any) {
		const err: ApiError = new Error();
		err.message = e.message;
		next(err);
	}
};

export {
	createMeasure,
	updateMeasure,
	softDeleteMeasure,
	recoverMeasure,
	getMeasure,
	listMeasures,
	deleteMeasure
};