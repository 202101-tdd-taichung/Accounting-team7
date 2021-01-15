export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        let overlappingEnd = this.end.isBefore(budget.lastDay())
            ? this.end
            : budget.lastDay();
        let overlappingStart = this.start.isAfter(budget.firstDay())
            ? this.start
            : budget.firstDay();
        if (budget.yearMonth === this.start.format('YYYYMM')) {
            // overlappingEnd = budget.lastDay();
        } else if (budget.yearMonth === this.end.format('YYYYMM')) {
            // overlappingEnd = this.end;
        } else {
            // overlappingEnd = budget.lastDay();
        }
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}