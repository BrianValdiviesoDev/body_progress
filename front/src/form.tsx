import { useState } from 'react';
import './modal.css';

interface FormProps {
    onClose: () => void;
}

export default function Form({onClose}: FormProps) {
    const [step, setStep] = useState<number>(0);

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
                    <div className='add-form'>
                        {step == 0 && (
                            <>                           
                                <h3>General</h3>
                                <div className='form-input'>
                                    <div className='form-input'>
                                        <label>Date</label>
                                        <input type='date' />
                                    </div>
                                    <div className='form-input'>
                                        <label>Hour</label>
                                        <input type='time' />
                                    </div>
                                    <div className='form-input'>
                                        <label>Height</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>Weight</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Muscle</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Fat</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Water</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>% Bones</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                    <div className='form-input'>
                                        <label>Visceral Fat</label>
                                        <input type='number' step={0.1}/>
                                    </div>
                                </div>
                            </>
                        )}
                        {step == 1 && (
                            <>                           
                                <h3>Perimeters</h3>
                                <div className='form-input'>
                                    <label>Shoulders</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Bust</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Waist</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Hips</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Thigh</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Arm</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Contracted Arm</label>
                                    <input type='number' step={0.1}/>
                                </div>
                            </>
                        )}
                        {step == 2 && (
                            <>                           
                                <h3>Folds</h3>
                                <div className='form-input'>
                                    <label>Subscapular</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Tricipital</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Bicipital</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Chest</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Ilioscrestal</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Supraespinal</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Abdominal</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Thigh</label>
                                    <input type='number' step={0.1}/>
                                </div>
                                <div className='form-input'>
                                    <label>Leg</label>
                                    <input type='number' step={0.1}/>
                                </div>
                            </>
                        )}
                        {step == 3 && (
                            <>                           
                                <h3>Images</h3>
                                <input type='file' accept='image/*' multiple/>
                                <h3>Observations</h3>
                                <textarea></textarea>
                            </>
                        )}
                    </div>
                </div>
                <div className='modal-footer'>
                    {step > 0 && <button onClick={() => setStep(step - 1)}>Back</button>}
                    {step < 3 && <button onClick={() => setStep(step + 1)}>Next</button>}
                    {step == 3 && <button>Save</button>}
                </div>
            </div>
        </div>
    )
}