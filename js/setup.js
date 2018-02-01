'use strict';

var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');

var setupSimilarElement = setupElement.querySelector('.setup-similar');
var setupSimilarListElement = setupElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarItemElement = similarWizardTemplate.querySelector('.setup-similar-item');

var WIZARD_COUNT = 4;
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardLastnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var usedNames = [];
var usedLastnames = [];
var usedCoatColors = [];
var usedEyesColors = [];

var createWizardsArray = function (wizards) {
  for (var i = 0; i < WIZARD_COUNT; i++) {
    var wizardName = getUniqueArrayElement(wizardNames, usedNames);
    var wizardLastname = getUniqueArrayElement(wizardLastnames, usedLastnames);
    var wizardCoatColor = getUniqueArrayElement(wizardCoatColors, usedCoatColors);
    var wizardEyesColor = getUniqueArrayElement(wizardEyesColors, usedEyesColors);
    var wizardObject = {
      name: wizardName + ' ' + wizardLastname,
      coatColor: wizardCoatColor,
      eyesColor: wizardEyesColor
    };
    wizards.push(wizardObject);
  }
  return wizards;
};

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var contains = function (array, elem) {
   return array.indexOf(elem) != -1;
};

var getUniqueArrayElement = function (array, usedElementsArr) {
  var el;
  do {
    el = array[randomInteger(0, array.length - 1)];
  } while (contains(usedElementsArr, el));
  usedElementsArr.push(el);
  return el;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarItemElement.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fillWizardListElement = function (array, listElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createWizardElement(array[i]));
  };
  listElement.appendChild(fragment);
};

createWizardsArray(wizards);
fillWizardListElement(wizards, setupSimilarListElement);
setupSimilarElement.classList.remove('hidden');
