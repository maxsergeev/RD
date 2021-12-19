import '../../api'
import {applyFilter, getCountCard} from "../../api";
import {cardAction} from "../card/action";
import {registryAction} from "./action";



export const filter__setFilter = (filter) => async (dispatch, state) => {
    try {
        // console.log(filter)
        const sendFilter = await applyFilter(filter);
        // console.log(sendFilter);
        const countFilterCard = await getCountCard(filter);
        // console.log(countFilterCard);
        dispatch(registryAction.getCountCard(countFilterCard));
        dispatch(registryAction.applyFilter(filter));
        dispatch(cardAction.updateList(sendFilter));

    }
    catch (e){
        console.error("Ошибка про отправке запрое", e)
    }
}