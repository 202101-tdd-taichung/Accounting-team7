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
        }        //先取得中間完整月份的預算
        const middleMonthDiff = end.diff(start, 'month');
        let totalAmount = 0;
        for (let i = 0; i <= middleMonthDiff; i++) {
            const currentMonth = start.add(i, 'month');
            if (currentMonth.format('YYYYMM') === start.format('YYYYMM')) {
                const startToEnd = dayjs(start).daysInMonth();
                const firstMonthDays = startToEnd - start.get('date') + 1;
                const firstBudget = this.sameMonth(start, firstMonthDays);
                totalAmount += firstBudget;
            } else {
                const nextBudget = this.sameMonth(currentMonth, currentMonth.daysInMonth());
                totalAmount += nextBudget;
            }

        }

        //計算前後半段的額度
        const endBudget = this.sameMonth(end, end.get('date'));

        return endBudget + totalAmount;
        // return firstBudget + endBudget + totalAmount;
    }

    sameMonth(month, diffDays) {
        const days = dayjs(month).daysInMonth()
        const budget = budgets[month.format('YYYYMM')];
        if (!budget) {
            return 0;
        }
        return budget.amount / days * diffDays;
    }
}
