export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(budget, another) {
        let overlappingStart = this.start.isAfter(another.start)
            ? this.start
            : another.start;
        let overlappingEnd = this.end.isBefore(another.end)
            ? this.end
            : another.end;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }
}