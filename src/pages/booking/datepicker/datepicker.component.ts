import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Slides } from "ionic-angular";

import moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'datepicker',
    templateUrl: 'datepicker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePicker {
    @ViewChild('datepicker') datepicker: Slides;
    @ViewChild('dateSwiperNext') dateSwiperNext: ElementRef;
    @ViewChild('dateSwiperPrev') dateSwiperPrev: ElementRef;

    public dates: Date[];

    @Input("dates")
    set datesPublic(val: Date[]) {
        this.dates = _.clone(val);

        if (val.length < 7) {
            let before = Math.round((7 - val.length) / 2);
            let after = 7 - val.length - before;
            _.times(before, (i) => {
                let date = moment(this.dates[0]).subtract(1, "day").toDate();
                date['inactive'] = true;
                this.dates.splice(0, 0, date);
            });
            _.times(after, (i) => {
                let date = moment(this.dates[this.dates.length - 1]).add(1, "day").toDate();
                date['inactive'] = true;
                this.dates.push(date);
            });
        }
    }
    get datesPublic(): Date[] {
        return this.dates;
    }

    @Input() selected: Date;
    @Output() change = new EventEmitter<Date>();

    constructor() {
    }

    ngAfterViewInit() {
        this.datepicker.nextButton = this.dateSwiperNext.nativeElement;
        this.datepicker.prevButton = this.dateSwiperPrev.nativeElement;
    }

    onDateChange(date: Date) {
        this.change.emit(date);
    }
}