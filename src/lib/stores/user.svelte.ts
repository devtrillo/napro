function getUserIdFromCookie() {
	const match = document.cookie.match(/(?:^|;\s*)userID=([^;]*)/);
	return match ? decodeURIComponent(match[1]) : 'anon';
}

let userID = $state(getUserIdFromCookie());

export const getUserId = () => userID;
export const updateUserId = (id?: string) => {
	if (!id) return;
	userID = id;
};
