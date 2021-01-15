export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget) {
        let another = new Period(budget.firstDay(), budget.lastDay());
        let lastDay = another.end;
        let firstDay = another.start;
        let overlappingEnd = this.end.isBefore(lastDay)
            ? this.end
            : lastDay;
        let overlappingStart = this.start.isAfter(firstDay)
            ? this.start
            : firstDay;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}