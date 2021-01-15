import dayjs from "dayjs";


const yearBudget = {
    "202101": 31,
    "202102": 280,
    "202103": 3100,
    "202104": 30,
    "202105": 310,
    "202106": 3000,
    "202107": 0,
    "202109": 30,
    "202110": 310,
    "202111": 3000,
    "202112": 31
}

export class Accounting {

    totalAmount(s, e) {

        // TODO
        let start = dayjs(s);
        let end = dayjs(e);
        if (end.isBefore(start)) {
            return -1;
        }
        const diffDays = end.diff(start, 'day') + 1;
        // if (diffDays === 0) {
        //     return this.sameMonth(start);
        // }
        const sameMonth = start.month() === end.month();
        if (sameMonth) {
            return this.sameMonth(start, diffDays);
        }
        return 1;
    }

    sameMonth(month, diffDays) {
        const days = dayjs(month).daysInMonth()
        const originData = yearBudget[month.format('YYYYMM')];
        if (!originData) {
            return 0;
        }
        return originData / days * diffDays;
    }
}
