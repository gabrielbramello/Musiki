import React from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "../../App.css";
import Header from '../../components/menu/Header';
import { Menu } from 'primereact/menu';

export default function UserPage() {

    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {

                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {

                    }
                }
            ]
        },
        {
            label: 'Navigate',
            items: [
                {
                    label: 'React Website',
                    icon: 'pi pi-external-link',
                    url: 'https://reactjs.org/'
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command: (e) => {

                    }
                }
            ]
        }
    ];

    return (
        <div>
            <Header />
            <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex'}}>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '20px', height: '100%'}}>
                    <Menu style={{height: '100vh'}} model={items} />
                </div>
                <div className="card" style={{ flex: '1', margin: '20px', backgroundColor: 'white'}}>
                   fsdf
                </div>
            </div>

        </div>

    )
}
