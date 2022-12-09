// PACKAGES: gsap
const gsapAnims = document.querySelectorAll('.gsap-anim') || false;

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
	toggleActions: 'restart complete restart pause',
	scroller: 'main',
});

if (gsapAnims) {
	gsapAnims.forEach((item) => {
		let type, obj, anim, once, action;

		type = item.dataset.gsaptype;
		once = item.dataset.once || false;
		obj = {};
		action = {
			toggleActions: 'restart complete restart pause',
		};

		if (item.parentElement.tagName == 'NAV' && getWindowSize().width <= 768) {
			return;
		}

		switch (type) {
			case 'fade-up':
				obj = {
					autoAlpha: 0,
					y: 50,
				};
				break;
			case 'fade-left':
				obj = {
					autoAlpha: 0,
					x: -40,
				};
				break;
			case 'fade-down':
				obj = {
					autoAlpha: 0,
					y: -50,
				};
				break;
			case 'fade-right':
				obj = {
					autoAlpha: 0,
					x: 40,
				};
				break;
			case 'zoom-out':
				obj = {
					autoAlpha: 0,
					scale: 1.3,
				};
				break;
			case 'zoom-in':
				obj = {
					autoAlpha: 0,
					scale: 0.8,
				};
				break;
		}

		anim = gsap.from(item, {
			...obj,
			delay: parseFloat(item.dataset.delay) || 0,
			duration: parseFloat(item.dataset.duration),
		});

		if (once) {
			action = {
				toggleActions: 'restart complete resume pause',
				onLeaveBack: (self) => self.disable(),
			};
		}
		ScrollTrigger.create({
			trigger: item,
			animation: anim,
			...action,
		});

		// gsap.from( `#${parent} #${thisEl}`, {
		//     scrolltrigger: `#${parent}`,
		//     duration: parseFloat(anim.dataset.duration),
		//     ...obj
		// })
	});
}
