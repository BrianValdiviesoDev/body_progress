import { useEffect, useState } from "react"
import '../styles/charts.css'
import  WeightChart, { WeightPoint } from "./weightChart"
import { MeasureEntity } from "../api/entities"
import WeightPercentageChart, { DataPoint } from "./weightPercentageChart"
import VisceralChart, { VisceralPoint } from "./visceralChart"

interface ChartsProps {
  measures:MeasureEntity[]
}

export default function Charts({measures}:ChartsProps){
    const [weightData, setWeightData] = useState<WeightPoint[]>([])
    const [fatData, setFatData] = useState<DataPoint[]>([])
    const [muscleData, setMuscleData] = useState<DataPoint[]>([])
    const [waterData, setWaterData] = useState<DataPoint[]>([])
    const [bonesData, setBonesData] = useState<DataPoint[]>([])
    const [visceralData, setVisceralData] = useState<VisceralPoint[]>([])

    const [widthChart, setWidthChart] = useState<number>(400)
    const [heightChart, setHeightChart] = useState<number>(400)

    const lineColor = '#1fc49a';

    useEffect(()=>{
      const weightData = measures.filter((m)=>m.weight).map((m)=>{
        return{
          date: new Date(m.date),
          weight: m.weight as number
        }
      });
      setWeightData(weightData)

      const fatData = measures.filter((m)=>m.fat && m.weight).map((m)=>{
        return{
          date: new Date(m.date),
          value: Number((m.weight!*m.fat!/100).toFixed(1))
        }
      });
      setFatData(fatData)

      const muscleData = measures.filter((m)=>m.muscle).map((m)=>{
        return{
          date: new Date(m.date),
          value: m.muscle as number
        }
      });
      setMuscleData(muscleData)

      const waterData = measures.filter((m)=>m.water).map((m)=>{
        return{
          date: new Date(m.date),
          value: m.water as number
        }
      });
      setWaterData(waterData)

      const bonesData = measures.filter((m)=>m.bones).map((m)=>{
        return{
          date: new Date(m.date),
          value: m.bones as number
        }
      });
      setBonesData(bonesData)

      const visceralData = measures.filter((m)=>m.visceral).map((m)=>{
        return{
          date: new Date(m.date),
          visceral: m.visceral as number
        }
      });
      setVisceralData(visceralData)

      setWidthChart(window.innerWidth*0.9)
      setHeightChart(window.innerWidth*0.8)
    },[measures])

    return(
        <>
        <div className="chart-grid" id="general">
              <div className="chart">
                <h3>Weight</h3>
                <WeightChart lineColor={lineColor} data={weightData} width={widthChart} height={heightChart}/>
              </div>

              <div className="chart">
                <h3>Fat</h3>
                <WeightPercentageChart lineColor={lineColor} data={fatData} width={widthChart} height={heightChart} label="Fat"/>
              </div>

              <div className="chart">
                <h3>Muscle</h3>
                <WeightPercentageChart lineColor={lineColor} data={muscleData} width={widthChart} height={heightChart} label="Muscle"/>
              </div>

              <div className="chart">
                <h3>Visceral Fat</h3>
                <VisceralChart lineColor={lineColor} data={visceralData} width={widthChart} height={heightChart}/>
              </div>

              <div className="chart">
                <h3>Water</h3>
                <WeightPercentageChart lineColor={lineColor} data={waterData} width={widthChart} height={heightChart} label="Water"/>
              </div>

              <div className="chart">
                <h3>Bones</h3>
                <WeightPercentageChart lineColor={lineColor} data={bonesData} width={widthChart} height={heightChart} label="Bones"/>
              </div>
            </div>
        </>
    )
}