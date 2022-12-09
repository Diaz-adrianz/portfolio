// ELEMENTS HTML
const header = document.querySelector('header');
const main = document.querySelector('main');
const nav = document.querySelector('header nav');
const navDots = document.querySelectorAll('.nav-dots > span');

// SCREEN HANDLE MOBILE
function getWindowSize() {
	let body = document.querySelector('body');

	return {
		width: body.offsetWidth,
		height: body.offsetHeight,
	};
}
// GLOBAL VARIABLE
let mainScrollVal = 0;

// EVENT: time
const loadScreen = document.querySelector('.load-screen');
setTimeout(() => {
	fadeOut(loadScreen);
}, 2000);

// EVENT: onscroll
main.addEventListener('scroll', (event) => {
	let contents, heightContent, topScroll, index;

	contents = document.querySelectorAll('main > section');
	heightContent = contents[0].offsetHeight;
	topScroll = main.scrollTop;

	if (Math.floor(topScroll % heightContent) == 0) {
		index = Math.floor(topScroll / heightContent);

		navDots.forEach((dot) => dot.classList.remove('on'));
		navDots[index].classList.add('on');
	}

	topScroll > mainScrollVal
		? header.classList.add('scroll')
		: header.classList.remove('scroll');

	mainScrollVal = topScroll;
});

navDots.forEach((dot) => {
	dot.addEventListener('click', (event) => {
		let index, height;

		index = [...navDots].indexOf(dot);
		height = main.firstElementChild.offsetHeight;

		main.scrollTop = height * index;
	});
});

// EVENT: onclick
const backdrop = document.querySelector('.backdrop');
backdrop.addEventListener('click', () => {
	fadeOut(backdrop);
});
// FLOATING
function showup(evnt, elm, icon) {
	evnt.stopPropagation();

	let target = document.getElementById(elm.dataset.target),
		iconElm = elm.querySelector('i'),
		closing = target.querySelector('.showup-close'),
		descendant = {
			target: target.querySelectorAll('*'),
			btn: elm.querySelectorAll('*'),
		};

	if (target.classList.contains('with-bd')) backdrop.classList.toggle('show');

	target.classList.toggle('show');
	elm.classList.toggle('focus');

	target.classList.contains('show')
		? (iconElm.textContent = 'close')
		: (iconElm.textContent = icon);

	window.onclick = (event) => {
		if (
			event.target != target &&
			event.target != elm &&
			checkDescendants(event.target, descendant.btn) &&
			checkDescendants(event.target, descendant.target)
		) {
			target.classList.contains('fade')
				? fadeOut(target)
				: target.classList.remove('show');

			elm.classList.remove('focus');
			iconElm.textContent = icon;
		}
	};

	if (closing) {
		closing.onclick = () => {
			target.classList.contains('fade')
				? fadeOut(target)
				: target.classList.remove('show');
			elm.classList.remove('focus');
			iconElm.textContent = icon;
		};
	}
}

function checkDescendants(e, items) {
	let bool = true;

	items.forEach((item) => {
		if (e == item) bool = false;
	});

	return bool;
}

function nav_toggle() {
	let bd = document.querySelector('header .backdrop');
	let btn = document.querySelector('header .burger');

	bd.classList.toggle('show');
	btn.classList.toggle('click');
	nav.classList.toggle('show');
}

const tabLayouts = document.querySelectorAll('.tablayout');
if (tabLayouts.length > 0) {
	tabLayouts.forEach((tablayout) => {
		// dots & inner
		let tabs = tablayout.querySelector('.tabs').children,
			contents = tablayout.querySelector('.contents'),
			indicator = tablayout.querySelector('.indicator');

		// scrolling
		contents.onscroll = () => {
			let width = contents.children[0].offsetWidth;
			let scroll = contents.scrollLeft;

			if ((Math.ceil(scroll) + 1) % width == 0) {
				tabFocus(scroll, Math.ceil(scroll + 1) / width);
			}
			if (scroll == 0) {
				tabFocus(scroll, 0);
			}
		};

		[...tabs].forEach((tab) => {
			tab.onclick = () => {
				let width = contents.children[0].offsetWidth;
				let point = [...tabs].indexOf(tab);

				tabFocus(width * point, point);
			};
		});

		// active
		function tabFocus(width, point) {
			let sliding = 0;

			contents.scrollLeft = width;

			if (point != 0) {
				for (let i = point; i > 0; i--) {
					sliding += tabs[i - 1].offsetWidth;
				}
			}

			indicator.style.left = sliding + 'px';
			indicator.style.width = tabs[point].offsetWidth + 'px';

			[...tabs].forEach((tab) => tab.classList.remove('on'));
			tabs[point].classList.add('on');
		}
	});
}

