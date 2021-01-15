export class Period {
    start;
    end;

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    overlappingDays(another) {
        if (this.isInvalid() || this.hasNoOverlap(another)) {
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

    hasNoOverlap(another) {
        return this.end.isBefore(another.start) || this.start.isAfter(another.end);
    }

    isInvalid() {
        return this.end.isBefore(this.start);
    }
}