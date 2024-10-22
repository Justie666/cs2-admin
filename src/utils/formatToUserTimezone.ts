export function formatToUserTimezone(dateString: string): string {
	// Преобразуем строку в объект Date (UTC)
	const date = new Date(dateString)

	// Получаем смещение временной зоны пользователя в минутах
	const timezoneOffsetMinutes = date.getTimezoneOffset()

	// Применяем смещение к дате
	const userDate = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000)

	// Получаем компоненты даты с учётом локального времени пользователя
	const day = String(userDate.getDate()).padStart(2, '0') // День с ведущим нулём
	const month = String(userDate.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
	const year = userDate.getFullYear()

	// Получаем компоненты времени с учётом локального времени пользователя
	const hours = String(userDate.getHours()).padStart(2, '0')
	const minutes = String(userDate.getMinutes()).padStart(2, '0')

	// Форматируем в строку "dd.mm.yyyy hh:mm"
	return `${day}.${month}.${year} ${hours}:${minutes}`
}
