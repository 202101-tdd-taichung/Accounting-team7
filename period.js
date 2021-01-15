export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        if (budget.yearMonth === this.start.format('YYYYMM')) {
            return budget.lastDay().diff(this.start, 'day') + 1;
        } else if (budget.yearMonth === this.end.format('YYYYMM')) {
            return this.end.diff(budget.firstDay(), 'day') + 1;
        } else {
            return budget.lastDay().diff(budget.firstDay(), 'day') + 1;
        }
    }
}