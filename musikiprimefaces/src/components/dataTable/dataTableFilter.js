
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Link, useNavigate } from 'react-router-dom';
import './dataTableFilter.css';

export default function DataTableFilter(props) {

    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };


    /*     const albumBodyTemplate = (rowData) => {
            const album = rowData.album;
    
            return (
                <div className="flex align-items-center gap-2">
                    <img alt={album.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
                    <span>{album.name}</span>
                </div>
            );
        }; */

    const artistBodyTemplate = (rowData) => {
        const artists = rowData.artists;

        return (
            <div>
                {artists.map((artist) => {
                    return (
                        <div className="flex align-items-center gap-2">
                            <span>{artist.name}</span>
                        </div>
                    )
                })}
            </div>

        );
    };


    const idBodyTemplate = (rowData, i ) => {
        return i.rowIndex + 1;
    }


    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
                <span>{option.name}</span>
            </div>
        );
    };

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="Any"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };

    const header = renderHeader();

    function linkTo(value){
        const url = `/track/${value.id}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    return (
        <div className="card" style={{width:'100%', height:'100%', borderRadius: '15px', backgroundColor:'#ffffff'}}>
            <DataTable
                style={{width:'100%', height:'100%', borderRadius: '30px'}}
                scrollable scrollHeight="700px"
                value={props.tracks}
                paginator rows={15}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                loading={loading}
                globalFilterFields={['name', 'country.name', 'representative.name', 'status']}
                emptyMessage="Nenhuma música encontrada."
                selectionMode="single"
                onSelectionChange={(e) =>linkTo(e.value)}
                >

                {/*<Column field="id" body={idBodyTemplate} header="Id" style={{ minWidth: '12rem' }} /> */}
                <Column header="Nome" field="name" filterField="name" style={{ minWidth: '12rem' }} filter filterPlaceholder="Pesquisa por nome da faixa" />
                <Column header="Artista" body={artistBodyTemplate} filterField="artists[0].name" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    filter filterPlaceholder="Pesquisa por nome do artista" />
                {/* <Column header="Gêneros" filterField="track.album.genres" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" /> */}
            </DataTable>
        </div>
    );
}
