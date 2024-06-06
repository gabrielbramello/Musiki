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

    const [tracks, setTracks] = useState([])
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
        { name: 'acousticness-min', label: 'Acústica Min.', value: minAcousticness, onValueChange: (e)=>setMinAcousticness(e.value), mode: 'decimal' },
        { name: 'acousticness-max', label: 'Acústica Max.', value: maxAcousticness, onValueChange: (e)=>setMaxAcousticness(e.value), mode: 'decimal' },
        { name: 'acousticness-target', label: 'Acústica Alvo', value: targetAcousticness, onValueChange: (e)=>setTargetAcousticness(e.value), mode: 'decimal' },
    ]

    const danceabilityFilds = [
        { name: 'danceability-min', label: 'Dançabilidade Min.', value: minDanceability, onValueChange: (e)=>setMinDanceability(e.value), mode: 'decimal' },
        { name: 'danceability-max', label: 'Dançabilidade Max.', value: maxDanceability, onValueChange: (e)=>setMaxDanceability(e.value), mode: 'decimal' },
        { name: 'danceability-target', label: 'Dançabilidade Alvo', value: targetDanceability, onValueChange: (e)=>setTargetDanceability(e.value), mode: 'decimal' },
    ]

    const durationFilds = [
        { name: 'duration-min', label: 'Duração Min.', value: minDuration, onValueChange: (e)=>setMinDuration(e.value), mode: 'decimal' },
        { name: 'duration-max', label: 'Duração Max.', value: maxDuration, onValueChange: (e)=>setMaxDuration(e.value), mode: 'decimal' },
        { name: 'duration-target', label: 'Duração Alvo', value: targetDuration, onValueChange: (e)=>setTargetDuration(e.value), mode: 'decimal' },
    ]

    const energyFilds = [
        { name: 'energy-min', label: 'Energia Min.', value: minEnergy, onValueChange: (e)=>setMinEnergy(e.value), mode: 'decimal' },
        { name: 'energyn-max', label: 'Energia Max.', value: maxEnergy, onValueChange: (e)=>setMaxEnergy(e.value), mode: 'decimal' },
        { name: 'energy-target', label: 'Energia Alvo', value: targetEnergy, onValueChange: (e)=>setTargetEnergy(e.value), mode: 'decimal' },
    ]

    const instrumentalnessFilds = [
        { name: 'instrumentalness-min', label: 'Instrumental Min.', value: minInstrumentalness, onValueChange: (e)=>setMinInstrumentalness(e.value), mode: 'decimal' },
        { name: 'instrumentalness-max', label: 'Instrumental Max.', value: maxInstrumentalness, onValueChange: (e)=>setMaxInstrumentalness(e.value), mode: 'decimal' },
        { name: 'instrumentalness-target', label: 'Instrumental Alvo', value: targetInstrumentalness, onValueChange: (e)=>setTargetInstrumentalness(e.value), mode: 'decimal' },
    ]

    const livenessFilds = [
        { name: 'liveness-min', label: 'Ao Vivo Min.', value: minLiveness, onValueChange: (e)=>setMinLiveness(e.value), mode: 'decimal' },
        { name: 'liveness-max', label: 'Ao Vivo Max.', value: maxLiveness, onValueChange: (e)=>setMaxLiveness(e.value), mode: 'decimal' },
        { name: 'liveness-target', label: 'Ao Vivo Alvo', value: targetLiveness, onValueChange: (e)=>setTargetLiveness(e.value), mode: 'decimal' },
    ]

    const loudnessFilds = [
        { name: 'loudness-min', label: 'Ruído Min.', value: minLoudness, onValueChange: (e)=>setMinLoudness(e.value), mode: 'decimal' },
        { name: 'loudness-max', label: 'Ruído Max.', value: maxLoudness, onValueChange: (e)=>setMaxLoudness(e.value), mode: 'decimal' },
        { name: 'loudness-target', label: 'Ruído Alvo', value: targetLoudness, onValueChange: (e)=>setTargetLoudness(e.value), mode: 'decimal' },
    ]

    const popularityFilds = [
        { name: 'popularity-min', label: 'Popularidade Min.', value: minPopularity, onValueChange: (e)=>setMinPopularity(e.value), mode: 'decimal' },
        { name: 'popularity-max', label: 'Popularidade Max.', value: maxPopularity, onValueChange: (e)=>setMaxPopularity(e.value), mode: 'decimal' },
        { name: 'popularity-target', label: 'Popularidade Alvo', value: targetPopularity, onValueChange: (e)=>setTargetPopularity(e.value), mode: 'decimal' },
    ]

    const speechinessFilds = [
        { name: 'speechiness-min', label: 'Fala Min.', value: minSpeechiness, onValueChange: (e)=>setMinSpeechiness(e.value), mode: 'decimal' },
        { name: 'speechiness-max', label: 'Fala Max.', value: maxSpeechiness, onValueChange: (e)=>setMaxSpeechiness(e.value), mode: 'decimal' },
        { name: 'speechiness-target', label: 'Fala Alvo', value: targetSpeechiness, onValueChange: (e)=>setTargetSpeechiness(e.value), mode: 'decimal' },
    ]

    const tempoFilds = [
        { name: 'tempo-min', label: 'Tempo(BPM) Min.', value: minTempo, onValueChange: (e)=>setMinTempo(e.value), mode: 'decimal' },
        { name: 'tempo-max', label: 'Tempo(BPM) Max.', value: maxTempo, onValueChange: (e)=>setMaxTempo(e.value), mode: 'decimal' },
        { name: 'tempo-target', label: 'Tempo(BPM) Alvo', value: targetTempo, onValueChange: (e)=>setTargetTempo(e.value), mode: 'decimal' },
    ]

    const valenceFilds = [
        { name: 'valence-min', label: 'Valência Min.', value: minValence, onValueChange: (e)=>setMinValence(e.value), mode: 'decimal' },
        { name: 'valence-max', label: 'Valência Max.', value: maxValence, onValueChange: (e)=>setMaxValence(e.value), mode: 'decimal' },
        { name: 'valence-target', label: 'Valência Alvo', value: targetValence, onValueChange: (e)=>setTargetValence(e.value), mode: 'decimal' },
    ]

    function requestObjectBuilder() {
        const recommendationsFilterDTO = {
            limit: 20,
            seedGenres: selectedGenres.join(','),
            minAcousticness: minAcousticness/100,
            maxAcousticness: maxAcousticness/100,
            targetAcousticness: targetAcousticness/100,
            minDanceability: minDanceability/100,
            maxDanceability: maxDanceability/100,
            targetDanceability: targetDanceability/100,
            minDurationMs: minDuration,
            maxDurationMs: maxDuration,
            targetDurationMs: targetDuration,
            minEnergy: minEnergy/100,
            maxEnergy: maxEnergy/100,
            targetEnergy: targetEnergy/100,
            minInstrumentalness: minInstrumentalness/100,
            maxInstrumentalness: maxInstrumentalness/100,
            targetInstrumentalness: targetInstrumentalness/100,
            minKey: minKey,
            maxKey: maxKey,
            targetKey: targetKey,
            minLiveness: minLiveness/100,
            maxLiveness: maxLiveness/100,
            targetLiveness: targetLiveness/100,
            minLoudness: minLoudness,
            maxLoudness: maxLoudness,
            targetLoudness: targetLoudness,
            targetMode: targetMode,
            minPopularity: minPopularity/100,
            maxPopularity: maxPopularity/100,
            targetPopularity: targetPopularity/100,
            minSpeechiness: minSpeechiness/100,
            maxSpeechiness: maxSpeechiness/100,
            targetSpeechiness: targetSpeechiness/100,
            minTempo: minTempo,
            maxTempo: maxTempo,
            targetTempo: targetTempo,
            minTimeSignature: minTimeSignature,
            maxTimeSignature: maxTimeSignature,
            targetTimeSignature: targetTimeSignature,
            minValence: minValence/100,
            maxValence: maxValence/100,
            targetValence: targetValence/100
        };

        return recommendationsFilterDTO;
    }

    function recommendationsRequest() {
        console.log('Executei request')
        const recommendationsFilterDTO = requestObjectBuilder();
        console.log(recommendationsFilterDTO)
        axios.post('/spotify/recommendations/', recommendationsFilterDTO)
            .then(response => {
                setTracks(response.data.tracks);
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
                        <DataTableFilter tracks={tracks}/>
                    </div>
                </div>

            </div>
        </div>
    )
}