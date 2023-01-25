import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                           //icons
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CardWithList = (props) => {



    return (
        <div>
            <Card className="card" title={props.title} style={{ width: props.width, marginBottom: props.bottom, margin: '10px' }}>
                <DataTable value={props.content} scrollable scrollHeight="400px" responsiveLayout="scroll">
                    <Column field="trackNumber" header="Nº. Faixa"></Column>
                    <Column field="discNumber" header="Nº. Disco"></Column>
                    <Column field="name" header="Título"></Column>
                    <Column field="durationMs" header="Duração"></Column>
                </DataTable>
            </Card>
        </div>
    )
}
export default CardWithList;