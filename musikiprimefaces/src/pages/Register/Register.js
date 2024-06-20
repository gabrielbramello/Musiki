import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import Header from '../../components/menu/Header';

export default function Register() {

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'center', }}>
                <div className="card flex justify-content-center">
                    <Card title="Advanced Card" subTitle="Card subtitle" style={{height: 'auto', boxSizing: 'content-box'}}className="md:w-25rem">
                        <div id="forms">
                            <div id="name">

                            </div>
                            <div id="username">

                            </div>
                            <div id="email">

                            </div>
                            <div id="password">

                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        </div>

    )
}