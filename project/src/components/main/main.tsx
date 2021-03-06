/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import {ApartmentOffer, CityOffer, Points} from '../../types/offers-type';
import PlacesList from '../places-list/placesList';
import Map from '../map/map';
import 'leaflet/dist/leaflet.css';
import { cities } from '../../mocks/cities';
import {useState} from 'react';
import CitiesList from '../cities-list/citiesList';
import { useSelector, shallowEqual } from 'react-redux';
import SortOffers from '../sort-offers/sortOffers';
import {State} from '../../types/redux-types';


type MainProps = {
  allOffers: CityOffer[]
};

function Main({ allOffers }: MainProps): JSX.Element {
  const { offers, sortType, city } = useSelector<State, State>((state) => ({
    city: state.city,
    offers: state.offers,
    sortType: state.sortType,
  }), shallowEqual);


  const [activeOffer] = allOffers.filter((offer)=>offer.title===city);
  const points : Points[] = [];

  offers.forEach((offer)=>points.push(offer.points));

  const [selectedPoint, setSelectedPoint] = useState<Points>();

  const onListItemHover = (listItemName: string) => {
    const currentPoint = points.find((point) => point.id === listItemName);
    setSelectedPoint(currentPoint);
  };

  const sortedOffers = (currentOffers: ApartmentOffer[], currentSortType: State['sortType']) => {
    switch (currentSortType) {
      case 'Price low to high':{
        const filteredOffers = currentOffers.slice().sort((a,b)=>a.price-b.price);
        return  filteredOffers;
      }
      case 'Price high to low': {
        const filteredOffers=currentOffers.slice().sort((a,b)=>b.price-a.price);
        return  filteredOffers;

      }
      case 'Rating' : {
        const filteredOffers=currentOffers.slice().sort((a,b)=>b.rating-a.rating);
        return  filteredOffers;
      }
      case 'Popular': {
        return currentOffers.slice();
      }
      default :
        return currentOffers.slice();
    }
  };


  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            />
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link header__logo-link--active" to="/">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/">
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList cities={cities}/>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city}</b>
                <SortOffers/>
                <PlacesList placesClass='' onListItemHover={onListItemHover} offers={sortedOffers(offers, sortType)}/>
              </section>
              <div className="cities__right-section">
                <Map city={activeOffer} points={points} selectedPoint={selectedPoint}></Map>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
export default Main;
