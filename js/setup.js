'use strict';

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupSimilarElement = setupElement.querySelector('.setup-similar');
var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupUserNameElement = setupElement.querySelector('.setup-user-name');
var similarItemElement = similarWizardTemplate.querySelector('.setup-similar-item');
var setupWizardElement = setupElement.querySelector('.setup-wizard');
var setupWizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var setupWizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var setupWizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

var createWizardsList = function (wizardsCount) {
  var wizardsList = [];
  var wizardNameList = shuffleList(WIZARD_NAMES);
  var wizardLastnameList = shuffleList(WIZARD_LASTNAMES);
  var wizardCoatColorList = shuffleList(WIZARD_COAT_COLORS);
  var wizardEyesColorList = shuffleList(WIZARD_EYES_COLORS);
  for (var i = 0; i < wizardsCount; i++) {
    wizardsList.push({name: wizardNameList[i] + ' ' + wizardLastnameList[i], coatColor: wizardCoatColorList[i], eyesColor: wizardEyesColorList[i]});
  }
  return wizardsList;
};

var shuffleList = function (list) {
  return list.sort(sortRandomize);
};

var sortRandomize = function () {
  return 0.5 - Math.random();
};

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (list) {
  return list[getRandomBetween(0, list.length)];
};

var createWizardElement = function (wizard) {
  var wizardElement = similarItemElement.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fillWizardListElement = function (list, listElement) {
  var fragment = document.createDocumentFragment();
  list.forEach(function (item, i) {
    fragment.appendChild(createWizardElement(list[i]));
  });
  listElement.innerHTML = '';
  listElement.appendChild(fragment);
};

wizards = createWizardsList(WIZARD_COUNT);
fillWizardListElement(wizards, setupSimilarListElement);
setupSimilarElement.classList.remove('hidden');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserNameElement) {
    closePopup();
  }
};

var openPopup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupWizardCoatElement.addEventListener('click', function () {
  setupWizardCoatElement.style.fill = getRandomArrayElement(WIZARD_COAT_COLORS);
});

setupWizardEyesElement.addEventListener('click', function () {
  setupWizardEyesElement.style.fill = getRandomArrayElement(WIZARD_EYES_COLORS);
});

setupWizardFireballElement.addEventListener('click', function () {
  setupWizardFireballElement.style.background = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
});

