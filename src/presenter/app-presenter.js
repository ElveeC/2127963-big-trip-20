/*import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { SortType } from '../const.js';
import { comparePrice } from '../utils/point.js';

export default class AppPresenter {
  #eventContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  #eventListComponent = new EventsListView();
  #sortComponent = null;

  #tripPoints = [];
  #pointPresenters = new Map();

  constructor({eventContainer, pointModel, offerModel, destinationModel}) {
    this.#eventContainer = eventContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    this.#tripPoints = [...this.#pointModel.points];
    this.#sourcedTripPoints = [...this.#pointModel.points];
    this.#renderBoard();
  }

  #renderTripPoint(tripPoint, tripOffers, tripDestination) {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(tripPoint, tripOffers, tripDestination);
    this.#pointPresenters.set(tripPoint.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    const offersForUpdatedPoint = this.#offerModel.getOffersByType(updatedPoint);
    const destinationForUpdatedPoint = this.#destinationModel.getSelectedDestination(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, offersForUpdatedPoint, destinationForUpdatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(comparePrice);
        console.log(this.#tripPoints);
        break;
      default:
        this.tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
    console.log(sortType);
  };

  #renderSort() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventContainer);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#eventContainer);
    this.#renderEvents();
  }

  #renderEvents() {
    for (let i = 0; i < this.#tripPoints.length; i++) {

      this.#renderTripPoint(
        this.#tripPoints[i],
        this.#offerModel.getOffersByType(this.#tripPoints[i]),
        this.#destinationModel.getSelectedDestination(this.#tripPoints[i]));
    }
  }

  #clearEventList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    this.#renderSort();
    this.#renderEventList();
  }
}*/

import SortingView from '../view/sorting-view.js';
import EventsListView from '../view/events-list-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { comparePrice, compareDuration } from '../utils/point.js';
import { SortType } from '../const.js';

export default class AppPresenter {
  #eventContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;

  #eventListComponent = new EventsListView();
  //#sortComponent = new SortingView();
  #sortComponent = null;

  #tripPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  constructor({eventContainer, pointModel, offerModel, destinationModel}) {
    this.#eventContainer = eventContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    this.#tripPoints = [...this.#pointModel.points];
    this.#sourcedTripPoints = [...this.#pointModel.points];

    this.#renderBoard();
  }

  #renderTripPoint(tripPoint, tripOffers, tripDestination) {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(tripPoint, tripOffers, tripDestination);
    this.#pointPresenters.set(tripPoint.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    const offersForUpdatedPoint = this.#offerModel.getOffersByType(updatedPoint);
    const destinationForUpdatedPoint = this.#destinationModel.getSelectedDestination(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, offersForUpdatedPoint, destinationForUpdatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(comparePrice);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(compareDuration);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearEventList();
    this.#renderEventList();
  };


  /*#renderSort() {
    render(this.#sortComponent, this.#eventContainer);
  }*/

  #renderSort() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventContainer);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#eventContainer);
    this.#renderEvents();
  }

  #renderEvents() {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      const point = this.#tripPoints[i];
      const offers = this.#offerModel.getOffersByType(this.#tripPoints[i]);
      const destination = this.#destinationModel.getSelectedDestination(this.#tripPoints[i]);

      this.#renderTripPoint(
        point,
        offers,
        destination);
    }
  }

  #clearEventList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    this.#renderSort();
    this.#renderEventList();
  }
}
