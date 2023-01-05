import moment from 'moment'
import 'moment/dist/locale/pt-br';
moment.locale('pt-br')

export const convertDateToString = (date: string) => {
    return moment(date).locale('pt').format("ddd D MMM");
}