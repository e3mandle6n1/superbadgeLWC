/**
 * BoatsNearMe Lightning Web Component
 * Displays a map with nearby boats based on the user's location.
 * Fetches boat data from the Apex BoatDataService and shows them as map markers.
 * 
 * @description This component displays a map with nearby boats based on the user's location.
 * @author Emandleni M
 * @date 2024-06-10
 *
 * Key Features:
 * - Uses browser geolocation to get the user's current position.
 * - Calls the getBoatsByLocation Apex method to retrieve boats near the user's location.
 * - Displays boats on a map with markers, including a marker for the user's location.
 */
import { api, LightningElement, wire } from "lwc";
import getBoatsByLocation from "@salesforce/apex/BoatDataService.getBoatsByLocation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const LABEL_YOU_ARE_HERE = "You are here!";
const ICON_STANDARD_USER = "standard:user";
const ERROR_TITLE = "Error loading Boats Near Me";
const ERROR_VARIANT = "error";

export default class BoatsNearMe extends LightningElement {
  @api
  boatTypeId;
  mapMarkers = [];
  isLoading = true;
  isRendered;
  latitude;
  longitude;

  @wire(getBoatsByLocation, {
    latitude: "$latitude",
    longitude: "$longitude",
    boatTypeId: "$boatTypeId"
  })
  wiredBoatsJSON({ error, data }) {
    if (data) {
      this.createMapMarkers(data);
    } else if (error) {
      const toast = new ShowToastEvent({
        title: ERROR_TITLE,

        message: error.message,

        variant: ERROR_VARIANT
      });

      this.dispatchEvent(toast);
    }

    this.isLoading = false;
  }

  renderedCallback() {
    if (!this.isRendered) {
      this.getLocationFromBrowser();
    }

    this.isRendered = true;
  }

  /**
   * Gets the user's current location using the browser's geolocation API.
   * If the location is successfully retrieved, it sets the latitude and longitude properties.
   * This method is called once when the component is first rendered.
   * 
   * @returns {void}
   */
  getLocationFromBrowser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;

        this.longitude = position.coords.longitude;
      });
    }
  }

  /**
   * Creates map markers for the boats based on the provided boat data.
   * @param {*} boatData - The boat data to create map markers from.
   * @returns {void}
   */
  createMapMarkers(boatData) {
    const newMarkers = JSON.parse(boatData).map((boat) => {
      return {
        title: boat.Name,

        location: {
          Latitude: boat.Geolocation__Latitude__s,

          Longitude: boat.Geolocation__Longitude__s
        }
      };
    });

    /**
     * Adds a marker for the user's current location at the beginning of the markers array.
     * Uses a standard user icon and a label indicating "You are here!".
     * @constant {Object} userLocationMarker - The marker object for the user's location.
     */
    newMarkers.unshift({
      title: LABEL_YOU_ARE_HERE,
      icon: ICON_STANDARD_USER,

      location: {
        Latitude: this.latitude,
        Longitude: this.longitude
      }
    });

    this.mapMarkers = newMarkers;
  }
}
