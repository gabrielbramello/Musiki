import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                           //icons
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';

const SimpleCard = (props) => {

    function renderContent(content, isRating) {
        if (isRating) {
            return <Rating value={classifyRating(content)} readOnly stars={5} cancel={false} />

        } else {
            return <p className="m-0" style={{ lineHeight: '1.5' }}>{content}</p>
        }
    }

    function classifyRating(nota) {

        var estrelas

        if (nota <= 25) {
            estrelas = 2
        }
        if (nota > 25 && nota <= 50) {
            estrelas = 3
        }
        if (nota > 50 && nota <= 75) {
            estrelas = 4
        }
        if (nota > 75 && nota <= 100) {
            estrelas = 5
        }
        return estrelas
    }

    return (
        <div>
            <Card className="card" title={props.title} style={{ width: props.width, marginBottom: props.bottom, height: "100px", margin: '40px' }}>
                {renderContent(props.content, props.isRating)}
            </Card>
        </div>
    )
}
export default SimpleCard;