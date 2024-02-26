import { Router } from 'express';
import { createMeasure, deleteMeasure, getMeasure, listMeasures, recoverMeasure, softDeleteMeasure, updateMeasure } from './measure.controller';


const router = Router();
router.post('/', createMeasure);
router.put('/:id', updateMeasure);
router.delete('/:id', deleteMeasure);
router.patch('/delete/:id', softDeleteMeasure);
router.patch('/recover/:id', recoverMeasure);
router.get('/', listMeasures);
router.get('/:id', getMeasure);

export default router;