import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import '../styles/modal.css';
import { MeasureEntity } from '../api/entities';
import { toast } from 'react-toastify';
import { createMeasure } from '../api/api';
import { ApiHandlerError } from '../api/handlerApiError';
import {  AxiosError } from 'axios';
interface FormProps {
    onClose: () => void;
    onMeasureCreated: (measure: MeasureEntity) => void;
    onMeasureEdited: (measure: MeasureEntity) => void;
    editMeasure?: MeasureEntity;
}

export default function AddMeasure({onClose, onMeasureCreated, onMeasureEdited, editMeasure}: FormProps) {
    const [step, setStep] = useState<number>(0);
    const {register, handleSubmit, formState:{errors}} = useForm<MeasureEntity>({
        defaultValues: editMeasure
    }); 
    
    const onSubmit:SubmitHandler<MeasureEntity> = async (data) => {
        try{
            new Date(data.date);
        }catch(e){
            toast.error('Date is not valid');
            return;
        }
        try{
            if(editMeasure){
                const response = await createMeasure(data);
                onClose();
                onMeasureEdited(response);
                toast.success('Measure edited');
                return;
            }

            const response = await createMeasure(data);
            onClose();
            onMeasureCreated(response);
            toast.success('Measure created');
        }catch (e) {
            ApiHandlerError(e as AxiosError);
        }
        

    }

    return (
        <div className='overlap'>
            <div className='modal'>
                <div className='modal-header'>
                    <h2>Add new measure</h2>
                    <div className='modal-close'>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
                <div className='modal-body'>
                    <form className='add-form' onSubmit={handleSubmit(onSubmit)}>
                        {step == 0 && (
                            <>                           
                                <h3>General</h3>
                                <div className='form-input'>
                                    <div className='form-input'>
                                        <label>Date</label>
                                        <input type='datetime-local' value={editMeasure?.date} {...register("date")}/>
                                        {errors.date && <span className='error'>This field is required</span>}
                                    </div>
                                    <div className='form-input'>
                                        <label>Height</label>
                                        <input type='number' step={0.1} {...register('height')}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>Weight</label>
                                        <input type='number' step={0.1} {...register('weight')}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Muscle</label>
                                        <input type='number' step={0.1} {...register('muscle')}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Fat</label>
                                        <input type='number' step={0.1} {...register('fat')}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Water</label>
                                        <input type='number' step={0.1} {...register('water')}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Bones</label>
                                        <input type='number' step={0.1} {...register('bones')}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>Visceral Fat</label>
                                        <input type='number' step={0.1} {...register('visceral')}/>
                                    </div>
                                </div>
                            </>
                        )}
                        {step == 1 && (
                            <>                           
                                <h3>Perimeters</h3>
                                <div className='form-input'>
                                    <label>Shoulders</label>
                                    <input type='number' step={0.1} {...register('shoulder')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Bust</label>
                                    <input type='number' step={0.1} {...register('bust')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Waist</label>
                                    <input type='number' step={0.1} {...register('waist')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Hips</label>
                                    <input type='number' step={0.1} {...register('hips')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Thigh</label>
                                    <input type='number' step={0.1} {...register('thigh')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Arm</label>
                                    <input type='number' step={0.1} {...register('arm')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Contracted Arm</label>
                                    <input type='number' step={0.1} {...register('contractedArm')}/>
                                </div>
                            </>
                        )}
                        {step == 2 && (
                            <>                           
                                <h3>Folds</h3>
                                <div className='form-input'>
                                    <label>Subscapular</label>
                                    <input type='number' step={0.1} {...register('subscapularFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Tricipital</label>
                                    <input type='number' step={0.1} {...register('tricipitalFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Bicipital</label>
                                    <input type='number' step={0.1} {...register('bicipitalFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Chest</label>
                                    <input type='number' step={0.1} {...register('chestFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Iliocrestal</label>
                                    <input type='number' step={0.1} {...register('iliocrestalFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Supraespinal</label>
                                    <input type='number' step={0.1} {...register('supraespinalFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Abdominal</label>
                                    <input type='number' step={0.1} {...register('abdominalFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Thigh</label>
                                    <input type='number' step={0.1} {...register('thighFold')}/>
                                </div>
                                <div className='form-input'>
                                    <label>Leg</label>
                                    <input type='number' step={0.1} {...register('legFold')}/>
                                </div>
                            </>
                        )}
                        {step == 3 && (
                            <>                           
                                <h3>Images</h3>
                                <input type='file' accept='image/*' multiple/>
                                <h3>Observations</h3>
                                <textarea {...register('observations')}></textarea>
                            </>
                        )}
                    </form>
                </div>
                <div className='modal-footer'>
                    {step > 0 && <button onClick={() => setStep(step - 1)}>Back</button>}
                    {step < 3 && <button onClick={() => setStep(step + 1)}>Next</button>}
                    {step == 3 && <button onClick={()=>handleSubmit(onSubmit)()}>Save</button>}
                </div>
            </div>
        </div>
    )
}