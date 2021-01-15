import dayjs from "dayjs";
import {Budget} from "./Budget";

const yearBudget = {
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
// const yearBudget = {
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
        if (end.isBefore(start)) {
            return 0;
        }
        const diffDays = end.diff(start, 'day') + 1;
        if (start.month() === end.month()) {
            return this.sameMonth(start, diffDays);
        }
        //先取得中間完整月份的預算
        let totalAmount = 0;

        let currentMonth = start;
        while (end.add(1, 'month').date(1).isAfter(currentMonth)) {
            const budget = yearBudget[currentMonth.format('YYYYMM')];
            if (budget) {
                if (currentMonth.format('YYYYMM') === start.format('YYYYMM')) {
                    const overlappingDaysOfFirstMonth = budget.lastDay().diff(start, 'day') + 1;
                    let firstBudget = budget.amount / budget.totalDays() * overlappingDaysOfFirstMonth;
                    totalAmount += firstBudget;
                } else if (currentMonth.format('YYYYMM') === end.format('YYYYMM')) {
                    let overlappingDaysOfLastMonth = end.diff(end.date(1), 'day') + 1;
                    let overlappingAmountOfLastMonth = budget.amount / end.daysInMonth() * overlappingDaysOfLastMonth;
                    totalAmount += overlappingAmountOfLastMonth;
                } else {
                    let overlappingDaysOfMiddleMonth = currentMonth.endOf('month').diff(currentMonth.date(1), 'day') + 1;
                    let overlappingAmountOfMiddleMonth = budget.amount / currentMonth.daysInMonth() * overlappingDaysOfMiddleMonth;
                    totalAmount += overlappingAmountOfMiddleMonth;
                }
            }
            currentMonth = currentMonth.add(1, 'month');
        }
        return totalAmount;

    }

    sameMonth(month, diffDays) {
        const budget = yearBudget[month.format('YYYYMM')];
        if (budget) {
            const days = dayjs(month).daysInMonth()
            return budget.amount / days * diffDays;
        } else {
            return 0;
        }
    }
}
