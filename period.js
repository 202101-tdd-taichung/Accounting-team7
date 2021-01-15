export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(another) {
        if (this.end.isBefore(this.start)) {
            return 0;
        }
        if (this.end.isBefore(another.start) || this.start.isAfter(another.end)) {
            return 0;
        }
        let overlappingStart = this.start.isAfter(another.start)
            ? this.start
            : another.start;
        let overlappingEnd = this.end.isBefore(another.end)
            ? this.end
            : another.end;
        return overlappingEnd.diff(overlappingStart, 'day') + 1;
    }
}