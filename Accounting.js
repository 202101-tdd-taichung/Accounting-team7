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
        let start = dayjs(s);
        let end = dayjs(e);
        if (end.isBefore(start)) {
            return 0;
        }
        const diffDays = end.diff(start, 'day') + 1;
        const sameMonth = start.month() === end.month();
        if (sameMonth) {
            return this.sameMonth(start, diffDays);
        }
        //先取得中間完整月份的預算
        const middleMonthDiff = end.diff(start, 'month');
        let middleBudget = 0;
        for (let i = 1; i <= middleMonthDiff; i++) {
            const nextMonth = start.add(i, 'month');
            const nextBudget = this.sameMonth(nextMonth, nextMonth.daysInMonth());
            middleBudget += nextBudget;
        }

        const startToEnd = dayjs(start).daysInMonth();
        const firstMonthDays = startToEnd - start.get('date') + 1;
        //計算前後半段的額度
        const firstBudget = this.sameMonth(start, firstMonthDays);
        const endBudget = this.sameMonth(end, end.get('date'));

        return firstBudget + endBudget + middleBudget;
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
