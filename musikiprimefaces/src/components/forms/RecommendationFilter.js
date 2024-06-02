import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from 'react';
import ButtonsDemo from '../buttons/ButtonsDemo';
import { FloatLabel } from 'primereact/floatlabel';

export default function RecommendationFilter() {
    const [value, setValue] = useState();
    const [value1, setValue1] = useState(20);
    const [value2, setValue2] = useState(10.50);
    const [value3, setValue3] = useState(25);
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ]

    return (
        <div>
            <Card title="Simple Card" style={{width: '50%'}}>
                <div className="flex-auto">
                    <label htmlFor="minmax-buttons" className="font-bold block mb-2">Min-Max Boundaries</label>
                    <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name"
                        filter placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
                </div>
                <Divider type="solid" />
                <div>
                    <FloatLabel >
                        <InputNumber id="number-input" value={value} onValueChange={(e) => setValue(e.value)} />
                        <label htmlFor="number-input">Number</label>
                    </FloatLabel>
                </div>
                {/* <div className="card flex flex-wrap gap-3 p-fluid">
                    <div className="flex-auto">
                        <label htmlFor="stacked-buttons" className="font-bold block mb-2">Stacked</label>
                        <InputNumber inputId="stacked-buttons" value={value1} onValueChange={(e) => setValue1(e.value)} showButtons mode="currency" currency="USD" />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="minmax-buttons" className="font-bold block mb-2">Min-Max Boundaries</label>
                        <InputNumber 
                            inputId="minmax-buttons" 
                            value={value3} onValueChange={(e) => setValue3(e.value)} 
                            mode="decimal"
                            buttonLayout="stacked" 
                            incrementButtonIcon="pi pi-angle-up"
                            decrementButtonIcon="pi pi-angle-down" 
                            showButtons 
                            min={0} 
                            max={100} 
                        />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Horizontal with Step</label>
                        <InputNumber inputId="horizontal-buttons" value={value2} onValueChange={(e) => setValue2(e.value)} showButtons buttonLayout="horizontal" step={0.25}
                            decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            mode="currency" currency="EUR" />
                    </div>
                </div> */}
                <ButtonsDemo />

            </Card>
        </div>
    )
}