export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        if (budget.yearMonth === this.start.format('YYYYMM')) {
            let overlappingStart = this.start;
            let overlappingEnd = budget.lastDay();
            return overlappingEnd.diff(overlappingStart, 'day') + 1;
        } else if (budget.yearMonth === this.end.format('YYYYMM')) {
            let overlappingStart = budget.firstDay();
            let overlappingEnd = this.end;
            return overlappingEnd.diff(overlappingStart, 'day') + 1;
        } else {
            let overlappingStart = budget.firstDay();
            let overlappingEnd = budget.lastDay();
            return overlappingEnd.diff(overlappingStart, 'day') + 1;
        }
    }
}