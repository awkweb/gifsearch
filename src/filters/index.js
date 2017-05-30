import moment from 'moment'

export function prettyDate (dateString) {
	return moment(dateString, 'YYYY-MM-DD HH:mm:ss').fromNow()
}
