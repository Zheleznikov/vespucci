import './style/index.css';
import Popup from './js/components/Popup';

(function() {
  const popup = new Popup(document.querySelector('.popup'));
  popup.setContent();

}());