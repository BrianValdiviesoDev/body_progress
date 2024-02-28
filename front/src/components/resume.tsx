import { MeasureEntity } from "../api/entities"
import '../styles/resume.css'
interface Props{
    measures:MeasureEntity[]
}

export default function Resume({measures}:Props){

    const getWeightDifference = ()=>{
        const measuresWithData = measures.filter((m)=>m.weight)
        if(measuresWithData.length>0){
            const difference = Number((measuresWithData[0].weight! - measuresWithData[measuresWithData.length-1].weight!).toFixed(1))
            
            if(difference>0){
                return <span>+{(difference).toFixed(1)} kg</span>
            }
    
            if(difference<0){
                return <span>{(difference).toFixed(1)} kg</span>
            }
    
            return '0 kg'
        }
        return 0
    }

    const getFatDifference = ()=>{
        const measuresWithData = measures.filter((m)=>m.weight && m.fat)
        if(measuresWithData.length>0){
            const firstMeasure = measuresWithData[0]
            const lastMeasure = measuresWithData[measuresWithData.length-1]
            const firstFat = firstMeasure.weight!*firstMeasure.fat!/100
            const lastFat = lastMeasure.weight!*lastMeasure.fat!/100
            const difference = Number((firstFat-lastFat).toFixed(1))
            
            if(difference>0){
                return <span className="red-label">+{(difference).toFixed(1)} kg</span>
            }
    
            if(difference<0){
                return <span className="green-label">{(difference).toFixed(1)} kg</span>
            }
    
            return '0 kg'
        }
        return 0
    }

    const getMuscleDifference = ()=>{
        const measuresWithData = measures.filter((m)=>m.weight && m.muscle)
        if(measuresWithData.length>0){
            const firstMeasure = measuresWithData[0]
            const lastMeasure = measuresWithData[measuresWithData.length-1]
            const first = firstMeasure.weight!*firstMeasure.muscle!/100
            const last = lastMeasure.weight!*lastMeasure.muscle!/100
            const difference = Number((first-last).toFixed(1))
            
            if(difference>0){
                return <span className="green-label">+{(difference).toFixed(1)} kg</span>
            }
    
            if(difference<0){
                return <span className="red-label">{(difference).toFixed(1)} kg</span>
            }
    
            return '0 kg'
        }
        return 0
    }


    return (
        <>
            <div className="resume">
                <div className="value-card">
                    <div className="title">Weight difference</div>
                    <div className="value">{getWeightDifference()}</div>
                </div>
                <div className="value-card">
                    <div className="title">Fat difference</div>
                    <div className="value">{getFatDifference()}</div>
                </div>
                <div className="value-card">
                    <div className="title">Muscle difference</div>
                    <div className="value">{getMuscleDifference()}</div>
                </div>
            </div>
        </>
    )
}