export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        if (budget.yearMonth === this.start.format('YYYYMM')) {
            let overlappingEnd = budget.lastDay();
            let overlappingStart = this.start;
            return overlappingEnd.diff(overlappingStart, 'day') + 1;
        } else if (budget.yearMonth === this.end.format('YYYYMM')) {
            let overlappingEnd = this.end;
            let overlappingStart = budget.firstDay();
            return overlappingEnd.diff(overlappingStart, 'day') + 1;
        } else {
            let overlappingEnd = budget.lastDay();
            let overlappingStart = budget.firstDay();
            return overlappingEnd.diff(overlappingStart, 'day') + 1;
        }
    }

}