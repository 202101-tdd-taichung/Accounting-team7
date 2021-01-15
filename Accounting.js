import dayjs from "dayjs";
import {Budget} from "./Budget";
import {Period} from "./period";

const budgets = {
    "202101": new Budget("202101", 31),
    "202102": new Budget("202102", 280),
    "202103": new Budget("202103", 3100),
    "202104": new Budget("202104", 30),
    "202105": new Budget("202105", 310),
    "202106": new Budget("202106", 3000),
    "202107": new Budget("202107", 0),
    "202109": new Budget("202109", 30),
    "202110": new Budget("202110", 310),
    "202111": new Budget("202111", 3000),
    "202112": new Budget("202112", 31),
}
// const budgets = {
//     "202101": 31,
//     "202102": 280,
//     "202103": 3100,
//     "202104": 30,
//     "202105": 310,
//     "202106": 3000,
//     "202107": 0,
//     "202109": 30,
//     "202110": 310,
//     "202111": 3000,
//     "202112": 31
// }

export class Accounting {

    totalAmount(s, e) {

        let start = dayjs(s);
        let end = dayjs(e);
        let period = new Period(start, end);
        let totalAmount = 0;
        for (let key in budgets) {
            let budget = budgets[key];
            let overlappingAmount = budget.overlappingAmount(period);
            totalAmount += overlappingAmount;
        }

        return totalAmount;
    }

}
