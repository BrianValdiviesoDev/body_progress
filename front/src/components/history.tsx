import { MeasureEntity } from "../api/entities"
import '../styles/history.css'
interface HistoryProps {
    measures: MeasureEntity[]
    onEditMeasure: (measure: MeasureEntity) => void
}

export default function History({measures, onEditMeasure}: HistoryProps) {
    const formatDate = (date: string | Date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    }

    const getWeightValue = (index:number)=>{
        const currentWeight = measures[index].weight || 0
        if(index===measures.length-1){
            return currentWeight
        }

        const previousWeight = measures[index+1].weight || 0

        const difference = currentWeight - previousWeight

        if(difference>0){
            return <span className="red-label">+{(difference).toFixed(1)} kg</span>
        }

        if(difference<0){
            return <span className="green-label">{(difference).toFixed(1)} kg</span>
        }

        return '0 kg'
    }

    return (
        <>
            <div className="card-container">
                {measures.map((measure: MeasureEntity, index: number) => (
                    <div className="measure-card" key={index} onClick={()=>onEditMeasure(measure)}>
                        <div className="date">
                            {formatDate(measure.date)}
                        </div>
                        <div className="main-values">
                            <div className="main-value">
                                <label>Weight</label>
                                <span>{measure.weight} Kg</span>
                            </div>
                            <div className="main-value">
                                <label>Difference</label>
                                {getWeightValue(index)}
                            </div>
                        </div>
                        
                        <div className="values">
                            
                            <div className="value">
                                <label>Muscle</label>
                                <span>{measure.muscle} %</span>
                            </div>
                            <div className="value">
                                <label>Fat</label>
                                <span>{measure.fat} %</span>
                            </div>
                            <div className="value">
                                <label>Viceral Fat</label>
                                <span>{measure.visceral}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}