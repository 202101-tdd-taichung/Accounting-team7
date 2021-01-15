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
            return 0;
        }
        const diffDays = end.diff(start, 'day') + 1;
        // if (diffDays === 0) {
        //     return this.sameMonth(start);
        // }
        const sameMonth = start.month() === end.month();
        if (sameMonth) {
            return this.sameMonth(start, diffDays);
        }
        return this.crossMonth(start, end);
        // return 1;
    }

    crossMonth(startDate, endDate) {
        //先取得中間完整月份的預算
        const middleMonthDiff = endDate.diff(startDate, 'month');
        let middleBudget = 0;
        for (let i = 1; i <= middleMonthDiff; i++) {
            const nextMonth = startDate.add(i, 'month');
            // const nextBudget = this.sameMonth(nextMonth, nextMonth.get('date'));
            const nextBudget = this.sameMonth(nextMonth, nextMonth.daysInMonth());
            middleBudget += nextBudget;
        }

        //
        const startToEnd = dayjs(startDate).daysInMonth();
        const firstMonthDays = startToEnd - startDate.get('date') + 1;
        //計算前後半段的額度
        const firstBudget = this.sameMonth(startDate, firstMonthDays);
        const endBudget = this.sameMonth(endDate, endDate.get('date'));

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
