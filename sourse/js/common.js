
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.tabs__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.tabs__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.tabs__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.tabs__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.tabs__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask

	// animateScroll() {

	// 	$(document).on('click', " .top-nav li a, .scroll-link", function () {
	// 		const elementClick = $(this).attr("href");
	// 		const destination = $(elementClick).offset().top;

	// 		$('html, body').animate({ scrollTop: destination }, 1100);

	// 		return false;
	// 	});
	// },
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};

function eventHandler() {

	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}



	function whenResize() {
		let nav = document.querySelector('.top-nav  ');
		if (nav) {

			window.addEventListener('scroll', function (e) {
				if (window.scrollY > 0) {
					nav.classList.add('fixed');
				} else {
					nav.classList.remove('fixed');
				}
			}, { passive: true })
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let carusels = document.querySelectorAll(".carusel-block");
	carusels.forEach(function (el) {
		const swiper4 = new Swiper(el.querySelector('.carusel-block__slider--js'), {
			// slidesPerView: 5,

			slidesPerView: 1,
			spaceBetween: 0,
			lazy: {
				loadPrevNext: true,
			},
			watchOverflow: true,
			spaceBetween: 0,
			// loop: true,
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev'),
			},
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
			},
		});
		// modal window

	})


	//sQusetions js
	let qItem = document.querySelectorAll(".q-item-js");
	qItem.forEach(function (el) {
		el.addEventListener('click', function () {
			let allItems = document.querySelectorAll('.q-item-js');
			let self = this;

			for (let item of allItems) {
				let currContent = item.querySelector('.q-content-js');

				if (item === self) {
					item.classList.toggle('active');
					currContent.classList.toggle('active');
				}
				else {
					item.classList.remove('active');
					currContent.classList.remove('active');
				}

			}

		})
	})

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }