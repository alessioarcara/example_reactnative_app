import moment from 'moment'

export function getReadableDate(date: Date): string {
    // return date.toLocaleDateString('en-EN', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit'
    // })
    return moment(date).format('MMMM Do YYYY, hh:mm')
}