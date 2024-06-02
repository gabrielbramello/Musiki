import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState } from 'react';

export default function InputsNumberFilter(props) {

    return (
        <div className="m-0 input-container">

            {props.itens.map(item => {
                return (
                    <div className='input'>
                        <label htmlFor={item.name+"-buttons"} className="font-bold block mb-2">{item.label}</label>
                        <InputNumber inputId={item.name+"-buttons"} value={props.value} onValueChange={item.onValueChange} mode={item.mode} showButtons min={item.min} max={item.max} />
                    </div>
                )
            })}
        </div>
    )


}