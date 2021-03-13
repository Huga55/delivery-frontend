import React, {useEffect, useState} from "react";
import {getAddressFromCoordinates, setMapActiveAction} from "../../../redux/reducers/form-reducer";
import {Map, SearchControl, YMaps} from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

const HocLayout = ({children}) => {
    const [isMap, setIsMap] = useState(false);

    const { activeMap } = useSelector(state => state.form);

    const dispatch = useDispatch();

    //yandex map

    useEffect(() => {
        if(activeMap) {
            setIsMap(true);
        }
    }, [activeMap])

    const closeMap = () => {
        setIsMap(false);
        dispatch(setMapActiveAction(null));
    }

    const currentAddress = (e) => {
        const coordinates = e.get('coords');
        dispatch(getAddressFromCoordinates(coordinates, activeMap));
        closeMap();
    }

    const mapData = {
        center: [55.751574, 37.573856],
        zoom: 10,
    };

    return (
        <>
            {
                isMap?
                    <YMaps>
                        <div className="yandex yandex_active">
                            <div className="yandex__bg" onClick={closeMap} />
                            <Map defaultState={mapData} width="90vw" height="60vh" searchControlProvider='yandex#search'
                                 onClick={(e) => currentAddress(e)}
                                 options={ {mapAutoFocus:true} }>
                                <SearchControl options={{ float: 'right' }} />
                            </Map>
                        </div>
                    </YMaps> : ""
            }
            {children}
        </>
    );
}

export default HocLayout;