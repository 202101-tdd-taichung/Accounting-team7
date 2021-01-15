export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        let lastDay = budget.lastDay();
        let firstDay = budget.firstDay();
        let overlappingEnd = this.end.isBefore(lastDay)
            ? this.end
            : lastDay;
        let overlappingStart = this.start.isAfter(firstDay)
            ? this.start
            : firstDay;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}