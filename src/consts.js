const Statuses = {
	primary: 'primary',
	success: 'success',
	info: 'info',
	danger: 'danger',
};

const ListNamesByStatus = {
	[Statuses.primary]: 'беклог',
	[Statuses.success]: 'в процессе',
	[Statuses.info]: 'выполнено',
	[Statuses.danger]: 'корзина',
};

const API_URL = "https://671be8992c842d92c381b8c6.mockapi.io/api/v1";

export { Statuses, ListNamesByStatus, API_URL };