const galleryBoxs = document.querySelectorAll('.gallerybox');
if (galleryBoxs.length > 0) {
	galleryBoxs.forEach((galleryBox) => {
		let items = galleryBox.querySelectorAll('.imgs > img'),
			container = galleryBox.querySelector('.figurify'),
			placeImg = galleryBox.querySelector('figure > img'),
			placeTitle = galleryBox.querySelector('figure .overlay h4'),
			placeSubtitle = galleryBox.querySelector('figure .overlay span'),
			imageView = document.getElementById('imageview');

		container.addEventListener('click', (event) => {
			event.stopPropagation();
			let placeImgView = imageView.querySelector('figure img'),
				placeTitleImgView = imageView.querySelector('.title');

			placeImgView.setAttribute('src', placeImg.getAttribute('src'));
			placeTitleImgView.textContent = placeTitle.textContent;
			imageView.classList.add('show');
		});

		items.forEach((item) => {
			item.onclick = () => {
				placeImg.setAttribute('src', item.getAttribute('src'));
				placeTitle.textContent = item.dataset.title;
				placeSubtitle.textContent = item.dataset.subtitle;

				placeImg.classList.remove('fade');
				void placeImg.offsetHeight;
				placeImg.classList.add('fade');

				items.forEach((i) => i.classList.remove('on'));
				item.classList.add('on');
			};
		});
	});
}

// EVENT: form control
const sheet =
	'https://script.google.com/macros/s/AKfycbzWzRKOKIXO7SNu4uhFhN1wr3ZF4mploJc2Bk2SnuR7vyNs9lakVmCr5otxBl6cOice/exec';
const sheet_id =
	'AKfycbzWzRKOKIXO7SNu4uhFhN1wr3ZF4mploJc2Bk2SnuR7vyNs9lakVmCr5otxBl6cOice';

async function sendMessage(event, form) {
	let progress, btn;
	event.preventDefault();

	progress = form.querySelector('.alert');
	btn = form.querySelector('.btn[type="submit"]');

	progress.classList.add('warning');
	progress.innerHTML = `
		<i class="material-icons">sync</i>
		On progress
	`;

	btn.classList.add('disabled');

	await fetch(sheet, { method: 'POST', body: new FormData(form) })
		.then((response) => {
			console.log('Success! ' + response);

			progress.classList.remove('success', 'danger', 'warning');
			progress.classList.add('success');
			progress.innerHTML = `
                <i class="material-icons">mark_email_read</i>
                Done, thanks!
            `;

			form.reset();
		})
		.catch((error) => {
			console.error('Error! ', error.message);

			progress.classList.remove('success', 'danger', 'warning');
			progress.classList.add('danger');
			progress.innerHTML = `
                <i class="material-icons">error</i>
                Something wrong :(
            `;
		});

	setTimeout(() => {
		progress.classList.remove('success', 'danger', 'warning');
		progress.innerHTML = `
            <i class="material-icons-outlined">drafts</i>
            Waiting for message...
        `;
	}, 4000);
}

let constraints = {
	from: {
		email: true,
	},
};

function inputCheck(el) {
	let inputs = document.querySelectorAll(`#${el.dataset.target} .inp`);
	let btn = document.querySelector(`#${el.dataset.target} .btn[type="submit"]`);
	let bool = true;

	inputs.forEach((input) => {
		input.parentElement.classList.remove('invalid');
		if (!input.value) {
			bool = false;
		}
		if (input.getAttribute('type') == 'email') {
			if (!validate({ from: input.value }, constraints) || !input.value) {
				input.parentElement.classList.remove('invalid');
			} else {
				bool = false;
				input.parentElement.classList.add('invalid');
			}
		}
	});

	bool ? btn.classList.remove('disabled') : btn.classList.add('disabled');
}

// STYLING:
function fadeOut(el, duration = 250) {
	el.style.animationName = 'fadeout';

	setTimeout(() => {
		el.style.animationName = 'fade';
		el.classList.remove('show');
	}, duration);
}
