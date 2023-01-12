import React, { useState } from 'react';
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { TabMenu } from 'primereact/tabmenu';

export default function Menu() {

    const [activeIndex, setActiveIndex] = useState(5);

    const items = [
        { label: 'Pagina Inicial', icon: 'pi pi-fw pi-home', },
        { label: 'Artistas', icon: 'pi pi-fw pi-at' },
        { label: 'Albums', icon: 'pi pi-fw pi-book' },
        { label: 'Musicas', icon: 'pi pi-fw pi-volume-up' },
        { label: 'Pagina do Usuario', icon: 'pi pi-fw pi-user' },
        { label: 'Configurações', icon: 'pi pi-fw pi-cog' }

    ];

    return (
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
    )
}
