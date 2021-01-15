export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        let overlappingStart = this.start.isAfter(budget.firstDay())
            ? this.start
            : budget.firstDay();
        let overlappingEnd;
        if (budget.yearMonth === this.start.format('YYYYMM')) {
            // overlappingStart = this.start;
            overlappingEnd = budget.lastDay();
        } else if (budget.yearMonth === this.end.format('YYYYMM')) {
            // overlappingStart = budget.firstDay();
            overlappingEnd = this.end;
        } else {
            // overlappingStart = budget.firstDay();
            overlappingEnd = budget.lastDay();
        }
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }
}