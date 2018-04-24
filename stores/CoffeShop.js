import React from "react";
import { extendObservable , computed} from "mobx";
import CoffeList from "../Components/CoffeList/list";

class CoffeShop {
    constructor() {
        extendObservable(this, {
            list: CoffeList,
            detail: {},
            orders: [],
            getStoreByName: computed(
                (name) => this.list.find(list => list.name == name)
            ),

        })
    }
}
export default new CoffeShop()
