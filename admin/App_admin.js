var App = (function(d) {
	
	var userList = d.querySelector('.users');

	function init() {
		setEvents();
	}

	function setEvents() {
		d.querySelector('.options').addEventListener('click', function(event) {
			selectGroups();
		});

		userList.addEventListener('click', function(event) {
			var tg = event.target;
			if(tg.tagName.match(/tr|td/gi)) {
				if (tg.tagName.toLowerCase() === 'td')
					tg = tg.parentNode;

				tg.classList.toggle('selected');
			}
		});
	}

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
			selected.push(element.getAttribute('cnnid'));
		});

		return selected;
	}

	function updateList(data) {
		var newList = '';

		data.forEach(function(element, index){
			newList += '<tr class="' + element.device + '" cnnid="' + element.id + '">';
			newList += '<td>' + element.device + '</td>';
			newList += '<td>' + element.ip + '</td>';
			newList += '</tr>';
		});

		userList.querySelector('tbody').innerHTML = newList;

		selectGroups();
	}


	return {
		init : init,
		getSelected : getSelected,
		selectGroups : selectGroups,
		updateList : updateList
	};

}(document));