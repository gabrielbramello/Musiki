import React, { useEffect, useState } from 'react';
import Header from '../../components/menu/Header';
import TemplateDemo from '../../components/menu/TemplateDemo';
import RecommendationFilter from '../../components/forms/RecommendationFilter';
import './Recommendations.css';
import { Card } from 'primereact/card';
import { MultiSelect } from 'primereact/multiselect';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import InputsNumberFilter from '../../components/forms/InputsNumberFilter';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import DataTableFilter from '../../components/dataTable/dataTableFilter';
import axios from "../../apis/api";

export default function Recommendations() {

    const [selectedGenres, setSelectedGenres] = useState(null);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get('/spotify/genres/')
            .then(response => {
                console.log(response)
                setGenres(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [minKey, setMinKey] = useState(null);
    const [maxKey, setMaxKey] = useState(null);
    const [targetKey, setTargetKey] = useState(null);
    const keys = [
        { name: 'C', code: 0 },
        { name: 'C#/Db', code: 1 },
        { name: 'D', code: 2 },
        { name: 'D#/Eb', code: 3 },
        { name: 'E', code: 4 }
    ];

    const [selectedTimeSignatues, setSelectedTimeSignatures] = useState([]);
    const [minTimeSignature, setMinTimeSignature] = useState(null);
    const [maxTimeSignature, setMaxTimeSignature] = useState(null);
    const [targetTimeSignature, setTargetTimeSignature] = useState(null);

    const timeSignatures = [
        { name: '3/4', code: 3 },
        { name: '4/4', code: 4 },
        { name: '5/4', code: 5 },
        { name: '6/4', code: 6 },
        { name: '7/4', code: 7 }
    ];

    const [selectedMode, setSelectedMode] = useState(null);
    const [targetMode, setTargetMode] = useState()
    const modes = [
        { name: 'Menor', code: 0 },
        { name: 'Maior', code: 1 }
    ]

    function changeKeys(paramKeys, e) {
        console.log(e)
        console.log(paramKeys);
        const objetoSelecionado = e.selectedOption;
        if (paramKeys.length > 1) {
            var objetoComMaiorValue = paramKeys.reduce((max, obj) => (obj.code > max.code ? obj : max), paramKeys[0]);
            var objetoComMenorValue = paramKeys.reduce((min, obj) => (obj.code < min.code ? obj : min), paramKeys[0]);

            if (objetoSelecionado.code > objetoComMenorValue.code && objetoSelecionado.code < objetoComMaiorValue.code) {
                objetoComMaiorValue = keys.filter(key => key.code === objetoSelecionado.code - 1)[0];
            }

            const newSelectedKeys = keys.filter((key) => {
                if (key.code >= objetoComMenorValue.code && key.code <= objetoComMaiorValue.code) {
                    return key;
                }
            });

            setMinKey(objetoComMenorValue.code);
            setMaxKey(objetoComMaiorValue.code);
            setSelectedKeys(newSelectedKeys);
        } else {
            setSelectedKeys(paramKeys);
            setTargetKey(paramKeys[0].code)
        }
    }

    function changeTimeSignature(paramTimeSignatures, e) {
        console.log(e)
        console.log(paramTimeSignatures);
        const objetoSelecionado = e.selectedOption;
        if (paramTimeSignatures.length > 1) {
            var objetoComMaiorValue = paramTimeSignatures.reduce((max, obj) => (obj.code > max.code ? obj : max), paramTimeSignatures[0]);
            var objetoComMenorValue = paramTimeSignatures.reduce((min, obj) => (obj.code < min.code ? obj : min), paramTimeSignatures[0]);

            if (objetoSelecionado.code > objetoComMenorValue.code && objetoSelecionado.code < objetoComMaiorValue.code) {
                objetoComMaiorValue = timeSignatures.filter(timeSignature => timeSignature.code === objetoSelecionado.code - 1)[0];
            }

            const newSelectedTimeSignatures = timeSignatures.filter((timeSignature) => {
                if (timeSignature.code >= objetoComMenorValue.code && timeSignature.code <= objetoComMaiorValue.code) {
                    return timeSignature;
                }
            });

            setMinTimeSignature(objetoComMenorValue.code);
            setMaxTimeSignature(objetoComMaiorValue.code);
            setSelectedTimeSignatures(newSelectedTimeSignatures);
        } else {
            setTargetTimeSignature(paramTimeSignatures[0].code);
            setSelectedTimeSignatures(paramTimeSignatures);
        }
    }

    const [minAcousticness, setMinAcousticness] = useState(0);
    const [maxAcousticness, setMaxAcousticness] = useState(0);
    const [targetAcousticness, setTargetAcousticness] = useState(0);

    const [minDanceability, setMinDanceability] = useState(0);
    const [maxDanceability, setMaxDanceability] = useState(0);
    const [targetDanceability, setTargetDanceability] = useState(0);

    const [minDuration, setMinDuration] = useState(0);
    const [maxDuration, setMaxDuration] = useState(0);
    const [targetDuration, setTargetDuration] = useState(0);

    const [minEnergy, setMinEnergy] = useState(0);
    const [maxEnergy, setMaxEnergy] = useState(0);
    const [targetEnergy, setTargetEnergy] = useState(0);

    const [minInstrumentalness, setMinInstrumentalness] = useState(0);
    const [maxInstrumentalness, setMaxInstrumentalness] = useState(0);
    const [targetInstrumentalness, setTargetInstrumentalness] = useState(0);

    const [minLiveness, setMinLiveness] = useState(0);
    const [maxLiveness, setMaxLiveness] = useState(0);
    const [targetLiveness, setTargetLiveness] = useState(0);

    const [minLoudness, setMinLoudness] = useState(0);
    const [maxLoudness, setMaxLoudness] = useState(0);
    const [targetLoudness, setTargetLoudness] = useState(0);

    const [minPopularity, setMinPopularity] = useState(0);
    const [maxPopularity, setMaxPopularity] = useState(0);
    const [targetPopularity, setTargetPopularity] = useState(0);

    const [minSpeechiness, setMinSpeechiness] = useState(0);
    const [maxSpeechiness, setMaxSpeechiness] = useState(0);
    const [targetSpeechiness, setTargetSpeechiness] = useState(0);

    const [minTempo, setMinTempo] = useState(0);
    const [maxTempo, setMaxTempo] = useState(0);
    const [targetTempo, setTargetTempo] = useState(0);

    const [minValence, setMinValence] = useState(0);
    const [maxValence, setMaxValence] = useState(0);
    const [targetValence, setTargetValence] = useState(0);

    const acousticnessFilds = [
        { name: 'acousticness-min', label: 'Acústica Min.', value: minAcousticness, onValueChange: setMinAcousticness, mode: 'decimal' },
        { name: 'acousticness-max', label: 'Acústica Max.', value: maxAcousticness, onValueChange: setMaxAcousticness, mode: 'decimal' },
        { name: 'acousticness-target', label: 'Acústica Alvo', value: targetAcousticness, onValueChange: setTargetAcousticness, mode: 'decimal' },
    ]

    const danceabilityFilds = [
        { name: 'danceability-min', label: 'Dançabilidade Min.', value: minDanceability, onValueChange: setMinDanceability, mode: 'decimal' },
        { name: 'danceability-max', label: 'Dançabilidade Max.', value: maxDanceability, onValueChange: setMaxDanceability, mode: 'decimal' },
        { name: 'danceability-target', label: 'Dançabilidade Alvo', value: targetDanceability, onValueChange: setTargetDanceability, mode: 'decimal' },
    ]

    const durationFilds = [
        { name: 'duration-min', label: 'Duração Min.', value: minDuration, onValueChange: setMinDuration, mode: 'decimal' },
        { name: 'duration-max', label: 'Duração Max.', value: maxDuration, onValueChange: setMaxDuration, mode: 'decimal' },
        { name: 'duration-target', label: 'Duração Alvo', value: targetDuration, onValueChange: setTargetDuration, mode: 'decimal' },
    ]

    const energyFilds = [
        { name: 'energy-min', label: 'Energia Min.', value: minEnergy, onValueChange: setMinEnergy, mode: 'decimal' },
        { name: 'energyn-max', label: 'Energia Max.', value: maxEnergy, onValueChange: setMaxEnergy, mode: 'decimal' },
        { name: 'energy-target', label: 'Energia Alvo', value: targetEnergy, onValueChange: setTargetEnergy, mode: 'decimal' },
    ]

    const instrumentalnessFilds = [
        { name: 'instrumentalness-min', label: 'Instrumental Min.', value: minInstrumentalness, onValueChange: setMinInstrumentalness, mode: 'decimal' },
        { name: 'instrumentalness-max', label: 'Instrumental Max.', value: maxInstrumentalness, onValueChange: setMaxInstrumentalness, mode: 'decimal' },
        { name: 'instrumentalness-target', label: 'Instrumental Alvo', value: targetInstrumentalness, onValueChange: setTargetInstrumentalness, mode: 'decimal' },
    ]

    const livenessFilds = [
        { name: 'liveness-min', label: 'Ao Vivo Min.', value: minLiveness, onValueChange: setMinLiveness, mode: 'decimal' },
        { name: 'liveness-max', label: 'Ao Vivo Max.', value: maxLiveness, onValueChange: setMaxLiveness, mode: 'decimal' },
        { name: 'liveness-target', label: 'Ao Vivo Alvo', value: targetLiveness, onValueChange: setTargetLiveness, mode: 'decimal' },
    ]

    const loudnessFilds = [
        { name: 'loudness-min', label: 'Ruído Min.', value: minLoudness, onValueChange: setMinLoudness, mode: 'decimal' },
        { name: 'loudness-max', label: 'Ruído Max.', value: maxLoudness, onValueChange: setMaxLoudness, mode: 'decimal' },
        { name: 'loudness-target', label: 'Ruído Alvo', value: targetLoudness, onValueChange: setTargetLoudness, mode: 'decimal' },
    ]

    const popularityFilds = [
        { name: 'popularity-min', label: 'Popularidade Min.', value: minPopularity, onValueChange: setMinPopularity, mode: 'decimal' },
        { name: 'popularity-max', label: 'Popularidade Max.', value: maxPopularity, onValueChange: setMaxPopularity, mode: 'decimal' },
        { name: 'popularity-target', label: 'Popularidade Alvo', value: targetPopularity, onValueChange: setTargetPopularity, mode: 'decimal' },
    ]

    const speechinessFilds = [
        { name: 'speechiness-min', label: 'Fala Min.', value: minSpeechiness, onValueChange: setMinSpeechiness, mode: 'decimal' },
        { name: 'speechiness-max', label: 'Fala Max.', value: maxSpeechiness, onValueChange: setMaxSpeechiness, mode: 'decimal' },
        { name: 'speechiness-target', label: 'Fala Alvo', value: targetSpeechiness, onValueChange: setTargetSpeechiness, mode: 'decimal' },
    ]

    const tempoFilds = [
        { name: 'tempo-min', label: 'Tempo(BPM) Min.', value: minTempo, onValueChange: setMinTempo, mode: 'decimal' },
        { name: 'tempo-max', label: 'Tempo(BPM) Max.', value: maxTempo, onValueChange: setMaxTempo, mode: 'decimal' },
        { name: 'tempo-target', label: 'Tempo(BPM) Alvo', value: targetTempo, onValueChange: setTargetTempo, mode: 'decimal' },
    ]

    const valenceFilds = [
        { name: 'valence-min', label: 'Valência Min.', value: minValence, onValueChange: setMinValence, mode: 'decimal' },
        { name: 'valence-max', label: 'Valência Max.', value: maxValence, onValueChange: setMaxValence, mode: 'decimal' },
        { name: 'valence-target', label: 'Valência Alvo', value: targetValence, onValueChange: setTargetValence, mode: 'decimal' },
    ]

    function requestObjectBuilder() {
        const recommendationsFilterDTO = {
            limit: 20,
            seedGenres: selectedGenres.join(','),
            minAcousticness: minAcousticness.target.value,
            maxAcousticness: maxAcousticness.target.value,
            targetAcousticness: targetAcousticness.target.value,
            minDanceability: minDanceability.target.value,
            maxDanceability: maxDanceability.target.value,
            targetDanceability: targetDanceability.target.value,
            minDurationMs: minDuration.target.value,
            maxDurationMs: maxDuration.target.value,
            targetDurationMs: targetDuration.target.value,
            minEnergy: minEnergy.target.value,
            maxEnergy: maxEnergy.target.value,
            targetEnergy: targetEnergy.target.value,
            minInstrumentalness: minInstrumentalness.target.value,
            maxInstrumentalness: maxInstrumentalness.target.value,
            targetInstrumentalness: targetInstrumentalness.target.value,
            minKey: minKey,
            maxKey: maxKey,
            targetKey: targetKey,
            minLiveness: minLiveness.target.value,
            maxLiveness: maxLiveness.target.value,
            targetLiveness: targetLiveness.target.value,
            minLoudness: minLoudness.target.value,
            maxLoudness: maxLoudness.target.value,
            targetLoudness: targetLoudness.target.value,
            targetMode: targetMode,
            minPopularity: minPopularity.target.value,
            maxPopularity: maxPopularity.target.value,
            targetPopularity: targetPopularity.target.value,
            minSpeechiness: minSpeechiness.target.value,
            maxSpeechiness: maxSpeechiness.target.value,
            targetSpeechiness: targetSpeechiness.target.value,
            minTempo: minTempo.target.value,
            maxTempo: maxTempo.target.value,
            targetTempo: targetTempo.target.value,
            minTimeSignature: minTimeSignature,
            maxTimeSignature: maxTimeSignature,
            targetTimeSignature: targetTimeSignature,
            minValence: minValence.target.value,
            maxValence: maxValence.target.value,
            targetValence: targetValence.target.value
        };

        return recommendationsFilterDTO;
    }

    function recommendationsRequest() {
        console.log('Executei request')
        const recommendationsFilterDTO = requestObjectBuilder();
        console.log(recommendationsFilterDTO)
        axios.post('/spotify/recommendations/', recommendationsFilterDTO)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div style={{ background: 'linear-gradient(90deg, rgba(91,22,176,1) 22%, rgba(34,198,216,1) 66%)', minHeight: '90vh', display: 'flex', justifyContent: 'center', }}>
                <div style={{ width: '90vw', display: 'flex' }} >
                    <div id="sidebar" className="child child1">
                        <Card title="Advanced Card" className="md:w-25rem">
                            <div className="m-0">
                                <label htmlFor="genero" className="font-bold block mb-2">Genero(s)</label>
                                <MultiSelect inputId="genero" value={selectedGenres} onChange={(e) => setSelectedGenres(e.value)} options={genres}
                                    filter placeholder="Generos Selecionados" maxSelectedLabels={3} className="w-full md:w-20rem" />
                            </div>
                            <Divider />
                            <div className="m-0">
                                <label htmlFor="tonalidade" className="font-bold block mb-2">Tonalidade(s)</label>
                                <MultiSelect inputId="tonalidade" value={selectedKeys} onChange={(e) => { changeKeys(e.value, e) }} options={keys} optionLabel="name"
                                    placeholder="Selecione a tonalidade" maxSelectedLabels={5} className="w-full md:w-20rem" />
                            </div>
                            <Divider />
                            <div className="m-0">
                                <label htmlFor="modalidade" className="font-bold block mb-2">Modalidade</label>
                                <Dropdown value={selectedMode} onChange={(e) => setSelectedMode(e.value)} options={modes} optionLabel="name"
                                    placeholder="Selecione a modo" className="w-full md:w-20rem" />
                            </div>
                            <Divider />
                            <div className="m-0">
                                <label htmlFor="compasso" className="font-bold block mb-2">Compasso(s)</label>
                                <MultiSelect inputId="compasso" value={selectedTimeSignatues} onChange={(e) => { changeTimeSignature(e.value, e) }} options={timeSignatures} optionLabel="name"
                                    placeholder="Selecione o(s) compasso(s)" maxSelectedLabels={5} className="w-full md:w-20rem" />
                            </div>
                            <Divider />
                            <InputsNumberFilter itens={acousticnessFilds} />
                            <Divider />
                            <InputsNumberFilter itens={danceabilityFilds} />
                            <Divider />
                            <InputsNumberFilter itens={durationFilds} />
                            <Divider />
                            <InputsNumberFilter itens={energyFilds} />
                            <Divider />
                            <InputsNumberFilter itens={instrumentalnessFilds} />
                            <Divider />
                            <InputsNumberFilter itens={livenessFilds} />
                            <Divider />
                            <InputsNumberFilter itens={instrumentalnessFilds} />
                            <Divider />
                            <InputsNumberFilter itens={loudnessFilds} />
                            <Divider />
                            <InputsNumberFilter itens={popularityFilds} />
                            <Divider />
                            <InputsNumberFilter itens={speechinessFilds} />
                            <Divider />
                            <InputsNumberFilter itens={tempoFilds} />
                            <Divider />
                            <InputsNumberFilter itens={valenceFilds} />
                            <Divider />
                            <div className="m-0" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button label="Submit" onClick={recommendationsRequest}/>
                            </div>
                        </Card>
                    </div>
                    <div id="main" className="child child2">
                        <DataTableFilter />
                    </div>
                </div>

            </div>
        </div>
    )
}