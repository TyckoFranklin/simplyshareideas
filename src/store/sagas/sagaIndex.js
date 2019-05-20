import { fork } from "redux-saga/effects";
import * as sagas from './saga';


export default function* () {
    if(sagas !== null && sagas !== undefined){
        const forkedSagas = Object.keys(sagas).map(k => fork(sagas[k]));
        yield [...forkedSagas];
    }
}