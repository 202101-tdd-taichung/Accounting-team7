import dayjs from "dayjs";
import {Budget} from "./Budget";

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
        if (end.isBefore(start)) {
            return 0;
        }
        const diffDays = end.diff(start, 'day') + 1;
        if (start.month() === end.month()) {
            return this.sameMonth(start, diffDays);
        }
        let totalAmount = 0;
        let currentMonth = start;
        while (end.date(1).add(1, 'month').isAfter(currentMonth)) {
            const budget = budgets[currentMonth.format('YYYYMM')];
            if (budget) {
                let overlappingDays;
                if (currentMonth.format('YYYYMM') === start.format('YYYYMM')) {
                    overlappingDays = budget.lastDay().diff(start, 'day') + 1;
                    // totalAmount += budget.dailyAmount() * overlappingDays;
                } else if (currentMonth.format('YYYYMM') === end.format('YYYYMM')) {
                    overlappingDays = end.diff(budget.firstDay(), 'day') + 1;
                    // totalAmount += budget.dailyAmount() * overlappingDays;
                } else {
                    overlappingDays = budget.lastDay().diff(budget.firstDay(), 'day') + 1;
                    // totalAmount += budget.dailyAmount() * overlappingDays;
                }
                totalAmount += budget.dailyAmount() * overlappingDays;
            }
            currentMonth = currentMonth.add(1, 'month');
        }

        return totalAmount;
    }

    sameMonth(month, diffDays) {
        const budget = budgets[month.format('YYYYMM')];
        if (budget) {
            const daysInMonth = dayjs(month).daysInMonth()
            return budget.amount / daysInMonth * diffDays;
        } else {
            return 0;
        }
    }
}
