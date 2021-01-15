import dayjs from "dayjs";
import {Period} from "./period";

export class Budget {
    yearMonth;
    amount;

    constructor(yearMonth, amount) {
        this.yearMonth = yearMonth;
        this.amount = amount;
    }

    firstDay() {
        return dayjs(`${this.yearMonth}01`);
    }

    lastDay() {
        return this.firstDay().endOf('month');
    }

    totalDays() {
        return this.firstDay().daysInMonth();
    }

    dailyAmount() {
        return this.amount / this.totalDays();
    }

    createPeriod() {
        return new Period(this.firstDay(), this.lastDay());
    }

    overlappingAmount(period) {
        return this.dailyAmount() * period.overlappingDays(this.createPeriod());
    }
}