function _DateTime() {

}

_DateTime._fixLength = function(a) {
	a = a + "";
	if (a.length < 2)
		return "0" + a;
	else
		return a;
};

_DateTime._getThisMonthFirstDay = function() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var day = "01";
	return year + "-" + month + "-" + day;
};

_DateTime._getCurrentDTL = function() {
	var now = new Date();
	return now.getTime();
};

_DateTime._getDateTime = function(lDateTime) {
	var currentDateTime = "";
	try {
		var now = "";
		if (lDateTime != null && lDateTime != 0) {
			now = new Date(parseInt(lDateTime));
		} else {
			now = new Date();
		}

		currentDateTime = now.getFullYear() + "-" + _DateTime._fixLength(now.getMonth() + 1) + "-" + _DateTime._fixLength(now.getDate()) + " " + _DateTime._fixLength(now.getHours()) + ":"
				+ _DateTime._fixLength(now.getMinutes()) + ":" + _DateTime._fixLength(now.getSeconds());
		return currentDateTime;
	} catch (e) {
		return currentDateTime;
	}
};

_DateTime._getDate = function(lDateTime) {
	var currentDate = "";
	try {
		var now = "";
		if (lDateTime == null || parseInt(lDateTime) > 0) {
			now = new Date(parseInt(lDateTime));
		} else {
			now = new Date();
		}
		currentDate = now.getFullYear() + "-" + _DateTime._fixLength(now.getMonth() + 1) + "-" + _DateTime._fixLength(now.getDate());
		return currentDate;
	} catch (e) {
		return currentDate;
	}
};

_DateTime._getTime = function(lDateTime) {
	var currentTime = "";
	try {
		var now = "";
		if (lDateTime == null || lDateTime == 0) {
			now = new Date(parseInt(lDateTime));
		} else {
			now = new Date();
		}
		currentTime = _DateTime._fixLength(now.getHours()) + ":" + _DateTime._fixLength(now.getMinutes()) + ":" + _DateTime._fixLength(now.getSeconds());
		return currentTime;
	} catch (e) {
		return currentTime;
	}
};
