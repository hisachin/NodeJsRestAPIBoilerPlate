import moment from 'moment';

export class DateHelper{

    static async isDateAfter(date){
        return moment().isAfter(date);
    }
}