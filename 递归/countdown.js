function countdown(num) {
	setTimeout(() => {
		console.log(num);
		num--;
		if (num > 0) countdown(num);
	}, 1000);
}
countdown(10);
