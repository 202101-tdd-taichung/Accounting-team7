import {Accounting} from "./Accounting";

function getAll(dataKey) {
    let dataGroup = {
        // 7月是0，8月有缺
        "1": {
            "202101": 31,
            "202102": 280,
            "202103": 3100,
            "202104": 30,
            "202105": 310,
            "202106": 3000,
            "202107": 0,
            "202109": 30,
            "202110": 310,
            "202111": 3000,
            "202112": 31,
            "202201": 310
        },
        // 11月是0，7月有缺
        "2": {
            "202101": 310,
            "202102": 2800,
            "202103": 31,
            "202104": 300,
            "202105": 3100,
            "202106": 30,
            "202108": 310,
            "202109": 3000,
            "202110": 31,
            "202111": 0,
            "202112": 3100,
            "202201": 31
        },
        // 9月是0，4月有缺
        "3": {
            "202101": 620,
            "202102": 5600,
            "202103": 62,
            "202105": 6200,
            "202106": 60,
            "202107": 620,
            "202108": 6200,
            "202109": 0,
            "202110": 620,
            "202111": 6000,
            "202112": 62,
            "202201": 620
        }
    }
    return dataGroup[`${dataKey}`];
}

describe('Accounting service', () => {
    let accounting = new Accounting();
    beforeEach(() => {
        accounting = new Accounting();
    });
    it("same day same month", () => {
        expect(accounting.totalAmount('20210101', '20210101')).toBe(1);
    });

    it("same month multi days", () => {
        expect(accounting.totalAmount('20210205', '20210207')).toBe(30);
    });

    it("no data", () => {
        expect(accounting.totalAmount('20210801', '20210801')).toBe(0);
    });

    it("zero data", () => {
        expect(accounting.totalAmount('20210701', '20210701')).toBe(0);
    });

    it("start > end", () => {
        expect(accounting.totalAmount('20210902', '20210901')).toBe(-1);
    });
})

