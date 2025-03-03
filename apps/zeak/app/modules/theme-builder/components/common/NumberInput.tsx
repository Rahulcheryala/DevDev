import {Input} from "@zeak/react"


export default function NumberInput({value, onChange, label}: {value: number, onChange: (value: number) => void, label: string}) {
  return (
    <div className="flex flex-col">
      <h1>{label}</h1>
      <Input min={0} className="h-6" type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}