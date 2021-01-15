export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        let another = new Period(budget.firstDay(), budget.lastDay());
        let firstDay = budget.firstDay();
        let lastDay = budget.lastDay();
        let overlappingStart = this.start.isAfter(firstDay)
            ? this.start
            : firstDay;
        let overlappingEnd = this.end.isBefore(lastDay)
            ? this.end
            : lastDay;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }
}