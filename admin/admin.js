(function(d) {
	var userList = d.querySelector('.users');

	d.querySelector('.options').addEventListener('click', function(event) {
		selectGroups();
	});

	d.getElementById('send').addEventListener('click', function() {
		var sel = getSelected();
		console.log(sel);
	});

	userList.addEventListener('click', function(event) {
		var tg = event.target;
		if(tg.tagName.match(/tr|td/gi)) {
			if (tg.tagName.toLowerCase() === 'td')
				tg = tg.parentNode;

			tg.classList.toggle('selected');
		}
	});

	function selectGroups() {
		var selected = [];

		[].slice.apply(d.querySelectorAll('.options input[type="checkbox"]:checked')).forEach(function(element) {
			selected.push(element.id);
		});

		[].slice.apply(userList.querySelectorAll('tbody tr')).forEach(function(element) {
			var platform = element.querySelector('td').textContent.toLowerCase();
			if (selected.indexOf(platform) !== -1)
				element.classList.add('selected');
			else
				element.classList.remove('selected');
		});
	}

	function getSelected() {
		var selected = [];
		[].slice.apply(d.querySelectorAll('.users .selected')).forEach(function(element) {
			selected.push(element.getAttribute('connId'));
		});

		return selected;
	}
}(document));