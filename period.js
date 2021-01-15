export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(another) {
        let overlappingEnd = this.end.isBefore(another.end)
            ? this.end
            : another.end;
        let overlappingStart = this.start.isAfter(another.start)
            ? this.start
            : another.start;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }

}