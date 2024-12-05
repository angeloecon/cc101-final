/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/
window.onload = function () {
  Particles.init({
    selector: ".background"
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#03dac6", "#ff0266", "#000000"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 43,
        connectParticles: false
      }
    }
  ]
});
/**/
const ITEMS = document.querySelectorAll('.item-1')
ITEMS.forEach(item =>{
  item.addEventListener('click',() => {
      removeActionClasses()
      item.classList.add('active')
  })
})
function removeActionClasses(){
    ITEMS.forEach(item =>{
        item.classList.remove('active')
})}


/**/ 


const formDesign = document.getElementById('form-field');
const firstname_input = document.getElementById('username-input');
const email_input = document.getElementById('email-input');
const message_input = document.getElementById('message-input');
const error_message = document.getElementById("error-message")

formDesign.addEventListener('submit', (e) => {
  let errors = []
  if (firstname_input) {
    errors = getSignupFormErrors(firstname_input.value, email_input.value, message_input.value);
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    e.preventDefault()
    error_message.innerHTML = errors.join(". ")
  }
})

function getSignupFormErrors(firstname, email, message) {
  let errors = []

  if (firstname === "" || firstname == null) {
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add("incorrect");
  }

  if (email === "" || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add("incorrect");
  }

  if (message === "" || message == null) {
    errors.push('Message is required')
    message_input.parentElement.classList.add("incorrect");
  }

  return errors;
}


const allInput = [firstname_input, email_input, message_input].filter(input => input != null)

allInput.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ""
    }
  })
});


const form = document.getElementById('form-field');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

// class NavigationPage {
//   constructor() {
//     this.currentId = null;
//     this.currentTab = null;
//     this.tabContainerHeight = 70;
//     this.lastScroll = 0;
//     let self = this;
//     $(".nav-tab").click(function () {
//       self.onTabClick(event, $(this));
//     });
//     $(window).scroll(() => {
//       this.onScroll();
//     });
//     $(window).resize(() => {
//       this.onResize();
//     });
//   }

//   onTabClick(event, element) {
//     event.preventDefault();
//     let scrollTop =
//       $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
//     $("html, body").animate({ scrollTop: scrollTop }, 600);
//   }

//   onScroll() {
//     this.checkHeaderPosition();
//     this.findCurrentTabSelector();
//     this.lastScroll = $(window).scrollTop();
//   }

//   onResize() {
//     if (this.currentId) {
//       this.setSliderCss();
//     }
//   }

//   checkHeaderPosition() {
//     const headerHeight = 75;
//     if ($(window).scrollTop() > headerHeight) {
//       $(".nav-container").addClass("nav-container--scrolled");
//     } else {
//       $(".nav-container").removeClass("nav-container--scrolled");
//     }
//     let offset =
//       $(".nav").offset().top +
//       $(".nav").height() -
//       this.tabContainerHeight -
//       headerHeight;
//     if (
//       $(window).scrollTop() > this.lastScroll &&
//       $(window).scrollTop() > offset
//     ) {
//       $(".nav-container").addClass("nav-container--move-up");
//       $(".nav-container").removeClass("nav-container--top-first");
//       $(".nav-container").addClass("nav-container--top-second");
//     } else if (
//       $(window).scrollTop() < this.lastScroll &&
//       $(window).scrollTop() > offset
//     ) {
//       $(".nav-container").removeClass("nav-container--move-up");
//       $(".nav-container").removeClass("nav-container--top-second");
//       $(".nav-container-container").addClass("nav-container--top-first");
//     } else {
//       $(".nav-container").removeClass("nav-container--move-up");
//       $(".nav-container").removeClass("nav-container--top-first");
//       $(".nav-container").removeClass("nav-container--top-second");
//     }
//   }

//   findCurrentTabSelector(element) {
//     let newCurrentId;
//     let newCurrentTab;
//     let self = this;
//     $(".nav-tab").each(function () {
//       let id = $(this).attr("href");
//       let offsetTop = $(id).offset().top - self.tabContainerHeight;
//       let offsetBottom =
//         $(id).offset().top + $(id).height() - self.tabContainerHeight;
//       if (
//         $(window).scrollTop() > offsetTop &&
//         $(window).scrollTop() < offsetBottom
//       ) {
//         newCurrentId = id;
//         newCurrentTab = $(this);
//       }
//     });
//     if (this.currentId != newCurrentId || this.currentId === null) {
//       this.currentId = newCurrentId;
//       this.currentTab = newCurrentTab;
//       this.setSliderCss();
//     }
//   }

//   setSliderCss() {
//     let width = 0;
//     let left = 0;
//     if (this.currentTab) {
//       width = this.currentTab.css("width");
//       left = this.currentTab.offset().left;
//     }
//     $(".nav-tab-slider").css("width", width);
//     $(".nav-tab-slider").css("left", left);
//   }
// }

// new NavigationPage();
/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/
