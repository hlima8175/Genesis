// url_atual = 'http://localhost/conecta/';
url_atual = 'https://conectafibra.com.br/';

let iconMenu = document.querySelector(".navbar-content_mobile-icon");
let body = document.querySelector("body");
const mobileMenu = document.querySelector('.responsive-menu');
const content = document.querySelector('.content')

iconMenu.addEventListener('click', () => {
  
  content.classList.toggle('opened')

  if(iconMenu.classList.contains('opened')) {
    content.classList.add('menu-opened');
  } else {
    content.classList.remove('menu-opened');
  }

  body.classList.toggle("__move");
});
$('.storeBlockImg').slick({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 200,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true
});

// -->  Animação ao Scroll

debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


(function () {
  var $target = $('.anime'),
    animationClass = 'anime-start',
    offset = $(window).height() * 0.8;

  function animeScroll() {
    var documentTop = $(document).scrollTop();
    $target.each(function () {
      var itemTop = $(this).offset().top;
      if (documentTop > itemTop - offset) {
        $(this).addClass(animationClass);
      } else {
        $(this).removeClass(animationClass);
      }
    });
  }
  animeScroll();
  $(document).scroll(debounce(function () {
    animeScroll();
  }, 75));
})();


// $('.modal-gate').css('visibility', 'hidden');
// $('.modal-gate').css('display', 'none');
// $('.modal-gate').css('opacity', '0');
// $(body).css('background-color', '#fff');
// $('.bodyContainer').css('visibility', 'visible');
// $('.bodyContainer').css('display', 'block');
// $('.bodyContainer').css('opacity', '1');
// $("html, body").scrollTop(0);


$(document).on('click', '.close_gate', function () {
  let city = $('#city_gate').val();
  let name = $('#name_gate').val();
  let phone = $('#phone_gate').val();
  let dados = [city, name, phone];
  $('.modal-gate').css('visibility', 'hidden');
  $('.modal-gate').css('display', 'none');
  $('.modal-gate').css('opacity', '0');
  $('body').css('background-color', '#fff');
  $('.bodyContainer').css('visibility', 'visible');
  $('.bodyContainer').css('display', 'block');
  $('.bodyContainer').css('opacity', '1');
  $("html, body").scrollTop(0);
  $.ajax({
    url: url_atual + 'myemail/send_lead',
    method: 'POST',
    data: {
      dados: dados
    },
    success: function (data) { }
  });
});

$('.ideal-plan-slick').slick({
  dots: false,
  arrow: true,
  infinite: false,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  prevArrow: $('.prev-arrow'),
  nextArrow: $('.next-arrow'),
});

$(document).on('click', '.howUse', function () {
  let value = $(this).data('value');
  $.ajax({
    url: url_atual + 'planoIdeal/fetch_ideal_plan',
    method: 'POST',
    data: {
      id: value
    },
    success: function (data) {
      let dataObj = JSON.parse(data);
      $('#preco').html('R$ ' + dataObj.amount);
      $('#velocidade').html(dataObj.speed + ' MEGA');
      $('#itens').html(dataObj.description);
      $('#escolher').attr('href', url_atual + 'contract/' + dataObj.url_friendly);
    }
  });
});

$(document).ready(function () {
  $('.cep').mask('99999-999');
  $('.cpf').mask('999-999-999.99');
  $('.celular').mask('(99) 9 9999-9999');
  $('.numero').mask('###');
});

if (/contract/.test(document.location.pathname)) {
  const contractCheckbox = document.getElementById('contractCheckbox');
  const submitButton = document.getElementById('submitContract');
  const formContract = document.getElementById('formContract');

  function submitContractForm(form) {
    const Form = Array.from(form);

    Form.forEach((formField) => {
      const formValue = formField.value;

      verifyField(formValue, formField);
      formField.addEventListener('blur', () => {
        const updatedValue = formField.value
        verifyField(updatedValue, formField)
      });
    });
  }

  function verifyField(formValue, formField) {
    const formId = formField.getAttribute('id')
    const warningContainer = document.getElementById(formField.dataset.warning);
    const formWarning = document.getElementById(`warning_${formId}`);
    let formStatus = true;
    if(formField.classList.contains('optional')) {
      return;
    }
    if (!formValue || formValue.length < 1 || formValue.value == '') {
      formField.style.borderColor = '#d32121';
      formWarning ? formWarning.classList.remove('hidden') : '';
      warningContainer ? warningContainer.classList.remove('hidden') : ';'
      submitButton.setAttribute('disabled', 'disabled');
      formContract.scrollIntoView();
      formStatus = false;
    } else {
      formField.style.borderColor = '';
      formWarning ? formWarning.classList.add('hidden') : '';
      warningContainer ? warningContainer.classList.add('hidden') : ';'
      submitButton.removeAttribute('disabled');
      formStatus = true;
    }
    handleFormValidation(formStatus, submitButton, contractCheckbox)
  }

  function handleFormValidation(status, button, checkbox) {
    status ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
    if(!status) {
      checkbox.checked = false;
    }

    verifySubmitButtonState(button, checkbox);
  }

  function verifySubmitButtonState(button, self) {
    if (self.checked) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

  submitButton.addEventListener('click', () => {
    submitContractForm(formContract)
  });
  contractCheckbox.addEventListener('change', () => {
    verifySubmitButtonState(submitButton, contractCheckbox)
  });
}

if (/a-conecta/.test(document.location.pathname)) {
  const timelineInnerContainer = document.querySelectorAll('.timeline-inner-container');

  timelineInnerContainer.forEach((element) => {
    if(element.children.length == 1) {
      element.classList.add('timeline-one-child');
    }
  });
}
