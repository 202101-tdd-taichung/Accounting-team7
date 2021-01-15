import dayjs from "dayjs";
import {Budget} from "./Budget";
import {Period} from "./period";

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
                let period = new Period(start, end);
                let overlappingDays = this.overlappingDays(budget, period);
                totalAmount += budget.dailyAmount() * overlappingDays;
            }
            currentMonth = currentMonth.add(1, 'month');
        }
        return totalAmount;

    }

    overlappingDays(budget, period) {
        if (budget.yearMonth === period.start.format('YYYYMM')) {
            return budget.lastDay().diff(period.start, 'day') + 1;
        } else if (budget.yearMonth === period.end.format('YYYYMM')) {
            return period.end.diff(period.end.date(1), 'day') + 1;
        } else {
            return budget.lastDay().diff(budget.firstDay(), 'day') + 1;
        }
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
