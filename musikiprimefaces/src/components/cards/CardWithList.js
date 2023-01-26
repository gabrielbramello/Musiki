import React, { useEffect, useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                           //icons
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CardWithList = (props) => {

    function convertMilliseconds(data) {
        var minutes = Math.floor(data.durationMs / 60000);
        var seconds = ((data.durationMs % 60000) / 1000).toFixed(0);
        return "" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <div>
            <Card className="card" title={props.title} style={{ width: props.width, marginBottom: props.bottom, margin: '10px' }}>
                <DataTable value={props.content} scrollable scrollHeight="400px" responsiveLayout="scroll">
                    <Column field="trackNumber" header="Nº. Faixa"></Column>
                    <Column field="discNumber" header="Nº. Disco"></Column>
                    <Column field="name" header="Título"></Column>
                    <Column body={convertMilliseconds} header="Duração"></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default CardWithList;